import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatProgressSpinnerModule } from '@angular/material';
import { ToastrModule } from 'ngx-toastr';
import { ToastrService } from 'ngx-toastr';
import { SubmitRequestPageComponent } from './submit-request-page.component';
import { MatCardModule } from '@angular/material/card';
import { ModuleStoreService } from '../../services/module-store.service';
import { Module } from 'src/app/models/Module';
import { SubmitRequestService } from '../../services/submit-request.service';
import { HttpHeaderResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('SubmitRequestPageComponent', () => {
  let component: SubmitRequestPageComponent;
  let fixture: ComponentFixture<SubmitRequestPageComponent>;
  let toastrService: ToastrService;
  let submitRequestService: SubmitRequestService;
  let baseURL:string;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmitRequestPageComponent],
      imports: [
        CommonModule,
        FormsModule,
        NgSelectModule,
        MatProgressSpinnerModule,
        HttpClientTestingModule,
        MatCardModule,
        ToastrModule.forRoot(),
        BrowserAnimationsModule
      ],
      providers: [SubmitRequestService]
    }).compileComponents().then(()=>{
      fixture = TestBed.createComponent(SubmitRequestPageComponent);
      component = fixture.componentInstance;
      toastrService = TestBed.get(ToastrService);
      submitRequestService = TestBed.get(SubmitRequestService);
      baseURL = environment.cms_url;
    });
  }));

  beforeEach(() => {
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should test validInput true', () => {
    component.title = "Title";
    component.selFormat = "Format";
    component.selectedSubjects = ["Java"];
    component.description = "Description";
    let result = component.validInput();
    expect(result).toBe(true);
  });

  it('should test validInput false', () => {
    component.title = null;
    component.selFormat = null;
    component.selectedSubjects = null;
    component.description = null;
    let result = component.validInput();
    expect(result).toBe(false);
  });

  it('should test submit toastr error 1', () => {
    spyOn(component, 'validInput').and.returnValue(false);
    component.submit();
    expect(toastrService.previousToastMessage).toBe('Please fill in all input fields!');
  });


  it('should test submit isSubmitting', () => {
    spyOn(component, 'validInput').and.returnValue(false);
    component.submit();
    expect(component.isSubmitting).toBe(false);
  });

  it('should test submit modules empty', () => {;
    spyOn(component, 'validInput').and.returnValue(true)
    component.submit();
    expect(component.modules.length).toBe(0);
  });

  it('should test submit modules not empty', () => {
    spyOn(component, 'validInput').and.returnValue(true);
    component.selectedSubjects = ["Java"];
    component.ms = new ModuleStoreService(null, null,null, null);
    component.ms.subjectNameToModule = new Map<string, Module>();
    component.ms.subjectNameToModule.set("Java", new Module(1,"Java",12345,null,null,null,null))
    component.submit();
    expect(component.modules.length).not.toBe(0);
  });

  it('should test submit test toastr success', () => {
    let url = baseURL + '/requests';
    let response :HttpHeaderResponse = new HttpHeaderResponse({headers: null, status: 200, statusText:"ok",url: url});
    const observable: Observable<HttpHeaderResponse> = new Observable<HttpHeaderResponse>((observer) => {
      observer.next(response);
      observer.complete();
    });
    spyOn(component, 'validInput').and.returnValue(true);
    spyOn(submitRequestService, 'createNewRequest').and.returnValue(observable);
    component.submit();
    expect(toastrService.previousToastMessage).toBe('Successfully sent content.');
  });

  it('should test submit test toastr error 2', () => {
    const observable: Observable<HttpHeaderResponse> = new Observable<HttpHeaderResponse>((observer) => {
      observer.next(null);
      observer.complete();
    });
    spyOn(component, 'validInput').and.returnValue(true);
    spyOn(submitRequestService, 'createNewRequest').and.returnValue(observable);
    component.submit();
    expect(toastrService.previousToastMessage).toBe('Response was null.');
  });

  it('should test submit test toastr error 3', () => {
    const observable: Observable<HttpHeaderResponse> = new Observable<HttpHeaderResponse>((observer) => {
      observer.error({status: 400, statusText: "Bad Request"})
      observer.complete();
    });
    spyOn(component, 'validInput').and.returnValue(true);
    spyOn(submitRequestService, 'createNewRequest').and.returnValue(observable);
    component.submit();
    expect(toastrService.previousToastMessage).toBe('Failed to send Request.');
  });
  
});
