import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatProgressSpinnerModule } from '@angular/material';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';
import { ResolveRequestPageComponent } from './resolve-request-page.component';
import { RouterTestingModule } from '@angular/router/testing';
import { TreeModule } from 'angular-tree-component';
import { ContentCreatorPageComponent } from '../content-creator-page/content-creator-page.component';
import { Request } from 'src/app/models/Request';
import { environment } from '../../../environments/environment'
import { Content } from '../../models/Content';
import { Filter } from '../../models/Filter';
import { Link } from 'src/app/models/Link';
import { ModuleStoreService } from '../../services/module-store.service';
import { Module } from '../../models/Module';
import { Location } from '@angular/common';
import { RequestFetcherService } from 'src/app/services/request-fetcher.service';
import { Observable, of } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ContentFetcherService } from 'src/app/services/content-fetcher.service';

/*
 * Since the ngOninit makes requests, it is better to use spies over the httpcontroller for testing calls. 
 * Although, It is still possible to use httpcontroller with its match method.
 */
xdescribe('ResolveRequestPageComponent', () => {
  let component: ResolveRequestPageComponent;
  let fixture: ComponentFixture<ResolveRequestPageComponent>;
  let httpTestingController: HttpTestingController;
  let requestFetcherService: RequestFetcherService;
  let contentFetcherService:ContentFetcherService;
  let location: Location;

  let url:string;
  let baseURL:string;
  let filter: Filter = new Filter("Java",["String"], [],[]);
  let content1:Content = new Content(1, "Java", "String", "description", "url", null);
  let content2:Content = new Content(2, "C#", "String", "description", "url", null);
  let module1:Module = new Module(1,"Java",12345,null,null,null,null);
  let module2:Module = new Module(2,"C#",12345,null,null,null,null);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule,
        NgSelectModule,
        MatProgressSpinnerModule,
        HttpClientTestingModule,
        ToastrModule.forRoot(),
        TreeModule.forRoot(),
        RouterTestingModule,
        MatCardModule,
        BrowserAnimationsModule
      ],
      providers: [Location, RequestFetcherService, ContentFetcherService],
      declarations: [ ResolveRequestPageComponent, ContentCreatorPageComponent ]
    })
    .compileComponents().then(()=>{
      fixture = TestBed.createComponent(ResolveRequestPageComponent);
      component = fixture.componentInstance;
      httpTestingController = TestBed.get(HttpTestingController);
      requestFetcherService = TestBed.get(RequestFetcherService);
      contentFetcherService = TestBed.get(ContentFetcherService);
      location = TestBed.get(Location);
      location.onUrlChange((urlChanged)=>{url=urlChanged})
      baseURL = environment.cms_url;
      component.session.clear();
    });
  }));

  beforeEach(() => {
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('Should test ngOnInit when session request is not null, getRequestByID called with 1', () => {
    component.session.set("request",1)
    let response: Request =  new Request(1,"Java", "String", "Description", null, null);
    let spy = spyOn(requestFetcherService,'getRequestByID').and.returnValue(of(response));
    component.ngOnInit();
    expect(spy).toHaveBeenCalledWith(1);
  });

  it('Should test ngOnInit when session request is null, getRequestByID called with 0', () => {
    let response: Request =  new Request(1,"Java", "String", "Description", null, null);
    let spy = spyOn(requestFetcherService, 'getRequestByID').and.returnValue(of(response));
    component.ngOnInit();
    expect(spy).toHaveBeenCalledWith(0);
  });

  it('ngOnInit test getAllContent', () => {
    let contents = [content1];
    let spy = spyOn(contentFetcherService, "getAllContent").and.returnValue(of(contents));
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('choose toggle false', () => {
    component.toggle = false;
    component.choose();
    expect(component.btntog).toBe("Click Here to Add New Content");
  });

  it('choose toggle true', () => {
    component.toggle = true;
    component.choose();
    expect(component.btntog).toBe('Click Here to Search Content to Resolve Request');
  });

  it('sendSearch response not null', () => {
    component.sendSearch(filter);
    let url = baseURL + `/content?title=Java&format=String&modules=&curriculum=`;
    const req = httpTestingController.expectOne(url);
    req.flush([content1])
    expect(req.request.method).toEqual("GET");
  });

  it('sendSearch response not null, this empty', () => {
    spyOn(component, "notEmpty").and.returnValue(false)
    component.sendSearch(filter);
    let url = baseURL + `/content?title=Java&format=String&modules=&curriculum=`;
    const req = httpTestingController.expectOne(url);
    req.flush([content1])
    expect(component.toastr.previousToastMessage).toBe('No Results Found')
  });

  it('sendSearch response null', () => {
    component.sendSearch(filter);
    let url = baseURL + `/content?title=Java&format=String&modules=&curriculum=`;
    const req = httpTestingController.expectOne(url);
    req.flush(null)
    expect(component.toastr.previousToastMessage).toBe('Response was null')
  });

  it('sendSearch error', () => {
    component.sendSearch(filter);
    let url = baseURL + `/content?title=Java&format=String&modules=&curriculum=`;
    const req = httpTestingController.expectOne(url);
    req.error(null,{status: 400, statusText: "Bad Request"})
    expect(component.toastr.previousToastMessage).toBe("Failed to send filter")
  });
  it('parseContentResponse test sort 1', () => {
    let contents = [content1, content2];
    component.parseContentResponse(contents);
    expect(contents[1]).toBe(content2)
  });
  it('parseContentResponse test sort 2', () => {
    let link1: Link = new Link(1, content1, null, "affiliation", 1);
    let link2: Link = new Link(1, content2, null, "affiliation",1);
    content1.links = [link1, link2]
    let contents = [content2, content1];
    link1.module = module1;
    link2.module = module2;
    component.ms = new ModuleStoreService(null,null,null, null);
    component.ms.subjectIdToSortedIndex = new Map<number, number>(); 
    component.ms.subjectIdToSortedIndex.set(1,1)
    component.ms.subjectIdToSortedIndex.set(2,2)
    component.parseContentResponse(contents);
    expect(contents[0]).toBe(content1)
  });
  it('notEmpty tablebool false', () => {
    component.contents = [];
    component.notEmpty()
    expect(component.tablebool).toBe(false)
  });
  it('notEmpty tablebool true', () => {
    component.contents = [content1];
    component.notEmpty()
    expect(component.tablebool).toBe(true)
  });

  it('getIDsFromSubjects param empty', () => {
    component.getIDsFromSubjects([])
    expect(component.moduleIDs.length).toBe(0)
  });

  it('getIDsFromSubjects param not empty', () => {
    let subjects: string[] = ["Java", "C#"];
    component.ms = new ModuleStoreService(null,null,null, null);
    component.ms.subjectNameToModule = new Map<string, Module>();
    component.ms.subjectNameToModule.set("Java", module1);
    component.ms.subjectNameToModule.set("C#", module2);
    component.getIDsFromSubjects(subjects)
    expect(component.moduleIDs.length).not.toBe(0)
  });

  it('updateURL', () => {
    component.updateURL(filter)
    expect(url).toBe('/finder?title=Java&format=String&modules=')
  });

  it('submit selFormat All', () => {
    component.selFormat = "All"
    component.submit();
    expect(url).toBe('/finder?title=&format=&modules=')
  });

  it('submit selFormat Flagged', () => {
    component.selFormat = "Flagged"
    component.submit();
    expect(url).toBe('/finder?title=&format=&modules=')
  });

  it('submit selFormat NONE', () => {
    component.selFormat = "NONE"
    component.submit();
    expect(url).toBe('/finder?title=&format=NONE&modules=')
  });

  it('addContent toastr test', () => {
    component.addContent(content1);
    expect(component.toastr.previousToastMessage).toBe("Content chosen.")
  });

  it('addContent content test', () => {
    component.addContent(content1);
    expect(component.cont).toBe(content1)
  });

  it('Should test updateRequest, expecting rs.updateRequestByID to be called', ()=>{
    let request: Request =  new Request(1,"Java", "String", "Description", null, null);
    component.request = request;
    let spy = spyOn(requestFetcherService, 'updateRequestByID').and.returnValue(of(request));
    spyOn(component.router, 'navigate').and.callFake(()=>Promise.resolve(true))
    component.updateRequest(null);
    expect(spy).toHaveBeenCalledWith(component.request.id, component.request);
  });

  it('Should test sucessfull updateRequest toastr message', () => {
    let request: Request =  new Request(1,"Java", "String", "Description", null, null);
    const observable: Observable<Request> = new Observable<Request>((observer) => {
      observer.next(request);
      observer.complete();
    });
    spyOn(requestFetcherService, "updateRequestByID").and.returnValue(observable);
    spyOn(component.router, 'navigate').and.callFake(()=>Promise.resolve(true))
    component.updateRequest(null);
    expect(component.toastr.previousToastMessage).toBe('Request Successfully Updated.')
  });

});
