import { TestBed } from '@angular/core/testing';

import { SortSearchService } from './sort-search.service';

describe('SortsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SortSearchService = TestBed.get(SortSearchService);
    expect(service).toBeTruthy();
  });
});
