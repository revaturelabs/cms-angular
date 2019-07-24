import { TestBed } from '@angular/core/testing';

import { ContentFetcherService } from './content-fetcher.service';

describe('ContentFetcherService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ContentFetcherService = TestBed.get(ContentFetcherService);
    expect(service).toBeTruthy();
  });
});
