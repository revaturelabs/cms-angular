import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';


import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatProgressSpinnerModule} from '@angular/material';
import { ToastrModule } from 'ngx-toastr';

import { ContentFinderPageComponent } from './content-finder-page.component';

describe('ContentFinderPageComponent', () => {
  let component: ContentFinderPageComponent;
  let fixture: ComponentFixture<ContentFinderPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentFinderPageComponent ],
      imports: [ 
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
    fixture = TestBed.createComponent(ContentFinderPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.tablebool = true;

    component.title = 'Hello'
    component.selFormat = 'Code'
    component.selectedSubjects = ['Java', 'CSS'];
  });

  /** 
   * 
   *  =============Tests start here, first test webpage components==================
   * 
   */

  //  First test to make sure component is created
  it('Should create the component', () => {
    expect(component).toBeTruthy();
  });

  // Test Document elements are present as desired

  // Logo
  it('Should have Revature logo displayed', () =>{
    expect(document.getElementById('logo')).toBeTruthy();
  });

  // Title
  it('Should have a title input box displayed',() => {
    expect(document.getElementsByName('title')).toBeTruthy();
  })

  // Radio Buttons
  it('Should have radio buttons for Code, Document, Powerpoint, Flagged, and All.',
  () => {
    expect(document.getElementById('CodeLabel')).toBeTruthy();
    expect(document.getElementById('DocumentLabel')).toBeTruthy();
    expect(document.getElementById('PowerpointLabel')).toBeTruthy();
    expect(document.getElementById('FlaggedLabel')).toBeTruthy();
    expect(document.getElementById('AllLabel')).toBeTruthy();
  })

  // Drop down menu
  it('Should have a drop down menu to Select Relevant Modules that are available.',() => {
    expect(document.getElementById('subjectDropDown')).toBeTruthy();
  })

  // Submit Button
  it('Should have a submit button labled "Find Content"', () => {
    expect(document.getElementById('submitButton')).toBeTruthy();
  })

  // // The table has a variety of elements that need to be tested <= to figure out
  // it('Should create a table when "tablebool" is triggered to be "True"', () => {
  //   expect(document.getElementById('ResultsTable')).toBeTruthy();
  // })

  // Now test methods

  // Test the Reset Function
  it('Should reset page to empty string Title, "Code" string selFormat, and empty array', () => {
    component.reset();
    expect(component.title).toEqual('')
    expect(component.selFormat).toEqual('Code')
    expect(component.selectedSubjects).toEqual([])
  })

});
