import { TestBed } from '@angular/core/testing';

import { TimeGraphService } from './time-graph.service';

describe('TimeGraphService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TimeGraphService = TestBed.get(TimeGraphService);
    expect(service).toBeTruthy();
  });
});
