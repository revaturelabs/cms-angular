import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';

import { EndpointsService } from './endpoints.service';

describe('EndpointsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
    ]
  }));

  it('should be created', () => {
    const service: EndpointsService = TestBed.get(EndpointsService);
    expect(service).toBeTruthy();
  });
});
