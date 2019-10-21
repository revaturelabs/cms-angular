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
import { Observable, Subject } from 'rxjs';
import { HttpHeaderResponse } from '@angular/common/http';
import { Module } from 'src/app/models/Module';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


describe('ContentFinderPageComponent', () => {
  let component: ContentFinderPageComponent;
  let fixture: ComponentFixture<ContentFinderPageComponent>;
  let cs: ContentFetcherService;
  let csService:ContentFetcherService;
  let toast:ToastrService;

  let msService:ModuleStoreService;

  let c1=null;
  let l1=null;
  let f1=null;
  let m1=null;
  let me=null;

  beforeEach(
    async(
      () => {
    TestBed.configureTestingModule({
      declarations: [ ContentFinderPageComponent ],
      imports: [
        RouterTestingModule,
        FormsModule,
        NgSelectModule,
        MatProgressSpinnerModule,
        HttpClientTestingModule,
        ToastrModule.forRoot(),
        MatCardModule,
        BrowserAnimationsModule
      ],
      providers: [ContentFetcherService,ModuleStoreService,ToastrService],
       
        
      
        
      
    })
    .compileComponents().then(()=>{
      
    fixture = TestBed.createComponent(ContentFinderPageComponent);
    component = fixture.componentInstance;
    csService=TestBed.get(ContentFetcherService);
    msService=TestBed.get(ModuleStoreService);
    toast=TestBed.get(ToastrService);
    fixture.detectChanges();

    c1=new Content(  1, 
      "adsad", 
      "format: string", 
      "description: string", 
      "url: string", []);
      l1=new Link( 1,
        c1,
        m1,
        "reval",
        1
      );
    f1=new Filter(
      "adasd0",
      "adawae",
      []
    );
    m1=new Module(
      1,
      "1",
      1,
      [l1],
      [l1],
      [],
      []

    );
    component.tablebool = true;
    component.title = 'Hello';
    component.selFormat = 'Code';
    component.selectedSubjects = ['Java', 'CSS'];
    
    });
  }));

  
  beforeEach(() => {
    fixture.detectChanges();
    
  });

  /**
   *
   *  =============Tests start here, first test webpage components==================
   *
   */
    
   it("Submit should call getIDsFromSubjects",()=>{
    
    
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

  it('SendSearch should call error',()=>{
    const observable: Observable<Content[]> = new Observable<Content[]>((observer) => {
      observer.next([c1]);
      observer.complete();
      return {unsubscribe() {console.log("updateRequest test - unsubscribed")}};
    });
    
    spyOn(csService,'filterContent').and.returnValue(observable);
    spyOn(toast,'error');
    spyOn(component,'notEmpty')
    component.sendSearch(null);
    expect(component.notEmpty).toHaveBeenCalled();
  });


  it("SubmitForDelete should set call getIDsFromSuubjects",()=>{
    
    spyOn(component,'getIDsFromSubjects').and.returnValue();
    component.selFormat="All";
    component.submitForDelete();
    
    expect(component.getIDsFromSubjects).toHaveBeenCalled();

  });
  it("SubmitForDelete should set isSearching=true",()=>{
    spyOn(component,'getIDsFromSubjects').and.returnValue();
    component.submitForDelete();
    expect(component.isSearching).toBe(true);
  })
  it('SubmitForDelete should set selectedSubjects=a',()=>{
    spyOn(component,'getIDsFromSubjects').and.returnValue();
    let arr = ['a'];
    component.selectedSubjects=arr;
    console.log("Im In")
    component.submitForDelete();
    expect(component.searchedSubjects).toBe(arr);
  });


   it("createSearch should call sendSearch",()=>{
    spyOn(component,'sendSearch');
    let url = window.location.href;
     component.createSearch(5,url);
     expect(component.sendSearch).toHaveBeenCalled();
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

  it('selectedLinkForRemoval should change selCon',()=>{
    component.selectedLinkForRemoval(c1,l1);
    expect(component.selCon).toBe(c1);
  });
  it('selectedLinkForRemoval should change selLink',()=>{
    component.selectedLinkForRemoval(c1,l1);
    expect(component.selLink).toBe(l1);
  });

  it('removeContent should call ngOnInit',()=>{
    spyOn(component,'submitForDelete');
    const observable: Observable<HttpHeaderResponse> = new Observable<HttpHeaderResponse>((observer) => {
      observer.next(new HttpHeaderResponse());
      observer.complete();
      return {unsubscribe() {console.log("updateRequest test - unsubscribed")}};
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
      return {unsubscribe() {console.log("updateRequest test - unsubscribed")}};
    });
    const observable1: Observable<Content[]> = new Observable<Content[]>((observer) => {
      observer.next([]);
      observer.complete();
      return {unsubscribe() {console.log("updateRequest test - unsubscribed")}};
    });
    spyOn(csService,'deleteContentByID').and.returnValue(observable);
    spyOn(csService,'filterContent').and.returnValue(observable1);
    
    component.ngOnInit();
    component.removeContent();
    expect(component.submitForDelete).toHaveBeenCalled();
  });

  it('removeTag should call submit',()=>{
    component.selLink=l1;
    const observable: Observable<HttpHeaderResponse> = new Observable<HttpHeaderResponse>((observer) => {
      observer.next(new HttpHeaderResponse());
      observer.complete();
      return {unsubscribe() {console.log("updateRequest test - unsubscribed")}};
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

  // Radio Buttons
  it('Should have radio buttons for All.',
  () => {
    expect(document.getElementById('AllLabel')).toBeTruthy();
  });
  it('Should have radio buttons  for Document',()=>{
    expect(document.getElementById('DocumentLabel')).toBeTruthy();
  });
  it('Should have radio buttons for PowerPoint',()=>{
    expect(document.getElementById('PowerpointLabel')).toBeTruthy();
  });
  it('Should have radio buttons for Flagged,',()=>{
    expect(document.getElementById('FlaggedLabel')).toBeTruthy();
  });
  it('Should have radio buttons for Code',()=>{
    expect(document.getElementById('CodeLabel')).toBeTruthy();
  });
  it('Should have radio buttons for Code.',
  () => {
    expect(document.getElementById('CodeLabel')).toBeTruthy();
  });

  it('Should have radio buttons for Document.',
  () => {
    expect(document.getElementById('DocumentLabel')).toBeTruthy();
  });

  it('Should have radio buttons for  Powerpoint.',
  () => {
    expect(document.getElementById('PowerpointLabel')).toBeTruthy();
  });

  it('Should have radio buttons for Flagged.',
  () => {
    expect(document.getElementById('FlaggedLabel')).toBeTruthy();
  });

  it('Should have radio buttons for All.',
  () => {
    expect(document.getElementById('AllLabel')).toBeTruthy();
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
  it('Should reset page, "Code" string selFormat',()=>{
    component.reset();
    expect(component.selFormat).toEqual('Code');
  });
  
  it('Should reset page, string Title', () => {
    component.reset();
    expect(component.title).toEqual('');
  });

  it('Should reset page, "Code" string selFormat', () => {
    component.reset();
    expect(component.selFormat).toEqual('Code');
  });

  it('Should reset page, empty array', () => {
    component.reset();
    expect(component.selectedSubjects).toEqual([]);
  });
  

});
