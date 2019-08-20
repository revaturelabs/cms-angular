import { TestBed, fakeAsync, tick, ComponentFixture } from "@angular/core/testing";

import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";


import { ModuleFetcherService } from './module-fetcher.service';
import { environment } from '../../environments/environment';
import { Module } from '../models/Module';
import { Link } from '../models/Link';
import { HttpHeaderResponse } from '@angular/common/http';

describe('ModuleFetcherService', () => {
  let service: ModuleFetcherService;
  let httpTestingController: HttpTestingController;
  let baseURL;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        ModuleFetcherService
      ]
    });

    service = TestBed.get(ModuleFetcherService);
    httpTestingController = TestBed.get(HttpTestingController);
    baseURL = environment.cms_url;

  });

  afterEach(() => {
    httpTestingController.verify();
    
  });

  // Initial test for service creation
  it('should be created', () => {
    const service: ModuleFetcherService = TestBed.get(ModuleFetcherService);
    expect(service).toBeTruthy();

  });

  // Using mocking, this should return an Observable<Module[]>
  /** 
    * First stipulate the fakeAsync() 
    * function to generate an empty resposne that one will manually 
    * populate. Using service.getAllModules().subscribe() will give a 
    * mocked response. Lastly do a test as necessary to test if the method
    * is indeed a "GET" method, and use req.flush(response) and tick() to 
    * finalize mock.
    */
  it('should return an Observable<Module[]> Get all', fakeAsync(() => {
    let url: string = baseURL + '/module';
    let response = {
      resaultCount: 1,
      response: [
        {
          id: 5,
          subject: 'Java',
          created: 14454,
          links: [{ id: 12, contentId: 12, moduleId: 5, affiliation: 'Java' }]
        }
      ]
    };

    let output: Module[];
    service.getAllModules().subscribe(
      response => {
        output = response;
      }
    );
    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toEqual("GET");
    req.flush(response);
    tick();

  }));

  // A similar process as above is used to retrieve an
  // Observable from getById
  it('should return an Observable<Module> get by id', fakeAsync(() => {
    let url: string = baseURL + '/module/5'
    let response = {
      resaultCount: 1,
      response: [
        {
          id: 5,
          subject: 'Java',
          created: 14454,
          links: [{ id: 12, contentId: 12, moduleId: 5, affiliation: 'Java' }]
        }
      ]
    };

    let output: Module;
    service.getModuleByID(5).subscribe(
      response => {
        output = response;
      }
    );
    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toEqual("GET");
    req.flush(response);
    tick();

  }));

  // Similar mocking done for createNewModule()
  it('should return an Observable<HttpHeaderResponse> Create', fakeAsync(() => {
    let url: string = baseURL + '/module';
    let response = {
      resaultCount: 1,
      response: [
        {
          id: 5,
          subject: 'Java',
          created: 14454,
          links: [{ id: 12, contentId: 12, moduleId: 5, affiliation: 'Java' }]
        }
      ]
    };
    let links: Link[] = [];
    let input: Module = new Module(null, "CSS", null, links)
    let output: HttpHeaderResponse;

    service.createNewModule(input).subscribe(
      response => {
        output = response;
      }
    );
    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toEqual("POST");
    req.flush(response);
    tick();

  }));

  //Used to mock delete a module by id
  it('should return an Observable<Module> delete by id', fakeAsync(() => {
    let url: string = baseURL + '/module/5'
    let response = {
      resaultCount: 0,
      response: []
    };
    let output: HttpHeaderResponse;

    service.deleteModuleByID(5).subscribe(
      response => {
        output = response;
      }
    );
    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toEqual("DELETE");
    req.flush(response);
    tick();

  }));

  // A getAllFakeData method is needed in the project, so mocking is needed
  // once again.
  it('should return an Observable<Module[]> Get all fake data', fakeAsync(() => {
    let url: string = 'radomhtml:1515/module';
    let response = {
      resaultCount: 1,
      response: [
        {
          id: 5,
          subject: 'Java',
          created: 14454,
          links: [{ id: 12, contentId: 12, moduleId: 5, affiliation: 'Java' }]
        }
      ]
    };
    let output: Module[];
    
    service.getAllFakeModules(url).subscribe(
      response => {
        output = response;
      }
    );
    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toEqual("GET");
    req.flush(response);
    tick();

  }));

});
