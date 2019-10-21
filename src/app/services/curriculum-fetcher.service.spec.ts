import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { CurriculumFetcherService } from './curriculum-fetcher.service';

describe('CurriculumFetcherService', () => {

    let service;
    let httpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CurriculumFetcherService]
    });
    
    service = TestBed.get(CurriculumFetcherService);
    httpTestingController = TestBed.get(HttpTestingController);

  });

  it('should be created', () => {
    const service: CurriculumFetcherService = TestBed.get(CurriculumFetcherService);
    expect(service).toBeTruthy();
  });
});
