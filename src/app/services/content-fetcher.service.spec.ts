import { TestBed, fakeAsync, tick } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../environments/environment'

import { ContentFetcherService } from './content-fetcher.service';
import { Content } from '../models/Content';
import { Module } from '../models/Module';
import { Filter } from '../models/Filter';

describe('ContentFetcherService', () => {
  let httpTestingController: HttpTestingController;
  let service: ContentFetcherService;
  let baseURL = environment.cms_url;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ContentFetcherService]
  });
  service = TestBed.get(ContentFetcherService);
  httpTestingController = TestBed.get(HttpTestingController);
});

afterEach(() => {
  httpTestingController.verify();
});

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getAllContent is working', fakeAsync(() => {
    let response = {};

    service.getAllContent().subscribe(
      (receivedResponse: any) => {},
      (error: any) => {}
    );
    const req = httpTestingController.expectOne(baseURL + '/content');
    expect(req.request.method).toEqual("GET");
    req.flush(response);
    tick();

  }));

  
  it('getContentByID is working', fakeAsync(() => {
    let response = {};
    

    service.getContentByID(1).subscribe(
      (receivedResponse: any) => {},
      (error: any) => {}
    );
    const req = httpTestingController.expectOne(baseURL + '/content/1');
    expect(req.request.method).toEqual("GET");
    req.flush(response);
    tick();

  }));

  it('createNewContent is working', fakeAsync(() => {
    let response = {};
    let content: Content = new Content(null, null, null, null, null, null)
    
    service.createNewContent(content).subscribe(
      (receivedResponse: any) => {},
      (error: any) => {}
    );
    const req = httpTestingController.expectOne(baseURL + '/content');
    expect(req.request.method).toEqual("POST");
    req.flush(response);
    tick();

  }));

  it('updateContentById is working', fakeAsync(() => {
    let response = {};
    let content: Content = new Content(null, null, null, null, null, null)

    service.updateContentById(1, content).subscribe(
      (receivedResponse: any) => {},
      (error: any) => {}
    );
    const req = httpTestingController.expectOne(baseURL + '/content/1');
    expect(req.request.method).toEqual("PUT");
    req.flush(response);
    tick();

  }));

  

  it('updateContentByContent is working', fakeAsync(() => {
    let response = {};
    let content: Content = new Content(null, null, null, null, null, null)

    service.updateContentByContent(content).subscribe(
      (receivedResponse: any) => {},
      (error: any) => {}
    );
    const req = httpTestingController.expectOne(baseURL + '/content');
    expect(req.request.method).toEqual("PUT");
    req.flush(response);
    tick();

  }));

  it('updateContentModulesById is working', fakeAsync(() => {
    let response = {};
    let modules: Module []; 

    service.updateContentModulesById(1, modules).subscribe(
      (receivedResponse: any) => {},
      (error: any) => {}
    );
    const req = httpTestingController.expectOne(baseURL + '/content/1/modules');
    expect(req.request.method).toEqual("PUT");
    req.flush(response);
    tick();

  }));

  it('deleteContentByID is working', fakeAsync(() => {
    let response = {};
    service.deleteContentByID(1).subscribe(
      (receivedResponse: any) => {},
      (error: any) => {}
    );
    const req = httpTestingController.expectOne(baseURL + '/content/1');
    expect(req.request.method).toEqual("DELETE");
    req.flush(response);
    tick();

  }));

  it('filterContent is working', fakeAsync(() => {
    let response = {};
    let filter: Filter = new Filter(null, null, null);
    service.filterContent(filter).subscribe(
      (receivedResponse: any) => {},
      (error: any) => {}
    );
    const req = httpTestingController.expectOne(baseURL + '/search');
    expect(req.request.method).toEqual("POST");
    req.flush(response);
    tick();

  }));


});
