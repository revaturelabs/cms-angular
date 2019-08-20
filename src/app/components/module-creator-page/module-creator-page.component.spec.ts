import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule} from '@angular/material';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';

import { ModuleCreatorPageComponent } from './module-creator-page.component';
// import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { ComponentRef } from '@angular/core';

describe('ModuleCreatorPageComponent', () => {
  let component: ModuleCreatorPageComponent;
  let fixture: ComponentFixture<ModuleCreatorPageComponent>;
  // let subjectEl: DebugElement
  // let submitEl: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModuleCreatorPageComponent ],
      imports: [ 
        FormsModule,
        MatProgressSpinnerModule,
        HttpClientTestingModule,
        ToastrModule.forRoot()
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleCreatorPageComponent);
    component = fixture.componentInstance;
    // subjectEl = fixture.debugElement.query(By.css('input[name=subject]'));
    // submitEl = fixture.debugElement.query(By.css('button'));  
    fixture.detectChanges();

    // Populating the module input field here
    component.subject = 'Java'

  });

  // Testing creation of current component
  it('Should create', () => {
    expect(component).toBeTruthy();
  });

  // Testing to make sure the input field exists within the component
  it('Should have a subject input field', () => {
    expect(document.getElementsByName('subject')).toBeTruthy();
  });

  // Testing to make sure the submit button exists in the component
  it('Should have a Submit Modules button', () => {
    expect(document.getElementById('submitButton')).toBeTruthy();
  });

  // Testing for module input
  it('Should give an error when no module input is written', () => {
    component.subject = '';
    expect(component.validInput()).toBeFalsy();
    component.subject = 'Java'
  });

  // Testing to make sure that we have good inputs
  it('Should return true if Module field is valid', () => {
    expect(component.validInput()).toBeTruthy();
  });

  // Testing to make sure the resetVariables function works
  it('Should reset the fields with the resetVariables function', () => {
    component.resetVariables();
    expect(component.subject.length).toEqual(0);
    expect(component.isSubmitting).toBeFalsy();
  })

});
