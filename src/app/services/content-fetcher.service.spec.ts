import { TestBed, fakeAsync, tick } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../environments/environment'

import { ContentFetcherService } from './content-fetcher.service';

describe('ContentFetcherService', () => {
  let httpTestingController: HttpTestingController;
  let service: ContentFetcherService;
  let baseURL = environment.cms_url;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ContentFetcherService]
  });
  service = TestBed.get(ContentFetcherService);
  httpTestingController = TestBed.get(HttpTestingController);
});

afterEach(() => {
  httpTestingController.verify();
});

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getAllContent is working', fakeAsync(() => {
    let response = {};

    service.getAllContent().subscribe(
      (receivedResponse: any) => {},
      (error: any) => {}
    );
    const req = httpTestingController.expectOne(baseURL + '/content');
    expect(req.request.method).toEqual("GET");
    req.flush(response);
    tick();

  }));

  
  it('getContentByID is working', fakeAsync(() => {
    let response = {};
    

    service.getContentByID(1).subscribe(
      (receivedResponse: any) => {},
      (error: any) => {}
    );
    const req = httpTestingController.expectOne(baseURL + '/content/1');
    expect(req.request.method).toEqual("GET");
    req.flush(response);
    tick();

  }));


});
