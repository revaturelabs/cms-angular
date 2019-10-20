import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatProgressSpinnerModule} from '@angular/material';
import { ToastrModule } from 'ngx-toastr';
import { ContentFinderPageComponent } from './content-finder-page.component';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


describe('ContentFinderPageComponent', () => {
  let component: ContentFinderPageComponent;
  let fixture: ComponentFixture<ContentFinderPageComponent>;

  beforeEach(async(() => {
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
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentFinderPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.tablebool = true;

    component.title = 'Hello';
    component.selFormat = 'Code';
    component.selectedSubjects = ['Java', 'CSS'];
  });

  it('Should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('Should have Revature logo displayed', () => {
    expect(document.getElementById('logo')).toBeTruthy();
  });

  it('Should have a title input box displayed', () => {
    expect(document.getElementsByName('title')).toBeTruthy();
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
