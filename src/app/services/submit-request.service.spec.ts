import { TestBed } from '@angular/core/testing';

import { SubmitRequestService } from './submit-request.service';

describe('SubmitRequestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SubmitRequestService = TestBed.get(SubmitRequestService);
    expect(service).toBeTruthy();
  });
});
