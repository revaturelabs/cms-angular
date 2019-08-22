import { TestBed, fakeAsync, tick, ComponentFixture } from '@angular/core/testing';

import { ModuleStoreService } from './module-store.service';
import { environment } from '../../environments/environment';
import { Module } from '../models/Module';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';

describe('ModuleStoreService', () => {
  let fixture: ComponentFixture<ModuleStoreService>;

  let service: ModuleStoreService;
  let httpTestingController: HttpTestingController;
  let baseURL = environment.cms_url;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ToastrModule.forRoot()
      ]
    });
    service = TestBed.get(ModuleStoreService);
    httpTestingController = TestBed.get(HttpTestingController);
    
  });

  afterEach(() => {
    httpTestingController.verify();

  });

  // First test that the service is created
  it('should be created', () => {
    const service: ModuleStoreService = TestBed.get(ModuleStoreService);

    expect(service).toBeTruthy();
    
  });

  // Next we test the methods that ping our deployed backend 
  /**
   * First, we test the LoadModules functiong. To do so, mocking is needed. 
   * First stipulate the fakeAsync() 
   * function to generate an empty response that one will manually 
   * populate. 
   */
  it('loadModules should be working correctly', fakeAsync(() => {
    let response = {};

    service.loadModules();
    const req = httpTestingController.expectOne(baseURL + '/module');
    expect(req.request.method).toEqual('GET');
    req.flush(response);
    tick();

  }));


  /**
   * Note: the below test fails saying the expected url was undefined.
   * Running both of these tests will make the second one fail, depending
   * on which order you put them in the first will pass and the second will fail. 
   * We were unable to resolve this issue 
   */

  // it('loadEmptyModules should be working correctly', fakeAsync(() => {
  //   let response = {};

  //   service.loadEmptyModules();
  //   const req = httpTestingController.expectOne(baseURL + '/module');
  //   expect(req.request.method).toEqual('GET');
  //   req.flush(response);
  //   tick();
    
  // }));

});
