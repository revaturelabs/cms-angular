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
    ]});
    service = TestBed.get(ModuleStoreService);
    httpTestingController = TestBed.get(HttpTestingController);

    baseURL = environment.cms_url;
  });

  it('should be created', () => {
    const service: ModuleStoreService = TestBed.get(ModuleStoreService);
    expect(service).toBeTruthy();
  });

  it('should return an Observable<Module[]> Load Modules', fakeAsync(() => {
    let subject: string = baseURL + '/module';
  }));

  it('', () => {

  });

});
