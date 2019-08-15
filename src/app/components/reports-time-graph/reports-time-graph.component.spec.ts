import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ToastrModule } from 'ngx-toastr';
import { GlobalReports } from 'src/app/providers/GlobalReports';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ReportsTimeGraphComponent } from './reports-time-graph.component';
import { TimeGraphData } from 'src/app/models/TimeGraphData';

describe('ReportsTimeGraphComponent', () => {
  let component: ReportsTimeGraphComponent;
  let fixture: ComponentFixture<ReportsTimeGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportsTimeGraphComponent ],
      imports: [
        NgxChartsModule,
        HttpClientTestingModule,
        ToastrModule.forRoot(),
        BrowserAnimationsModule
      ],
      providers: [GlobalReports]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsTimeGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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

  it('should have Line Chart', () => {
    expect(document.getElementById('lineChart')).toBeTruthy;
  });

  it('should have Selected View Text', () => {
    expect(document.getElementById('selectedViewText')).toBeTruthy;
  });

  it('should have Milliseconds per year defined', () => {
    expect(component.MILLIS_PER_YEAR).toEqual(3.154e+10)
  });

  it('should have Milliseconds per month defined', () => {
    expect(component.MILLIS_PER_MONTH).toEqual(2.628e+9)
  });

  it('should have Milliseconds per day defined', () => {
    expect(component.MILLIS_PER_DAY).toEqual(8.64e+7)
  });

  it('should have Time Range default to Milliseconds per month', () => {
    expect(component.selectedTimeRange).toEqual(component.MILLIS_PER_MONTH);
  });

  it('should update graph with updateGraph()', () => {
    let TGD1: TimeGraphData = {numContents:1,returnedLongs:[]}
    component.updateGraph(TGD1);
    expect(component.timeGraphData).toEqual(TGD1);

    let TGD2: TimeGraphData = {numContents:2,returnedLongs:[]}
    component.updateGraph(TGD2);
    expect(component.timeGraphData).toEqual(TGD2);
  });

  it('should update requestTime with updateGraph()', () => {
    expect(component.requestTime).toBeNull;

    let TGD1: TimeGraphData = {numContents:1,returnedLongs:[]}
    component.updateGraph(TGD1);
    expect(component.requestTime).toBeUndefined;
  });

  it('should update time frame with setGraphResults()', () => {
    component.setGraphResults(6 * component.MILLIS_PER_MONTH);
    expect(component.selectedTimeRange).toEqual(6 * component.MILLIS_PER_MONTH)
  });

  it('should select Past Month timeframe', () => {
    component.setGraphResults(component.MILLIS_PER_MONTH);
    expect(component.selectedView).toEqual("Past Month")
  });

  it('should select Past Six Months timeframe', () => {
    component.setGraphResults(6 * component.MILLIS_PER_MONTH);
    expect(component.selectedView).toEqual("Past Six Months")
  });

  it('should select Past Year timeframe', () => {
    component.setGraphResults(component.MILLIS_PER_YEAR);
    expect(component.selectedView).toEqual("Past Year")
  });

});
