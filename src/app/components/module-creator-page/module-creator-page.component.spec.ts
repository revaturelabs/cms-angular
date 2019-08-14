import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';


import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule} from '@angular/material';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';

import { ModuleCreatorPageComponent } from './module-creator-page.component';
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";

describe('ModuleCreatorPageComponent', () => {
  let component: ModuleCreatorPageComponent;
  let fixture: ComponentFixture<ModuleCreatorPageComponent>;
  let subjectEl: DebugElement
  let submitEl: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModuleCreatorPageComponent ],
      imports: [ 
        FormsModule,
        MatProgressSpinnerModule,
        HttpClientTestingModule,
        ToastrModule.forRoot()
        
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleCreatorPageComponent);
    component = fixture.componentInstance;
    subjectEl = fixture.debugElement.query(By.css('input[name=subject]'));
    submitEl = fixture.debugElement.query(By.css('button'));  
    fixture.detectChanges();
  });

  it('Should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should have a subject input field', () => {
    expect(document.getElementsByName('subject')).toBeTruthy();
  });

  it('Should have a Submit Modules button', () => {
    expect(document.getElementById('submitButton')).toBeTruthy();
  });

  // it('Setting button to have enabled as true yields accessible button', () => {
  //   component.isSubmitting = true;
  //   fixture.detectChanges();
  //   expect(submitEl.nativeElement).toBeFalsy();
  // });

});
