import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By, element, browser } from 'protractor';

import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { ReportsTimeGraphComponent } from 'src/app/components/reports-time-graph/reports-time-graph.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';
import { GlobalReports } from 'src/app/providers/GlobalReports';
import { MetricsData } from 'src/app/models/MetricsData'

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

  it('should have Different Modules card', () => {
    expect(document.getElementById('dif_Mods')).toBeTruthy;
  });

  it('should have Code Examples card', () => {
    expect(document.getElementById('code_Ex')).toBeTruthy;
  });

  it('should have Lecture Notes card', () => {
    expect(document.getElementById('lect_Notes')).toBeTruthy;
  });

  it('should have Powerpoints card', () => {
    expect(document.getElementById('powerpoints')).toBeTruthy;
  });

  it('should have Average Resources card', () => {
    expect(document.getElementById('avg_Res')).toBeTruthy;
  });

  it('should have All selected by default', () => {
    expect(document.getElementById('All').getAttribute('ng-reflect-model')).toEqual('All');
    expect(component.selFormat).toEqual('All');
  }); 

  it('should have filter button', () =>{
    expect(document.getElementById('filterButton')).toBeTruthy;
  });

  it('should have defualt formats defined', () =>{
    expect(component.formats).toEqual(["Code", "Document", "Powerpoint", "All"]);
  });


  it('should have metrics defined after ngOnInit()', () => {
    component.ngOnInit();
    expect(component.codeExamples).toBeDefined;
    expect(component.lectureNotes).toBeDefined;
    expect(component.powerpoints).toBeDefined;
    expect(component.difModules).toBeDefined;
    expect(component.avgResources).toBeDefined;
  });

  
  it('should have metrics defined after getMetrics()', () => {
    component.getMetrics();
    expect(component.codeExamples).toBeDefined;
    expect(component.lectureNotes).toBeDefined;
    expect(component.powerpoints).toBeDefined;
    expect(component.difModules).toBeDefined;
    expect(component.avgResources).toBeDefined;
  });

    
  it('should have metrics defined after updateMetrics()', () => {
    let MD: MetricsData = {codeCount:1,documentCount:1,pptCount:1,numDiffModsCount:1,avgResources:1, 
      timeGraphData:null}

    component.updateMetrics(MD);
    expect(component.codeExamples).toEqual(1);
    expect(component.lectureNotes).toEqual(1);
    expect(component.powerpoints).toEqual(1);
    expect(component.difModules).toEqual(1);
    expect(component.avgResources).toEqual(1);
  });
  

});
