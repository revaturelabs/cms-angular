import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ContentFetcherService } from './content-fetcher.service';

describe('ContentFetcherService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
    ]
  }));

  it('should be created', () => {
    const service: ContentFetcherService = TestBed.get(ContentFetcherService);
    expect(service).toBeTruthy();
  });
});
