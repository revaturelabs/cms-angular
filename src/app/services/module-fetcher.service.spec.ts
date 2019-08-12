import { TestBed } from '@angular/core/testing';

import { ModuleFetcherService } from './module-fetcher.service';

describe('ModuleFetcherService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ModuleFetcherService = TestBed.get(ModuleFetcherService);
    expect(service).toBeTruthy();
  });
});
