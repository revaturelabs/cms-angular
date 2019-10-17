import { TestBed, fakeAsync, tick, ComponentFixture, flushMicrotasks, discardPeriodicTasks } from '@angular/core/testing';
import { ModuleStoreService } from './module-store.service';
import { environment } from '../../environments/environment';
import { Module } from '../models/Module';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';
import { Link } from '../models/Link';

describe('ModuleStoreService', () => {
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

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('loadModules response not null', fakeAsync(() => {
    let response:Module[] = [];
    service.loadModules().then(function(value) {expect(response.length).toBe(value.length);});
    const req = httpTestingController.expectOne(baseURL + '/modules');
    expect(req.request.method).toEqual('GET');
    req.flush(response);
    tick(Infinity);
  }));

  it('loadModules response null', fakeAsync(() => {
    service.loadModules().then(function(value) {expect(0).toBe(value.length);});
    const req = httpTestingController.expectOne(baseURL + '/modules');
    expect(req.request.method).toEqual('GET');
    req.flush(null);
    tick(Infinity);
  }));

  it('loadModules error', fakeAsync(() => {
    service.loadModules().then(function(value) {expect(0).toBe(value.length);});
    const req = httpTestingController.expectOne(baseURL + '/modules');
    expect(req.request.method).toEqual('GET');
    req.error(null, {status: 400, statusText: "Bad Request"});
    tick(Infinity);
  }));

  it('loadModules response not null subjectIDToRootModule not empty', fakeAsync(() => {
    let module: Module = new Module(1,"Java", 12345,null,null,null,null);
    let response:Module[] = [module];
    service.subjectIDToRootModule.set(1,module);
    service.loadModules().then(function(value) {expect(response.length).toBe(value.length);});
    const req = httpTestingController.expectOne(baseURL + '/modules');
    expect(req.request.method).toEqual('GET');
    req.flush(response);
    tick(Infinity);
  }));

  it('loadEmptyModules response not null', fakeAsync(() => {
    let module: Module = new Module(1,"Java", 12345,null,null,null,null);
    let response:Module[] = [module];
    service.subjectIDToRootModule.set(1,module);
    service.loadEmptyModules();
    const req = httpTestingController.expectOne(baseURL + '/modules');
    expect(req.request.method).toEqual('GET');
    req.flush(response);
    tick(Infinity);
  }));

  it('loadEmptyModules response not null, response links not empty', fakeAsync(() => {
    let link: Link = new Link(1,null,null,"affiliation", 1);
    let module: Module = new Module(1,"Java", 12345,[link],null,null,null);
    link.module = module;
    let response:Module[] = [module];
    service.subjectIDToRootModule.set(1,module);
    service.loadEmptyModules();
    const req = httpTestingController.expectOne(baseURL + '/modules');
    expect(req.request.method).toEqual('GET');
    req.flush(response);
    tick(Infinity);
  }));

  it('loadEmptyModules response null', fakeAsync(() => {
    service.loadEmptyModules();
    const req = httpTestingController.expectOne(baseURL + '/modules');
    expect(req.request.method).toEqual('GET');
    req.flush(null);
    tick(Infinity);
  }));

  it('loadEmptyModules error', fakeAsync(() => {
    service.loadEmptyModules();
    const req = httpTestingController.expectOne(baseURL + '/modules');
    expect(req.request.method).toEqual('GET');
    req.error(null, {status: 400, statusText: "Bad Request"});
    tick(Infinity);
  }));

  it('populateCollections test sort 1', fakeAsync(() => {
    let module1: Module = new Module(1,"Java", 12345,null,null,null,null);
    let module2: Module = new Module(1,"C#", 12345,null,null,null,null);
    let modules:Module[] = [module1,module2];
    service.populateCollections(modules);
    expect(modules[1]).toBe(module1);
  }));

  it('populateCollections test sort 2', fakeAsync(() => {
    let module1: Module = new Module(1,"Java", 12345,null,null,null,null);
    let module2: Module = new Module(1,"C#", 12345,null,null,null,null);
    let modules:Module[] = [module2,module1];
    service.populateCollections(modules);
    expect(modules[0]).toBe(module2);
  }));

  it('populateCollections test parent exists', fakeAsync(() => {
    let module1: Module = new Module(1,"Java", 12345,null,null,null,null);
    let module2: Module = new Module(1,"C#", 12345,null,null,[module1],null);
    let modules:Module[] = [module2,module1];
    service.populateCollections(modules);
    expect(modules[0].parents[0]).toBe(module1);
  }));

  it('populateModuleChildObjects', fakeAsync(() => {
    let grandchildren = new Module(3,"JavaScript", 12345,null,null,null,null);
    let children: Module[] = [grandchildren];
    let parent: Module = new Module(1,"Java", 12345,null,null,null,children);
    service.subjectIdToModule = new Map<number, Module>();
    service.subjectIdToModule = service.subjectIdToModule.set(1,parent);
    service.subjectIdToModule = service.subjectIdToModule.set(3,grandchildren);
    let module1: Module = new Module(1,"Java", 12345,null,null,null,null);
    let module2: Module = new Module(2,"C#", 12345,null,null,null,[module1]);
    let modules:Module[] = [module2];
    service.populateModuleChildObjects(modules);
    expect(modules[0].children[0].children[0]).toBe(grandchildren)
  }));

  it('populateModuleChildObjects no children', fakeAsync(() => {
    let module2: Module = new Module(2,"C#", 12345,null,null,null,null);
    let modules:Module[] = [module2];
    service.populateModuleChildObjects(modules);
    expect(modules[0].children.length).toBe(0)
  }));

  it('addParents', fakeAsync(() => {
    let parent = new Module(4,"TypeScript", 12345,null,null,null,null);
    let children = new Module(3,"JavaScript", 12345,null,null,[parent],null);
    let module1: Module = new Module(1,"Java", 12345,null,null,null,null);
    let module2: Module = new Module(2,"C#", 12345,null,null,null,null);
    let modules:Module[] = [module1,module2];
    service.addParents(children, modules);
    expect(children.parents.length).toBe([parent, ...modules].length)
  }));

  it('addParents parentid == currentmoduleid', fakeAsync(() => {
    let parent = new Module(4,"TypeScript", 12345,null,null,null,null);
    let children = new Module(3,"JavaScript", 12345,null,null,[parent],null);
    let module1: Module = new Module(1,"Java", 12345,null,null,null,null);
    let modules:Module[] = [module1,children];
    service.addParents(children, modules);
    expect(children.parents.length).not.toBe([parent, ...modules].length)
  }));

});
