import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule} from '@angular/material';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';
import { ModuleCreatorPageComponent } from './module-creator-page.component';
import { TreeModule} from 'angular-tree-component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatCardModule } from '@angular/material/card';
import { ModuleFetcherService } from 'src/app/services/module-fetcher.service';
import { HttpHeaderResponse } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Module } from 'src/app/models/Module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ModuleCreatorPageComponent', () => {
  let component: ModuleCreatorPageComponent;
  let fixture: ComponentFixture<ModuleCreatorPageComponent>;
  let moduleFetcherService:ModuleFetcherService;
  let toastrService:ToastrService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModuleCreatorPageComponent ],
      providers: [ModuleFetcherService, ToastrService],
      imports: [
        FormsModule,
        MatProgressSpinnerModule,
        HttpClientTestingModule,
        ToastrModule.forRoot(),
        TreeModule.forRoot(),
        RouterTestingModule,
        MatCardModule,
        BrowserAnimationsModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleCreatorPageComponent);
    moduleFetcherService = TestBed.get(ModuleFetcherService);
    toastrService = TestBed.get(ToastrService);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.subject = 'Java';
  });

  it('Should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should test ngDoCheck, update not called', () => {
    component.nodes= ["node"];
    let spy = spyOn(component.tree.treeModel, 'update');
    component.ngDoCheck();
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should test validInput, false when cantBeNull is null', () => {
    component.subject = null;
    expect(component.validInput()).toBe(false);
  });

  it('Should have a subject input field', () => {
    expect(document.getElementsByName('subject')).toBeTruthy();
  });

  it('Should have a Submit Modules button', () => {
    expect(document.getElementById('submitButton')).toBeTruthy();
  });

  it('Should give an error when no module input is written', () => {
    component.subject = '';
    expect(component.validInput()).toBeFalsy();
  });

  it('Should return true if Module field is valid', () => {
    expect(component.validInput()).toBeTruthy();
  });

  it('Should reset the fields with the resetVariables function, subject', () => {
    component.resetVariables();
    expect(component.subject.length).toEqual(0);
  });

  it('Should reset the fields with the resetVariables function, isSubmitting', () => {
    component.resetVariables();
    expect(component.subject.length).toEqual(0);
  });

  it('Should test submit success', () => {
    let response :HttpHeaderResponse = new HttpHeaderResponse({headers: null, status: 200, statusText:"ok",url: "url"});
    let  module:Module = new Module(1,"Java",null,null,null,null,null);
    spyOn(moduleFetcherService,'createOrUpdateModule').and.returnValue(of(response));
    spyOn(component.ms, "loadModules").and.returnValue(Promise.resolve([module]))
    component.subject = "Java";
    component.ms.subjectNameToModule.set("Java", module);
    component.ms.subjectIdToModule.set(1,module);
    component.tree.treeModel.activeNodeIds = {"1": true}
    component.submit();
    expect(toastrService.previousToastMessage).toBe('Successfully sent module.');
  });

  it('Should test submit, error 1', () => {
    component.ms.subjectNameToModule = null;
    spyOn(moduleFetcherService,'createOrUpdateModule').and.returnValue(of(null));
    component.submit();
    expect(toastrService.previousToastMessage).toBe('There was a problem creating a subject');
  });

  it('Should test submit, error 2', () => {
    const observable: Observable<HttpHeaderResponse> = new Observable<HttpHeaderResponse>((observer) => {
      observer.error({status: 400, statusText: "Bad Request"})
      observer.complete();
    });
    spyOn(moduleFetcherService,'createOrUpdateModule').and.returnValue(observable);
    component.submit();
    expect(toastrService.previousToastMessage).toBe('Failed to create subject. Subject may already exist.');
  });

  it('Should test submit, falsy error', () => {
    component.subject = null;
    component.submit();
    expect(toastrService.previousToastMessage).toBe('Please fill in the input field!');
  });

  it('Should test getModulesFromSubjects, return not empty', () => {
    let  module:Module = new Module(1,"Java",null,null,null,null,null);
    component.ms.subjectIdToModule.set(1, module);
    let subject = {"1":true};
    expect(component.getModulesFromSubjects(Object.entries(subject)).length).toBeGreaterThan(0);
  });

  it('Should test getModulesFromSubjects, return empty', () => {
    let  module:Module = new Module(1,"Java",null,null,null,null,null);
    component.ms.subjectIdToModule.set(1, module);
    let subject = {"1":false};
    expect(component.getModulesFromSubjects(Object.entries(subject)).length).toBe(0);
  });

});
