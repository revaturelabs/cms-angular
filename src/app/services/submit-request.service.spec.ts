import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { SubmitRequestService } from './submit-request.service';
import { Request } from '../models/Request';
import { HttpHeaderResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';

describe('SubmitRequestService', () => {

  let service: SubmitRequestService;
  let httpTestingController: HttpTestingController;
  let baseURL;

  beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [
        HttpClientTestingModule
      ],
      providers: [
        SubmitRequestService
      ]
  });
  service = TestBed.get(SubmitRequestService);
  httpTestingController = TestBed.get(HttpTestingController);
  baseURL = environment.cms_url;
  
});

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('createNewRequest', fakeAsync(() => {
    let url: string = baseURL + '/requests';
    let response :HttpHeaderResponse = new HttpHeaderResponse({headers: null, status: 200, statusText:"ok",url: url});
    let request: Request = new Request(1, "Java","String", "Java is great",null,[]);
    
    service.createNewRequest(request).subscribe(
      output => {expect(output).toBe(response);expect(output.status).toBe(200);}
    );
    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toEqual("POST");
    req.flush(response);
    tick();

  }));
});
