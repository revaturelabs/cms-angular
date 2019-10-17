import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { ReportsTimeGraphComponent } from 'src/app/components/reports-time-graph/reports-time-graph.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';
import { GlobalReports } from 'src/app/providers/GlobalReports';
import { MetricsData } from 'src/app/models/MetricsData';
import { ReportsPageComponent } from './reports-page.component';
import { ModuleStoreService } from 'src/app/services/module-store.service';
import { Module } from 'src/app/models/Module';

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
    .compileComponents().then(()=>{
      fixture = TestBed.createComponent(ReportsPageComponent);
      component = fixture.componentInstance;
    });
  }));

  beforeEach(() => {
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have Code button', () => {
    expect(document.getElementById('Code')).toBeTruthy();
   });

  it('should have Document button', () => {
  expect(document.getElementById('Document')).toBeTruthy();
  });

  it('should have Powerpoint button', () => {
   expect(document.getElementById('Powerpoint')).toBeTruthy();
  });

  it('should have All button', () => {
    expect(document.getElementById('All')).toBeTruthy();
  });

  it('should have Different Modules card', () => {
    expect(document.getElementById('dif_Mods')).toBeTruthy();
  });

  it('should have Code Examples card', () => {
    expect(document.getElementById('code_Ex')).toBeTruthy();
  });

  it('should have Lecture Notes card', () => {
    expect(document.getElementById('lect_Notes')).toBeTruthy();
  });

  it('should have Powerpoints card', () => {
    expect(document.getElementById('powerpoints')).toBeTruthy();
  });

  it('should have Average Resources card', () => {
    expect(document.getElementById('avg_Res')).toBeTruthy();
  });

  it('element should have All selected by default', () => {
    expect(document.getElementById('All').getAttribute('ng-reflect-model')).toEqual('All');
  });

  it('selFormat should have All selected by default', () => {
    expect(component.selFormat).toEqual('All');
  });

  it('should have filter button', () => {
    expect(document.getElementById('filterButton')).toBeTruthy();
  });

  it('should have defualt formats defined', () => {
    expect(component.formats).toEqual(["Code", "Document", "Powerpoint", "All"]);
  });

  it('should test ngOnInit() updateMetrics', () => {
    let metricsData: MetricsData = {codeCount: 1, documentCount: 1, pptCount: 1, numDiffModsCount: 1, avgResources: 1, timeGraphData: null}
    component.globalReports = new GlobalReports();
    component.globalReports.metricsData = metricsData;
    spyOn(component, 'updateMetrics')
    component.ngOnInit();
    expect(component.updateMetrics).toHaveBeenCalled();
  });

  it('should have codeExamples defined after ngOnInit()', () => {
    component.ngOnInit();
    expect(component.codeExamples).toBeDefined();
  });
  it('should have lectureNotes defined after ngOnInit()', () => {
    component.ngOnInit();
    expect(component.lectureNotes).toBeDefined();
  });
  it('should have powerpoints defined after ngOnInit()', () => {
    component.ngOnInit();
    expect(component.powerpoints).toBeDefined();
  });
  it('should have difModules defined after ngOnInit()', () => {
    component.ngOnInit();
    expect(component.difModules).toBeDefined();
  });
  it('should have avgResources defined after ngOnInit()', () => {
    component.ngOnInit();
    expect(component.avgResources).toBeDefined();
  });

  it('should have codeExamples defined after getMetrics()', () => {
    component.getMetrics();
    expect(component.codeExamples).toBeDefined();
  });

  it('should have lectureNotes defined after getMetrics()', () => {
    component.getMetrics();
    expect(component.lectureNotes).toBeDefined();
  });

  it('should have powerpoints defined after getMetrics()', () => {
    component.getMetrics();
    expect(component.powerpoints).toBeDefined();
  });

  it('should have difModules defined after getMetrics()', () => {
    component.getMetrics();
    expect(component.difModules).toBeDefined();
  });

  it('should have avgResources defined after getMetrics()', () => {
    component.getMetrics();
    expect(component.avgResources).toBeDefined();
  });

  it('should have codeExamples defined after updateMetrics()', () => {
    let MD: MetricsData = {codeCount: 1, documentCount: 1, pptCount: 1, numDiffModsCount: 1, avgResources: 1,
      timeGraphData: null};
    component.updateMetrics(MD);
    expect(component.codeExamples).toEqual(1);
  });

  it('should have lectureNotes defined after updateMetrics()', () => {
    let MD: MetricsData = {codeCount: 1, documentCount: 1, pptCount: 1, numDiffModsCount: 1, avgResources: 1,
      timeGraphData: null};
    component.updateMetrics(MD);
    expect(component.lectureNotes).toEqual(1);
  });

  it('should have powerpoints defined after updateMetrics()', () => {
    let MD: MetricsData = {codeCount: 1, documentCount: 1, pptCount: 1, numDiffModsCount: 1, avgResources: 1,
      timeGraphData: null};
    component.updateMetrics(MD);
    expect(component.powerpoints).toEqual(1);
  });

  it('should have difModules defined after updateMetrics()', () => {
    let MD: MetricsData = {codeCount: 1, documentCount: 1, pptCount: 1, numDiffModsCount: 1, avgResources: 1,
      timeGraphData: null};
    component.updateMetrics(MD);
    expect(component.difModules).toEqual(1);
  });

  it('should have avgResources defined after updateMetrics()', () => {
    let MD: MetricsData = {codeCount: 1, documentCount: 1, pptCount: 1, numDiffModsCount: 1, avgResources: 1,
      timeGraphData: null};
    component.updateMetrics(MD);
    expect(component.avgResources).toEqual(1);
  });

  it('should test updateMetrics(), this.difModules != numDiffModsCount', () => {
    let MD: MetricsData = {codeCount: 1, documentCount: 1, pptCount: 1, numDiffModsCount: 12, avgResources: 1,
      timeGraphData: null};
    component.difModules = 0;
    component.updateMetrics(MD);
    expect(component.difModules).not.toEqual(12);
  });

  it('should test updateMetrics(), this.avgResources != avgResources', () => {
    let MD: MetricsData = {codeCount: 1, documentCount: 1, pptCount: 1, numDiffModsCount: 1, avgResources: 10,
      timeGraphData: null};
    component.difModules = 0;
    component.updateMetrics(MD);
    expect(component.avgResources).not.toEqual(10);
  });

  it('should test getIDsFromSubjects contains module', () => {
    let module: Module = new Module(1,"Java",12345,null,null,null,null);
    component.ms =  new ModuleStoreService(null,null,null);
    component.ms.subjectNameToModule = new Map<string, Module>();
    component.ms.subjectNameToModule.set("Java", module)
    component.getIDsFromSubjects(["Java"]);
    expect(component.moduleIDs[0]).toEqual(1);
  });

  it('should test getIDsFromSubjects moduleIds is empty', () => {
    component.getIDsFromSubjects(null);
    expect(component.moduleIDs.length).toEqual(0);
  });

});
