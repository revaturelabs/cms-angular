import { TestBed, fakeAsync, tick, ComponentFixture } from '@angular/core/testing';

import { ModuleStoreService } from './module-store.service';
import { environment } from '../../environments/environment';
import { Module } from '../models/Module';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';

describe('ModuleStoreService', () => {
  let service: ModuleStoreService;
  let httpTestingController: HttpTestingController;
  let baseURL;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ToastrModule.forRoot()
      ]
    });
    service = TestBed.get(ModuleStoreService);
    httpTestingController = TestBed.get(HttpTestingController);

    baseURL = environment.cms_url;
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
  it('should return an Observable<Module[]> Load Modules', fakeAsync(() => {
    let subject: string = baseURL + '/module';
  }));

  it('', () => {

  });

});
