import { TestBed } from '@angular/core/testing';

import { RequestFetcherService } from './request-fetcher.service';

describe('RequestFetcherService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RequestFetcherService = TestBed.get(RequestFetcherService);
    expect(service).toBeTruthy();
  });
});
