import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ModuleFetcherService } from './module-fetcher.service';

describe('ModuleFetcherService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
    ]
  }));

  it('should be created', () => {
    const service: ModuleFetcherService = TestBed.get(ModuleFetcherService);
    expect(service).toBeTruthy();
  });
});
