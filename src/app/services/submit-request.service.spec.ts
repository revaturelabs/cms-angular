import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { SubmitRequestService } from './submit-request.service';
import { Request } from '../models/Request';
import { environment } from '../../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('SubmitRequestService', () => {

  let service: SubmitRequestService;
  let httpTestingController: HttpTestingController;
  let baseURL;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, BrowserAnimationsModule ],
        providers: [SubmitRequestService]
    });
    service = TestBed.get(SubmitRequestService);
    httpTestingController = TestBed.get(HttpTestingController);
    baseURL = environment.cms_url;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should test createNewRequest', fakeAsync(() => {
    let url: string = baseURL + '/requests';
    service.createNewRequest(new Request(1, "Java","String", "Java is great",null,[])).subscribe();
    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toEqual("POST");
    tick();
  }));
});
