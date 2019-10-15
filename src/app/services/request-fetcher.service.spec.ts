import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RequestFetcherService } from './request-fetcher.service';
import { ContentFetcherService } from './content-fetcher.service';
import { ToastrModule } from 'ngx-toastr';
import { environment } from '../../environments/environment';
import { HttpHeaderResponse } from '@angular/common/http';
import {Request} from '../models/Request';
import { Filter } from '../models/Filter';

describe('RequestFetcherService', () => {
  let service: RequestFetcherService;
  let httpTestingController: HttpTestingController;
  let baseURL;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,
                ToastrModule.forRoot()],
      providers: [ContentFetcherService]
    });
    service = TestBed.get(RequestFetcherService);
    httpTestingController = TestBed.get(HttpTestingController);
    baseURL = environment.cms_url;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an Observable<Request[]> getAllRequests', fakeAsync(() => {
    let url: string = baseURL + '/requests'
    let request: Request = new Request(1,"Java","String", "Java is great", null, []);

    let response: Request[] =  [request];    
    service.getAllRequests().subscribe(
      output => {expect(output[0].id).toBe(response[0].id)}
    );
    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toEqual("GET");
    req.flush(response);
    tick();

  }));

  it('should return an Observable<HttpHeaderResponse> deleteRequestByID', fakeAsync(() => {
    let url: string = baseURL + '/requests/1'
    let response :HttpHeaderResponse = new HttpHeaderResponse({headers: null, status: 200, statusText:"ok",url: url});

    service.deleteRequestByID(1).subscribe(
      output => {expect(output).toBe(response);expect(output.status).toBe(200);}
    );
    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toEqual("DELETE");
    req.flush(response);
    tick();

  }));

  it('should return an Observable<Request>, updateRequestByID', fakeAsync(() => {
    let url: string = baseURL + '/requests/1';
    let requestAndResponse: Request = new Request(1,"Java","String", "Java is great", null, []);
    service.updateRequestByID(1, requestAndResponse).subscribe(
      output => {expect(output).toBe(requestAndResponse);}
    );
    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toEqual("PUT");
    req.flush(requestAndResponse);
    tick();

  }));

  it('should return an Observable<Request> getRequestByID', fakeAsync(() => {
    let url: string = baseURL + '/requests/1'
    let response: Request = new Request(1,"Java","String", "Java is great", null, []);   
    service.getRequestByID(1).subscribe(
      output => {expect(output).toBe(response)}
    );
    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toEqual("GET");
    req.flush(response);
    tick();

  }));

  // Test to make sure filterContent(filter) function is working
  it('filterContent is working, filter not null', fakeAsync(() => {
    let response = {};
    let filter: Filter = new Filter(null, null, null);
    
    service.filterContent(filter).subscribe((receivedResponse) => {});
    const req = httpTestingController.expectOne(baseURL + '/requests?title=&format=&modules=');
    expect(req.request.method).toEqual("GET");
    req.flush(response);
    tick();

  }));

  // Test to make sure filterContent(filter) function is working
  it('filterContent is working, filter null', fakeAsync(() => {
    let response = {};
    
    service.filterContent(null).subscribe((receivedResponse: any) => {});
    const req = httpTestingController.expectOne(baseURL + '/requests?title=&format=&modules=');
    expect(req.request.method).toEqual("GET");
    req.flush(response);
    tick();

  }));
  
});
