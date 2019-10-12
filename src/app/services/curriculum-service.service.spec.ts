import { TestBed } from '@angular/core/testing';

import { CurriculumServiceService } from './curriculum-service.service';

describe('CurriculumServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CurriculumServiceService = TestBed.get(CurriculumServiceService);
    expect(service).toBeTruthy();
  });
});
