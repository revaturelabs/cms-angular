import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RequestFetcherService } from './request-fetcher.service';
import { ContentFetcherService } from './content-fetcher.service';
import { ToastrModule } from 'ngx-toastr';
import { environment } from '../../environments/environment';
import {Request} from '../models/Request';
import { Filter } from '../models/Filter';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('RequestFetcherService', () => {
  let service: RequestFetcherService;
  let httpTestingController: HttpTestingController;
  let baseURL;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,ToastrModule.forRoot(), BrowserAnimationsModule],
      providers: [ContentFetcherService]
    });
    service = TestBed.get(RequestFetcherService);
    httpTestingController = TestBed.get(HttpTestingController);
    baseURL = environment.cms_url;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should test getAllRequests', fakeAsync(() => {
    let url: string = baseURL + '/requests'   
    service.getAllRequests().subscribe();
    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toEqual("GET");
    tick();
  }));

  it('should test deleteRequestByID', fakeAsync(() => {
    let url: string = baseURL + '/requests/1'
    service.deleteRequestByID(1).subscribe();
    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toEqual("DELETE");
    tick();
  }));

  it('should test updateRequestByID', fakeAsync(() => {
    let url: string = baseURL + '/requests/1';
    let requestAndResponse: Request = new Request(1,"Java","String", "Java is great", null, []);
    service.updateRequestByID(1, requestAndResponse).subscribe();
    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toEqual("PUT");
    tick();
  }));

  it('should test getRequestByID', fakeAsync(() => {
    let url: string = baseURL + '/requests/1'
    service.getRequestByID(1).subscribe();
    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toEqual("GET");
    tick();
  }));

  it('filterContent is working, filter not null', fakeAsync(() => {
    let filter: Filter = new Filter(null, null, null);
    service.filterContent(filter).subscribe();
    const req = httpTestingController.expectOne(baseURL + '/requests?title=&format=&modules=');
    expect(req.request.method).toEqual("GET");
    tick();
  }));

  it('filterContent is working, filter null', fakeAsync(() => {
    service.filterContent(null).subscribe();
    const req = httpTestingController.expectOne(baseURL + '/requests?title=&format=&modules=');
    expect(req.request.method).toEqual("GET");
    req.flush({});
    tick();
  }));
  
});
