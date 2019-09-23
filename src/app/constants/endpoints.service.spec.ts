import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';

import { EndpointsService } from './endpoints.service';
import { environment } from 'src/environments/environment';

describe('EndpointsService', () => {
  let baseURL = environment.cms_url;
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
    ]

  }));

  //Test to make sure the service exists
  it('should be created', () => {
    const service: EndpointsService = TestBed.get(EndpointsService);

    expect(service).toBeTruthy();

  });

  //Test that baseURL exists
  it('should have baseURL defined', () => {
    const service: EndpointsService = TestBed.get(EndpointsService);

    expect(service.baseURL).toBeDefined();

  });

  //Test to make sure all endpoints are valid/exist
  it('getAllEndpoints works correctly and all endpoints are valid', () => {
    let endpoints: string[] = [];
    const service: EndpointsService = TestBed.get(EndpointsService);

    endpoints = service.getAllEndpoints();
    expect(endpoints[0]).toEqual(baseURL + '/content');
    expect(endpoints[1]).toEqual(baseURL + '/content/${id}');
    expect(endpoints[2]).toEqual(baseURL + '/content');
    expect(endpoints[3]).toEqual(baseURL + '/content/${id}');
    expect(endpoints[4]).toEqual(baseURL + '/content/${id}');
    expect(endpoints[5]).toEqual(baseURL + '/modules');
    expect(endpoints[6]).toEqual(baseURL + '/modules');
    expect(endpoints[7]).toEqual(baseURL + '/modules/${id}');
    expect(endpoints[8]).toEqual(baseURL + '/content?title=${title}&format=${format}&modules=${modules}');
    expect(endpoints[9]).toEqual(baseURL + '/metrics/${timeFrame}');
    expect(endpoints[10]).toEqual(baseURL + '/modules/roots');
    expect(endpoints[11]).toEqual(baseURL + '/modules/${id}/children/');
    expect(endpoints[12]).toEqual(baseURL + '/requests');
    expect(endpoints[13]).toEqual(baseURL + '/request/${id}');
    expect(endpoints[14]).toEqual(baseURL + '/request');
    expect(endpoints[15]).toEqual(baseURL + '/request/${id}');
    expect(endpoints[16]).toEqual(baseURL + '/request/${id}/modules');
    expect(endpoints[17]).toEqual(baseURL + '/request/${id}');
    expect(endpoints[18]).toEqual(baseURL + '/request?title=${title}&format=${format}&modules=${modules}');

  });

});
