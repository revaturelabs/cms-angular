import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { SubmitRequestService } from './submit-request.service';

describe('SubmitRequestService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
        HttpClientTestingModule
      ],
      providers: [
        SubmitRequestService
      ]
  }));

  it('should be created', () => {
    const service: SubmitRequestService = TestBed.get(SubmitRequestService);
    expect(service).toBeTruthy();
  });
});
