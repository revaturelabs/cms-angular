import { TestBed } from '@angular/core/testing';

import { ModuleStoreService } from './module-store.service';

describe('ModuleStoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ModuleStoreService = TestBed.get(ModuleStoreService);
    expect(service).toBeTruthy();
  });
});
