import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatProgressSpinnerModule } from '@angular/material';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ModuleStoreService } from 'src/app/services/module-store.service';
import { Content } from 'src/app/models/Content';
import { TreeModule } from 'angular-tree-component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ContentCreatorPageComponent } from './content-creator-page.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ContentCreatorPageComponent } from './content-creator-page.component';
import { MatCardModule } from '@angular/material/card';

import { ContentFetcherService } from 'src/app/services/content-fetcher.service';
import { of, Observable } from 'rxjs';
import Module = require('module');
import { HttpHeaderResponse } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ContentCreatorPageComponent', () => {
  let component: ContentCreatorPageComponent;
  let fixture: ComponentFixture<ContentCreatorPageComponent>;
  let contentFetcherService:ContentFetcherService;
  let toastrService:ToastrService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ContentCreatorPageComponent],
      providers: [ContentFetcherService, ToastrService],
      imports: [
        CommonModule,
        FormsModule,
        NgSelectModule,
        MatProgressSpinnerModule,
        HttpClientTestingModule,
        ToastrModule.forRoot(),
        TreeModule.forRoot(),
        BrowserAnimationsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModul,
        MatCardModule,
        BrowserAnimationsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentCreatorPageComponent);
    contentFetcherService = TestBed.get(ContentFetcherService);
    toastrService = TestBed.get(ToastrService);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.title = 'I am a Title';
    component.selFormat = 'Code';
    component.url = 'http://www.test.com';
    component.description = 'I am a code';
    component.nodes = [
      {
        id: 1,
        subject: 'root1',
        children: [
          { id: 2, name: 'child1' },
          { id: 3, name: 'child2' }
        ]
      },
      {
        id: 4,
        subject: 'root2',
        childrenModules: [
          { id: 5, subject: 'child2.1' },
          {
            id: 6,
            subject: 'child2.2',
            children: [
              { id: 7, subject: 'subsub' }
            ]
          }
        ]
      }
    ];
  });

  it('Should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should have Revature logo.', () => {
    expect(document.getElementById('logo')).toBeTruthy();
  });

  it('Should have a Title input box.', () => {
    expect(document.getElementById('titleTextBox')).toBeTruthy();
  });

  it('Should have a URL input box.', () => {
    expect(document.getElementById('urlTextBox')).toBeTruthy();
  });

  it('Should have a tree of available modules.', () => {
    expect(document.getElementById('tree')).toBeTruthy();
  });

  it('Should have a Description box.', () => {
    expect(document.getElementsByName('Description')).toBeTruthy();
  });

  it('Should have a Code radio button.', () => {
    expect(document.getElementById('Code')).toBeTruthy();
  });

  it('Should have a Document radio button.', () => {
    expect(document.getElementById('Document')).toBeTruthy();
  });

  it('Should have a Powerpoint radio button.', () => {
    expect(document.getElementById('Powerpoint')).toBeTruthy();
  });

  it('Should have a Submit Content button.', () => {
    expect(document.getElementById('submitButton')).toBeTruthy();
  });
  // =====End Element creation finds=====

  it('Should test error no input given, Title ',() => {
    component.title = null;
    expect(component.validInput()).toBeFalsy();
  });

  it('Should test error no input given,  URL ', () => {
    component.title = 'a title';
    component.url = null;
    expect(component.validInput()).toBeFalsy();
  });

  it('Should test error no input given, Format ', () => {
    component.title = 'a title';
    component.url = 'http://www.test.com';
    component.nodes = [];
    component.nodes = [
      {
        id: 1,
        subject: 'root1',
        children: [
          { id: 2, name: 'child1' },
          { id: 3, name: 'child2' }
        ]
      },
      {
        id: 4,
        subject: 'root2',
        childrenModules: [
          { id: 5, subject: 'child2.1' },
          {
            id: 6,
            subject: 'child2.2',
            children: [
              { id: 7, subject: 'subsub' }
            ]
          }
        ]
      }
    ];

    component.selFormat = null;
    expect(component.validInput()).toBeFalsy();
  });

  it('Should return true when all fields are valid.', () => {
    expect(component.validInput()).toBeTruthy();
  });

  it('Should test resetVariables. title', () => {
    component.resetVariables();
    expect(component.title).toBeNull();
  });

  it('Should test resetVariables. url', () => {
    component.resetVariables();
    expect(component.url).toBeNull();
  });

  it('Should test resetVariables. selFormat', () => {
    component.resetVariables();
    expect(component.selFormat).toEqual('Code');
  });

  it('Should test resetVariables. description', () => {
    component.resetVariables();
    expect(component.description).toBeNull();
  });

  it('Should test resetVariables. selectedSubjects length', () => {
    component.resetVariables();
    expect(component.selectedSubjects.length).toEqual(0);
  });

  it('Should test resetVariables. nodes length', () => {
    component.resetVariables();
    const mStoreService = fixture.debugElement.injector.get(ModuleStoreService);
    expect(component.nodes.length).toEqual(mStoreService.nodes.length);
  });

  it('Should test resetVariables, isSubmitting', () => {
    component.resetVariables();
    expect(component.isSubmitting).toBeFalsy();
  });

  it('Should test validURL, false test 1', () => {
    component.url = '';
    expect(component.validURL(component.url)).toBeFalsy();
  });

  it('Should test validURL, false test 2', () => {
    component.url = 'cat';
    expect(component.validURL(component.url)).toBeFalsy();
  });

  it('Should test validURL, false test 3', () => {
    component.url = 'ww.cat.com';
    expect(component.validURL(component.url)).toBeFalsy();
  });

  it('should test ngDoCheck, update not called', () => {
    component.nodes = ["node"];
    spyOn(component.tree.treeModel, 'update')
    component.ngDoCheck();
    expect(component.tree.treeModel.update).not.toHaveBeenCalled();
  });

  it('should test getListOfURLS, check url added ', () => {
    let content:Content = new Content(1, "Java", "String", "desc", "url", null);
    spyOn(contentFetcherService, 'getAllContent').and.returnValue(of([content]))
    component.getListOfURLS();
    expect(component.listURLS.includes("url")).toBe(true);
  });

  it('should test submit, add subject', () => {
    component.tree.treeModel.activeNodeIds  = {"1":true};
    let module: Module = new Module(1,"Java",12345, null,null,null,null);
    component.ms.allModules = [module];
    component.submit();
    expect(component.selectedSubjects[0]).toBe(1)
  });

  it('should test submit, subject not added', () => {
    component.tree.treeModel.activeNodeIds  = {"1":false};
    let module: Module = new Module(1,"Java",12345, null,null,null,null);
    component.ms.allModules = [module];
    component.submit();
    expect(component.selectedSubjects[0]).toBe(undefined)
  });

   it('should test submit, toastr error 1', () => {
    component.url = "thisUrl";
    component.listURLS = ["url", component.url]
    component.submit();
    expect(toastrService.previousToastMessage).toBe('The URL already exsists in database.')
  });

   it('should test submit, toastr error 2', () => {
    spyOn(component,'validInput').and.returnValue(false);
    component.submit();
    expect(toastrService.previousToastMessage).toBe('Please fill in all input fields!')
  });

  it('should test submit, toastr error 3', () => {
    spyOn(component,'validURL').and.returnValue(false);
    component.submit();
    expect(toastrService.previousToastMessage).toBe('Invalid URL. e.g. "http://example.com", "ftp://www.example.com", "http://192.168.0.0"')
  });

  it('should test submit, toastr success', () => {
    let response :HttpHeaderResponse = new HttpHeaderResponse({headers: null, status: 200, statusText:"ok",url: "url"});
    const observable: Observable<HttpHeaderResponse> = new Observable<HttpHeaderResponse>((observer) => {
      observer.next(response);
      observer.complete();
    });
    spyOn(contentFetcherService,'createNewContent').and.returnValue(observable);
    component.submit();
    expect(toastrService.previousToastMessage).toBe('Successfully sent content.')
  });

  it('should test submit, toastr error 4', () => {
    spyOn(contentFetcherService,'createNewContent').and.returnValue(of(null));
    component.submit();
    expect(toastrService.previousToastMessage).toBe('Response was null.')
  });

  it('should test submit, toastr error 5', () => {
    const observable: Observable<HttpHeaderResponse> = new Observable<HttpHeaderResponse>((observer) => {
      observer.error({status: 400, statusText: "Bad Request"})
      observer.complete();
    });
    spyOn(contentFetcherService,'createNewContent').and.returnValue(observable);
    component.submit();
    expect(toastrService.previousToastMessage).toBe('Failed to send content.')
  });

  it('should test getLinksFromSubjects, return empty', () => {
    let subjects: number[] = [1];
    let module:Module = new Module(2,null,null,null,null,null,null);
    component.ms.allModules = [module];
    expect(component.getLinksFromSubjects(subjects).length).toBe(0)
  });
  
});
