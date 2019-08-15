import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatProgressSpinnerModule } from '@angular/material';
import { ToastrModule } from 'ngx-toastr';
import { ModuleStoreService } from 'src/app/services/module-store.service';

import { Content } from 'src/app/models/Content';
import { Link } from 'src/app/models/Link';

import { ContentCreatorPageComponent } from './content-creator-page.component';

// class MockedContentCreatorPageComponent extends ContentCreatorPageComponent {
//   // For mocking purposes
//   getLinksFromSubjects(subjects: string[]): Link[] {
//     let links = [];
//     subjects.forEach(
//       (subject) => {
//         links.push(new Link(null, null,
//           Math.floor((Math.random() * 10) + 1), null));
//       }, this
//     )
//     return links;
//   }
// }

describe('ContentCreatorPageComponent', () => {
  let component: ContentCreatorPageComponent;
  let fixture: ComponentFixture<ContentCreatorPageComponent>;
  let content: Content;
  let links: Link[];


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

    // Populate components box fields for testing purposes
    component.title = 'I am a Title'
    component.selFormat = 'Code'
    component.url = 'http://www.test.com'
    component.description = 'I am a code'
    component.selectedSubjects = ['Java', 'CSS']
  });


  // First let's test general creation of the current component
  it('Should create', () => {
    expect(component).toBeTruthy();
  });

  // Next test that the desired input fields in the card exist
  // i.e. Logo, Title, URL, Drop Down for Modules, Description, Radio Buttons, and Submit Button.
  it('Should have Revature logo.', () => {
    expect(document.getElementById('logo')).toBeTruthy();
  })

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

  it('Should have a Submit Content button.', () => {
    expect(document.getElementById('submitButton')).toBeTruthy();
  })
  // =====End Element creation finds=====

  /**  
   * Now test the content-creator-page.ts file methods. The following methods are found here:
   * validInput()
   * resetVariables()
   * getLinksFromSubjects()
   * validURL()
   * submit()
   */

  // First test validInput for bad input and good input.
  // First bad inputs
  it('Should give an error when there is no input given on a field, specifically, Title, URL, Format, and subjects ',
    () => {
      // Test title first
      component.title = null;
      expect(component.validInput()).toBeFalsy();
      component.title = 'a title'

      // Test URL
      component.url = null;
      expect(component.validInput()).toBeFalsy();
      component.url = 'http://www.test.com'

      // Test Subjects
      component.selectedSubjects = [];
      expect(component.validInput()).toBeFalsy();
      component.selectedSubjects = ['Java', 'CSS']

      // Test radio selformat
      component.selFormat = null
      expect(component.validInput()).toBeFalsy()
      component.selFormat = 'Code'
    })

  // Good inputs
  it('Should return true when all fields are valid.', () => {
    expect(component.validInput()).toBeTruthy();
  })

  // Next test resetVariables
  it('Should bring fields back to default states using resetVariables.', () => {
    component.resetVariables();
    expect(component.title).toBeNull();
    expect(component.url).toBeNull();
    expect(component.selFormat).toEqual("Code")
    expect(component.description).toBeNull();
    expect(component.selectedSubjects.length).toEqual(0);
    expect(component.isSubmitting).toBeFalsy();
  })

  // // Test getLinksFromSubjects() function
  // it('Should create a Link array when given a string array as input.', () => {
  //   links = []
  //   links = component.getLinksFromSubjects(["Java", "CSS"])
  //   expect(links).toBeTruthy();
  // })

  // Test validURL() function
  it('Should declare that an incorrect URL is false, i.e. not a valid URL.',() => {
    // If empty
    component.url = '';
    expect(component.validURL(component.url)).toBeFalsy();

    // If not a real URL
    component.url = 'cat';
    expect(component.validURL(component.url)).toBeFalsy();

    // If a simple typo with ww.
    component.url = 'ww.cat.com';
    expect(component.validURL(component.url)).toBeFalsy();

  })

});