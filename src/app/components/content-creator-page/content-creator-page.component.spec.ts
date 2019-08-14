import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatProgressSpinnerModule } from '@angular/material';
import { ToastrModule } from 'ngx-toastr';



import { Content } from 'src/app/models/Content';
import { Link } from 'src/app/models/Link';

import { ContentCreatorPageComponent } from './content-creator-page.component';

describe('ContentCreatorPageComponent', () => {
  let component: ContentCreatorPageComponent;
  let fixture: ComponentFixture<ContentCreatorPageComponent>;


  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [ContentCreatorPageComponent],
      imports: [
        CommonModule,
        FormsModule,
        NgSelectModule,
        MatProgressSpinnerModule,
        HttpClientTestingModule,
        ToastrModule.forRoot(),
      ]
    })
      .compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentCreatorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // First let's test general creation of the current component
  it('Should create', () => {
    expect(component).toBeTruthy();
  });

  // Next test that the desired input fields in the card exist
  // i.e. Title, URL, Drop Down for Modules, and Description.
  it('Should have a Title input box.', () => {
    expect(document.getElementById('titleTextBox')).toBeTruthy();
  })

  it('Should have a URL input box.', () => {
    expect(document.getElementById('urlTextBox')).toBeTruthy();
  })

  it('Should have a Select Relevant Modules drop down box.', () => {
    expect(document.getElementById('subjectDropDown')).toBeTruthy();
  })

  it('Should have a Description box.', () => {
    expect(document.getElementsByName('Description')).toBeTruthy();
  })

  it('Should have a Code radio button.', () => {
    expect(document.getElementById('Code')).toBeTruthy();
  })

  it('Should have a Document radio button.', () => {
    expect(document.getElementById('Document')).toBeTruthy();
  })

  it('Should have a Powerpoint radio button.', () => {
    expect(document.getElementById('Powerpoint')).toBeTruthy();
  })
  // =====End Element creation finds=====

});
