import { TestBed } from '@angular/core/testing';

import { CurriculumFetcherService } from './curriculum-fetcher.service';

describe('CurriculumFetcherService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CurriculumFetcherService = TestBed.get(CurriculumFetcherService);
    expect(service).toBeTruthy();
  });
});
