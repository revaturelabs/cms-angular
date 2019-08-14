import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { by, element } from 'protractor';

import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { ReportsTimeGraphComponent } from 'src/app/components/reports-time-graph/reports-time-graph.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';
import { GlobalReports } from 'src/app/providers/GlobalReports';

import { ReportsPageComponent } from './reports-page.component';

describe('ReportsPageComponent', () => {
  let component: ReportsPageComponent;
  let fixture: ComponentFixture<ReportsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportsPageComponent, ReportsTimeGraphComponent],
      imports: [
        NgSelectModule,
        FormsModule,
        NgxChartsModule,
        HttpClientTestingModule,
        ToastrModule.forRoot()
      ],
      providers: [GlobalReports]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have Code button', () => {
    expect(document.getElementById('Code')).toBeTruthy;
   });

  it('should have Document button', () => {
  expect(document.getElementById('Document')).toBeTruthy;
  });

  it('should have Powerpoint button', () => {
   expect(document.getElementById('Powerpoint')).toBeTruthy;
  });

  it('should have Flagged button', () => {
    expect(document.getElementById('Flagged')).toBeTruthy;
   });

  it('should have All button', () => {
  expect(document.getElementById('All')).toBeTruthy;
  });

  it('should have All selected by default', () => {
    expect(document.getElementById('All').getAttribute('ng-reflect-model')).toEqual('All');
    expect(document.getElementById('Code').getAttribute('ng-reflect-model')).toEqual('All');
  }); 

  it('should have Dropdown button', () =>{
    expect(document.getElementById('dropdownMenuButton')).toBeTruthy;
  });
  it('should have Past Year dropdown', () => {
    expect(document.getElementById('selectPastYear')).toBeTruthy;
  });

  it('should have Past Six Months dropdown', () => {
    expect(document.getElementById('selectPastSixMonths')).toBeTruthy;
  });

  it('should have Past Month dropdown', () => {
    expect(document.getElementById('selectPastMonth')).toBeTruthy;
  });

  it('should have filter button', () =>{
    expect(document.getElementById('filterButton')).toBeTruthy;
  });

});
