import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ToastrModule } from 'ngx-toastr';
import { GlobalReports } from 'src/app/providers/GlobalReports';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReportsTimeGraphComponent } from './reports-time-graph.component';
import { TimeGraphData } from 'src/app/models/TimeGraphData';
import { MetricsData } from 'src/app/models/MetricsData';

describe('ReportsTimeGraphComponent', () => {
  let component: ReportsTimeGraphComponent;
  let fixture: ComponentFixture<ReportsTimeGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportsTimeGraphComponent],
      imports: [
        NgxChartsModule,
        HttpClientTestingModule,
        ToastrModule.forRoot(),
        BrowserAnimationsModule
      ],
      providers: [GlobalReports]
    })
    .compileComponents().then(()=>{
      fixture = TestBed.createComponent(ReportsTimeGraphComponent);
      component = fixture.componentInstance;
    });
  }));

  beforeEach(() => {
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should test ngOnInit updategraph', () => {
    let metricsData: MetricsData = {codeCount: 1, documentCount: 1, pptCount: 1, numDiffModsCount: 1, avgResources: 1, timeGraphData: null}
    component.globalReports = new GlobalReports();
    component.globalReports.metricsData = metricsData;
    component.ngOnInit();
    expect(component.graphResults).toBe(null)
  });

  it('should have Dropdown button', () => {
    expect(document.getElementById('dropdownMenuButton')).toBeTruthy();
  });
  it('should have Past Year dropdown', () => {
    expect(document.getElementById('selectPastYear')).toBeTruthy();
  });

  it('should have Past Six Months dropdown', () => {
    expect(document.getElementById('selectPastSixMonths')).toBeTruthy();
  });

  it('should have Past Month dropdown', () => {
    expect(document.getElementById('selectPastMonth')).toBeTruthy();
  });

  it('should have Line Chart', () => {
    expect(document.getElementById('lineChart')).toBeTruthy();
  });

  it('should have Selected View Text', () => {
    expect(document.getElementById('selectedViewText')).toBeTruthy();
  });

  it('should have Milliseconds per year defined', () => {
    expect(component.MILLIS_PER_YEAR).toEqual(3.154e+10);
  });

  it('should have Milliseconds per month defined', () => {
    expect(component.MILLIS_PER_MONTH).toEqual(2.628e+9);
  });

  it('should have Milliseconds per day defined', () => {
    expect(component.MILLIS_PER_DAY).toEqual(8.64e+7);
  });

  it('should have Time Range default to Milliseconds per month', () => {
    expect(component.selectedTimeRange).toEqual(component.MILLIS_PER_MONTH);
  });

  it('should update graph with updateGraph()', () => {
    let timeGraphData: TimeGraphData = {numContents: 1, returnedLongs: []};
    component.updateGraph(timeGraphData);
    expect(component.timeGraphData).toEqual(timeGraphData);
  });

  it('should update requestTime with updateGraph()', () => {
    let timeGraphData: TimeGraphData = {numContents: 1, returnedLongs: []};
    component.updateGraph(timeGraphData);
    expect(component.requestTime).toBeDefined();
  });

  it('should update time frame with setGraphResults()', () => {
    component.setGraphResults(6 * component.MILLIS_PER_MONTH);
    expect(component.selectedTimeRange).toEqual(6 * component.MILLIS_PER_MONTH);
  });

  it('should select Past Month timeframe', () => {
    component.setGraphResults(component.MILLIS_PER_MONTH);
    expect(component.selectedView).toEqual("Past Month");
  });

  it('should select Past Six Months timeframe', () => {
    component.setGraphResults(6 * component.MILLIS_PER_MONTH);
    expect(component.selectedView).toEqual("Past Six Months");
  });

  it('should select Past Year timeframe', () => {
    component.setGraphResults(component.MILLIS_PER_YEAR);
    expect(component.selectedView).toEqual("Past Year");
  });

  it('should test setGraphResults datnum > startime', () => {
    let timeGraphData: TimeGraphData = {numContents: 1, returnedLongs: [2]};
    component.timeGraphData = timeGraphData;
    component.requestTime = 3;
    let param = 2;
    component.setGraphResults(param);
    expect(timeGraphData.returnedLongs[0]).toBeGreaterThan(component.requestTime - param)
  });

  it('should test setGraphResults datnum < startime', () => {
    let timeGraphData: TimeGraphData = {numContents: 1, returnedLongs: [2]};
    component.timeGraphData = timeGraphData;
    component.requestTime = 5;
    let param = 2;
    component.setGraphResults(param);
    expect(timeGraphData.returnedLongs[0]).toBeLessThan(component.requestTime - param)
  });

  it('should test setGraphResults dataEntries pushed', () => {
    let timeGraphData: TimeGraphData = {numContents: 1, returnedLongs: [(8.64e+7)*2]};
    component.timeGraphData = timeGraphData;
    component.requestTime = 3;
    let param = 2;
    component.setGraphResults(param);
    expect(component.graphResults[0].series.length).toBeGreaterThan(0);
  });

  it('should test setGraphResults dataEntries last entry update', () => {
    let timeGraphData: TimeGraphData = {numContents: 2, returnedLongs: [(8.64e+7)*2, 2]};
    component.timeGraphData = timeGraphData;
    component.requestTime = 3;
    let param = 2;
    component.setGraphResults(param);
    expect(component.graphResults[0].series[0].value).toEqual(4);
  });

  it('should test onResize', () => {
    component.onResize(null);
    expect(component.view).toEqual([Math.max(document.documentElement.clientWidth, window.innerWidth)/2,400])
  });
  
});
