import { TestBed, fakeAsync, tick, ComponentFixture } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import { ModuleFetcherService } from './module-fetcher.service';
import { environment } from '../../environments/environment';
import { Module } from '../models/Module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ModuleFetcherService', () => {
  let service: ModuleFetcherService;
  let httpTestingController: HttpTestingController;
  let baseURL;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        BrowserAnimationsModule
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

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should test getAllModules', fakeAsync(() => {
    let url: string = baseURL + '/modules';
    service.getAllModules().subscribe();
    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toEqual("GET");
    req.flush([]);
    tick();
  }));

  it('should test getModuleByID', fakeAsync(() => {
    let url: string = baseURL + '/modules/5'
    service.getModuleByID(5).subscribe();
    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toEqual("GET");
    req.flush(null);
    tick();
  }));

  it('should test getChildrenById', fakeAsync(() => {
    let url: string = baseURL + '/modules/5/children/' 
    service.getChildrenById(5).subscribe();
    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toEqual("GET");
    req.flush([]);
    tick();
  }));

  it('should test createOrUpdateModule id < 1', fakeAsync(() => {
    let url: string = baseURL + '/modules';
    service.createOrUpdateModule(new Module(-1, "CSS", null, [], [], [], [])).subscribe();
    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toEqual("POST");
    req.flush(null);
    tick();
  }));

  it('should test createOrUpdateModule id > 0', fakeAsync(() => {
    let url: string = baseURL + '/modules/5';
    service.createOrUpdateModule(new Module(5, "CSS", null, [], [], [], [])).subscribe();
    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toEqual("PUT");
    req.flush(null);
    tick();
  }));

  it('should test deleteModuleByID', fakeAsync(() => {
    let url: string = baseURL + '/modules/5'
    service.deleteModuleByID(5).subscribe();
    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toEqual("DELETE");
    req.flush(null);
    tick();
  }));

  it('should test deleteModuleWithSpecificContent', fakeAsync(() => {
    let url: string = baseURL + '/modules/5?type=unique'
    service.deleteModuleWithSpecificContent(5).subscribe();
    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toEqual("DELETE");
    req.flush(null);
    tick();
  }));

  it('should test deleteModuleWithContent', fakeAsync(() => {
    let url: string = baseURL + '/modules/5?type=all'
    service.deleteModuleWithContent(5).subscribe();
    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toEqual("DELETE");
    req.flush(null);
    tick();
  }));

  it('should test getAllFakeModules', fakeAsync(() => {
    let url: string = 'radomhtml:1515/module';
    service.getAllFakeModules(url).subscribe();
    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toEqual("GET");
    req.flush(null);
    tick();
  }));

  it('should test the batman', fakeAsync(() => {
    let url: string = baseURL + '/modules/roots';  
    service.batman().subscribe();
    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toEqual("GET");
    req.flush([]);
    tick();
  }));

});
