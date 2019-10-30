import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatProgressSpinnerModule} from '@angular/material';
import { ToastrModule, ToastrService, ActiveToast } from 'ngx-toastr';
import { ContentFinderPageComponent } from './content-finder-page.component';
import { Content } from 'src/app/models/Content';
import { Link } from 'src/app/models/Link';
import { ModuleStoreService } from 'src/app/services/module-store.service';
import { ContentFetcherService } from 'src/app/services/content-fetcher.service';
import { Filter } from 'src/app/models/Filter';
import { Observable,of } from 'rxjs';
import { HttpHeaderResponse } from '@angular/common/http';
import { Module } from 'src/app/models/Module';
import { MatCardModule } from '@angular/material/card';
import { NO_ERRORS_SCHEMA } from '@angular/core';


describe('ContentFinderPageComponent', () => {
  let component: ContentFinderPageComponent;
  let fixture: ComponentFixture<ContentFinderPageComponent>;
  let cs: ContentFetcherService;
  let csService:ContentFetcherService;
  let toast:ToastrService;

  let msService:ModuleStoreService;

  let c1=null;
  let c2=null;
  let l1=null;
  let l2=null;
  let f1=null;
  let m1=null;
  let me=null;
  
  beforeEach( async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentFinderPageComponent ],
      imports: [
        RouterTestingModule,
        FormsModule,
        NgSelectModule,
        MatProgressSpinnerModule,
        HttpClientTestingModule,
        ToastrModule.forRoot(),
        MatCardModule
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents().then(()=>{
      fixture = TestBed.createComponent(ContentFinderPageComponent);
      component = fixture.componentInstance;
      csService=TestBed.get(ContentFetcherService);
      msService=TestBed.get(ModuleStoreService);
      toast=TestBed.get(ToastrService);
      component.tablebool = true;
      component.title = 'Hello';
      component.selFormat = ['Code', 'Document', 'Powerpoint'];
      component.selectedSubjects = ['Java', 'CSS'];
    });
  }));

  
  beforeEach(() => {
    fixture.detectChanges();
    m1=new Module( 1, "1", 1, [l1], [l1], [l1], [l1]);
    l1=new Link( 1, c1, m1, "reval", 1);
    l2=new Link( 2, c1, m1, "reval", 2);
    c1=new Content(  1, "adsad", "format: string", "description: string", "url: string", [l1,l2]);
    c2=new Content(2,'hey','format: adas','description','www.something.coomo',[l1,l2]);  
    f1=new Filter( "adasd0", ["adawae"],[], []);
  });

  /**
   *
   *  =============Tests start here, first test webpage components==================
   *
   */
    
   it("Submit should call getIDsFromSubjects",()=>{
    
    component.selFormat=["Flagged"];
    component.ms.subjectNameToModule = new Map<string,Module>();
    component.ms.subjectNameToModule.set("1",m1);
    component.selectedSubjects=["1"];
    spyOn(component,'sendSearch');
    component.submit();
    expect(component.sendSearch).toHaveBeenCalled();
    
   });

   it("Submit should call getIDsFromSubjects",()=>{
    
    component.selFormat=[" "];
    component.ms.subjectNameToModule = new Map<string,Module>();
    component.ms.subjectNameToModule.set("1",m1);
    component.selectedSubjects=["1"];
    spyOn(component,'sendSearch');
    component.submit();
    expect(component.sendSearch).toHaveBeenCalled();
    
   });

  it('SendSeach should retrun searchedSubjects',()=>{
     let arr = ['a'];
     component.selectedSubjects=arr;
     component.sendSearch(f1);
     expect(component.searchedSubjects).toBe(arr);
   });

  it('SendSearch should call notEmpty',()=>{
    component.contents=[c1];
    spyOn(csService,'filterContent').and.returnValue(of([c1]));
    spyOn(toast,'error');
    spyOn(component,'notEmpty')
    component.sendSearch(null);
    expect(component.notEmpty).toHaveBeenCalled();
  });

  it('sendSearch should not throw any error',()=>{
    component.contents=[c1];
    spyOn(csService,'filterContent').and.returnValue(of([c1]));
    spyOn(toast,'error');
    component.sendSearch(null);
    expect(component.notEmpty()).toBe(true);
  });

  it('sendSearch should throw error, response was null',()=>{
    component.contents=[c1];
    spyOn(csService,'filterContent').and.returnValue(of(null));
    spyOn(toast,'error');
    component.sendSearch(null);
    expect(toast.error).toHaveBeenCalledWith('Response was null');
        
  });

  it('sendSearch should throw error, Failed to send filter',()=>{
    const observable: Observable<Content[]> = new Observable<Content[]>((observer) => {
      observer.error({status: 400,statusText:'Bad Request'});
      observer.complete();
      return {unsubscribe() {}};
    });
    spyOn(csService,'filterContent').and.returnValue(observable);
    spyOn(toast,'error');
    component.sendSearch(null);
    expect(toast.error).toHaveBeenCalledWith('Failed to send filter');

  });

  it("SubmitForDelete should set call getIDsFromSuubjects",()=>{
    
    spyOn(component,'getIDsFromSubjects').and.returnValue();
    component.selFormat=["All"];
    component.submitForDelete();
    
    expect(component.getIDsFromSubjects).toHaveBeenCalled();

  });

  it("SubmitForDelete should set isSearching=true",()=>{
    spyOn(component,'getIDsFromSubjects').and.returnValue();
    component.submitForDelete();
    expect(component.isSearching).toBe(true);
  });

  it('SubmitForDelete should set selectedSubjects=a',()=>{
    spyOn(component,'getIDsFromSubjects').and.returnValue();
    let arr = ['a'];
    component.selectedSubjects=arr;
    component.submitForDelete();
    expect(component.searchedSubjects).toBe(arr);
  });

  it('SubmitForDelete shoould call parseContentResponse',()=>{
    let c=[c1,c2];
    spyOn(component,'getIDsFromSubjects').and.returnValue();
    spyOn(csService,'filterContent').and.returnValue(of(c));
    spyOn(component,'parseContentResponse');
    component.submitForDelete();
    expect(component.parseContentResponse).toHaveBeenCalled();
  });

  it('SubmitForDelete should call toastError',()=>{
    let c=[];
    component.contents = [c1];
    spyOn(component,'getIDsFromSubjects').and.returnValue();
    spyOn(csService,'filterContent').and.returnValue(of(null));
    spyOn(toast,'error')
    component.submitForDelete();
    expect(toast.error).toHaveBeenCalledWith('Response was null');
  });

  it('submitForDelete should throw error',()=>{
    
    const observable: Observable<Content[]> = new Observable<Content[]>((observer) => {
      observer.error({status: 400,statusText:'Bad Request'});
      observer.complete();
      return {unsubscribe() {}};
    });
    spyOn(component,'getIDsFromSubjects').and.returnValue();
    spyOn(csService,'filterContent').and.returnValue(observable);
    spyOn(toast,'error')
    
    component.submitForDelete();

    expect(toast.error).toHaveBeenCalledWith('Failed to send filter');

  });

  it("createSearch should call sendSearch",()=>{
    spyOn(component,'sendSearch');
    let url = window.location.href;
    component.createSearch(5,url);
    expect(component.sendSearch).toHaveBeenCalled();
  });

  it("createSearch should call sendSearch",()=>{
    spyOn(component,'sendSearch');
    let url = '';
    component.createSearch(5,url);
    expect(component.sendSearch).toHaveBeenCalled();
  });

  it('parseContentResponse should update isSearching to false',()=>{
    component.selFormat=["Flagged"];
    let c=[c1,c2];
    spyOn(component.ms.subjectIdToSortedIndex,'get').and.returnValue(2);
    component.parseContentResponse(c);
    expect(component.isSearching).toBeFalsy();

  });

  it('parseContentResponse should updates Contentents',()=>{
    let c=[c1,c2];
    component.selFormat=["Flagged"];
    
    component.parseContentResponse(c);
    expect(component.contents.length).toBe(2);

  });

  it("notEmpty should return false",()=>{
    component.contents = [c1];
    expect(component.notEmpty()).toBe(true);
  });

  it("notEmpty should return true",()=>{
    component.contents=[];
    expect(component.notEmpty()).toBe(false);
  });

  it("selectedContentForRemoval should change selCon",()=>{
    component.selectedContentForRemoval(c1);
    expect(component.selCon).toBe(c1);
  });

  it('removeContent should call ngOnInit',()=>{
    spyOn(component,'submitForDelete');
    const observable: Observable<HttpHeaderResponse> = new Observable<HttpHeaderResponse>((observer) => {
      observer.next(new HttpHeaderResponse());
      observer.complete();
      return {unsubscribe() {}};
    });
    spyOn(csService,'deleteContentByID').and.returnValue(observable);
    spyOn(component,'ngOnInit')
    component.removeContent();
    expect(component.ngOnInit).toHaveBeenCalled();
  });

  it('removeContent should call submitForDelete',()=>{
    spyOn(component,'submitForDelete');
    const observable: Observable<HttpHeaderResponse> = new Observable<HttpHeaderResponse>((observer) => {
      observer.next(new HttpHeaderResponse());
      observer.complete();
      return {unsubscribe() {}};
    });
    const observable1: Observable<Content[]> = new Observable<Content[]>((observer) => {
      observer.next([]);
      observer.complete();
      return {unsubscribe() {}};
    });
    spyOn(csService,'deleteContentByID').and.returnValue(observable);
    spyOn(csService,'filterContent').and.returnValue(observable1);
    
    component.ngOnInit();
    component.removeContent();
    expect(component.submitForDelete).toHaveBeenCalled();
  });

  it ('selectedContent should update selCon',()=>{
    
    component.ms.subjectNames=[];
    component.selectedContent(c1);
    expect(component.selCon).toBe(c1);
  });

  it ('selectedContent should not do anything',()=>{
    
    component.ms.subjectNames=[];
    component.ms.subjectNames.push(c2);
    
    component.selectedContent(c2);
  });

  it('selectedContent should update tagOptions',()=>{
    
    let tempArr:string[]=[];
    component.ms.subjectNames=['aDASD'];
    tempArr.push(component.ms.subjectNames[0]);
    component.selectedContent(c1);
    let c=component.tagOptions;
    expect(c[0]).toBe(tempArr[0]);
  });
  
  it("should not update tagOptions, selectedContent test",()=>{
    let module10:Module= new Module(10, "Java10", 12345, [], [], [], []);
    let link10:Link = new Link(10, c1, module10, "affilication", 10);
    let content10:Content = new Content(10, "Java10", "String", "Description", "Url", [link10]);
    component.ms.subjectIdToName.set(10,module10.subject);
    component.ms.subjectNames = [module10.subject];
    component.selectedContent(content10);
    expect(component.tagOptions.length).toBe(0);
  });

  it('selectedLinkForRemoval should change selCon',()=>{
    component.selectedLinkForRemoval(c1,l1);
    expect(component.selCon).toBe(c1);
  });

  it('selectedLinkForRemoval should change selLink',()=>{
    component.selectedLinkForRemoval(c1,l1);
    expect(component.selLink).toBe(l1);
  });
  
  it('updateTags should do nothing',()=>{
    component.selCon=c1;
    component.updateTags();
    expect(component.selCon).toBe(c1);
  });

  it('updateTags should call cs.updateContent',()=>{
    component.selectedTags=["a","b"];
    const observable: Observable<HttpHeaderResponse> = new Observable<HttpHeaderResponse>((observer) => {
      observer.next(c1);
      observer.complete();
      return {unsubscribe() {}};
    });
    spyOn(csService,'updateContent').and.returnValue(observable);
    component.updateTags();
    expect(csService.updateContent).toHaveBeenCalled();
  });

  it('updateTags should call cs.addLinkToContent',()=>{
    component.selectedTags=["a","b"];
    const observable: Observable<HttpHeaderResponse> = new Observable<HttpHeaderResponse>((observer) => {
      observer.next(l1);
      observer.complete();
      return {unsubscribe() {}};
    });
    spyOn(csService,'addLinkToContent').and.returnValue(observable);
    component.updateTags();
    expect(component.selCon.links).toBe(l1);
  });

  it('removeTag should call submit',()=>{
    component.selLink=l1;
    const observable: Observable<HttpHeaderResponse> = new Observable<HttpHeaderResponse>((observer) => {
      observer.next(new HttpHeaderResponse());
      observer.complete();
      return {unsubscribe() {}};
    });
    spyOn(csService,'removeLinkFromContent').and.returnValue(observable);
    
    me=spyOn(component,'submit');
    component.removeTag();
    expect(me).toHaveBeenCalled();
  });

  it('DoThis should return a component',()=>{
    spyOn(component,'submitForDelete');
    expect(component.DoThis(1,1)).toBe(ContentFinderPageComponent.generateLinkId(1,1));
  });

  it('gotoRequest should return nothing',()=>{

    let A=component.gotoRequest();
    expect(A).toBeFalsy();

  });

  //  First test to make sure component is created
  it('Should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('Should have Revature logo displayed', () => {
    expect(document.getElementById('logo')).toBeTruthy();
  });

  it('Should have a title input box displayed', () => {
    expect(document.getElementsByName('title')).toBeTruthy();
  });

  it('Should have a drop down menu to Select Relevant Modules that are available.', () => {
    expect(document.getElementById('subjectDropDown')).toBeTruthy();
  });

  it('Should have a submit button labled "Find Content"', () => {
    expect(document.getElementById('submitButton')).toBeTruthy();
  });

  // // The table has a variety of elements that need to be tested <= to figure out
  // it('Should create a table when "tablebool" is triggered to be "True"', () => {
  //   expect(document.getElementById('ResultsTable')).toBeTruthy();
  // })

  // Now test methods

  // Test the Reset Function
  it('Should reset page  and empty array', () => {
    component.reset();
    expect(component.title).toEqual('');    
  });

  it('Should test reset page, selFormat length should be 3  ',()=>{
    component.reset();
    expect(component.selFormat.length).toEqual(3);
  });
  
  it('Should reset page, string Title', () => {
    component.reset();
    expect(component.title).toEqual('');
  });

  it('Should reset page, selformat length should equal 3', () => {
    component.reset();
    expect(component.selFormat.length).toEqual(3);
  });

  it('Should reset page, empty array', () => {
    component.reset();
    expect(component.selectedSubjects).toEqual([]);
  });
  
});
