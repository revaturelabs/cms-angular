import { TestBed } from '@angular/core/testing';

import { ThemechangeService } from './themechange.service';

describe('ThemechangeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ThemechangeService = TestBed.get(ThemechangeService);
    expect(service).toBeTruthy();
  });
});
