import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatProgressSpinnerModule} from '@angular/material';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';

import { NavbarComponent } from './navbar.component';

xdescribe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarComponent ],
      imports: [ 
        FormsModule,
        ReactiveFormsModule,
        MatMenuModule,
        MatButtonModule, 
        NgSelectModule, 
        MatProgressSpinnerModule, 
        ToastrModule.forRoot(), 
        HttpClientTestingModule, 
        RouterTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Teting that the component has been created
  it('Should create', () => {
    expect(component).toBeTruthy();
  });

  // Testing that the navbar element exists
  it('Should have a navbar', () => {
    expect(document.getElementsByClassName('navbar')).toBeTruthy();
  });

  // Testing that the navbar has a toggle button
  it('Should have a navbar toggle button', () => {
    expect(document.getElementsByClassName('navbar-toggler')).toBeTruthy();
  });

  // Testing that the navbar is collapsible
  it('Should have a collapsible navbar depending on screen size', () => {
    expect(document.getElementById('navbarSupportedContent')).toBeTruthy();
  });

  // Testing to ensure there are nav items
  it('Should have navbar items as list items', () => {
    expect(document.getElementsByClassName('nav-item')).toBeTruthy();
  });

  // Testing to ensure that the specific nav items exist:
  it('Should have a Content Creator nav item', () => {
    expect(document.getElementById('contentcreator')).toBeTruthy();
  });

  it('Should have a Content Finder nav item', () => {
    expect(document.getElementById('contentfinder')).toBeTruthy();
  });

  it('Should have a Module Creator nav item', () => {
    expect(document.getElementById('modulecreator')).toBeTruthy();
  });

  it('Should have a Module Index nav item', () => {
    expect(document.getElementById('moduleindex')).toBeTruthy();
  });

  it('Should have a Reports Page nav item', () => {
    expect(document.getElementById('reportspage')).toBeTruthy();
  });

});
