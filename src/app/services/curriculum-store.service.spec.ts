import { TestBed } from '@angular/core/testing';

import { CurriculumStoreService } from './curriculum-store.service';

describe('CurriculumStoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CurriculumStoreService = TestBed.get(CurriculumStoreService);
    expect(service).toBeTruthy();
  });
});
