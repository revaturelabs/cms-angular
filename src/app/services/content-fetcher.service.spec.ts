import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../environments/environment'
import { ContentFetcherService } from './content-fetcher.service';
import { Content } from '../models/Content';
import { Filter } from '../models/Filter';
import { Link } from '../models/Link';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ContentFetcherService', () => {
  let httpTestingController: HttpTestingController;
  let service: ContentFetcherService;
  let baseURL = environment.cms_url;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, BrowserAnimationsModule],
      providers: [ContentFetcherService]
    });
    
    service = TestBed.get(ContentFetcherService);
    httpTestingController = TestBed.get(HttpTestingController);

  });

  afterEach(() => {
    httpTestingController.verify();
  });

  // Tests creation of fetcher
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  //getAllContent()
  it('getAllContent is working', fakeAsync(() => {
    service.getAllContent().subscribe();
    const req = httpTestingController.expectOne(baseURL + '/content');
    expect(req.request.method).toEqual("GET");
    tick();
  }));

  //Testing getContentByID(id)
  it('getContentByID is working', fakeAsync(() => {
    service.getContentByID(1).subscribe();
    const req = httpTestingController.expectOne(baseURL + '/content/1');
    expect(req.request.method).toEqual("GET");
    tick();
  }));

  // Testing createNewContent(content) function
  it('createNewContent is working', fakeAsync(() => {
    service.createNewContent(new Content(null, null, null, null, null, null)).subscribe();
    const req = httpTestingController.expectOne(baseURL + '/content');
    expect(req.request.method).toEqual("POST");
    tick();
  }));

   // Testing addLinkToContent(content) function
   it('addLinkToContent is working', fakeAsync(() => {
    let link: Link;
    let content: Content = new Content(1, null, null, null, null, [link])
    link = new Link(1, content, null, "affiliation", 1);
    service.addLinkToContent(content).subscribe();
    const req = httpTestingController.expectOne(baseURL + `/content/${content.id}/links`);
    expect(req.request.method).toEqual("PUT");
    tick();
  }));

  // Test for updateContentById(num, content)
  it('updateContentById is working', fakeAsync(() => {
    let content: Content = new Content(null, null, null, null, null, null)
    service.updateContentById(1, content).subscribe();
    const req = httpTestingController.expectOne(baseURL + '/content/1');
    expect(req.request.method).toEqual("PUT");
    tick();
  }));

  // Test for failure of updateContentByContent(content)
  it('updateContent is working', fakeAsync(() => {
    let content: Content = new Content(1, null, null, null, null, null);
    service.updateContent(content).subscribe();
    const req = httpTestingController.expectOne(baseURL + '/content/1');
    expect(req.request.method).toEqual("PUT");
    tick();
  }));

  // Test to deleteContentByID
  it('deleteContentByID is working', fakeAsync(() => {
    service.deleteContentByID(1).subscribe();
    const req = httpTestingController.expectOne(baseURL + '/content/1');
    expect(req.request.method).toEqual("DELETE");
    tick();
  }));

  // Test to removeLinkFromContent
  it('removeLinkFromContent is working', fakeAsync(() => {
    service.removeLinkFromContent(1).subscribe();
    const req = httpTestingController.expectOne(baseURL + '/links/1');
    expect(req.request.method).toEqual("DELETE");
    tick();
  }));

  // Test to make sure filterContent(filter) function is working
  it('filterContent is working', fakeAsync(() => {
    let response = {};
    let filter: Filter = new Filter(null, null, null, null);
    
    service.filterContent(filter).subscribe(
      (receivedResponse: any) => { },
      (error: any) => { }
    );
    
    const req = httpTestingController.expectOne(baseURL + '/content?title=&format=&modules=&curriculum=');
    expect(req.request.method).toEqual("GET");
    tick();
  }));

  // Test to make sure filterContent(filter) function is working
  it('filterContent is working, filter null', fakeAsync(() => {
    service.filterContent(null).subscribe();
    const req = httpTestingController.expectOne(baseURL + '/content?title=&format=&modules=&curriculum=');
    expect(req.request.method).toEqual("GET");
    tick();
  }));

});
