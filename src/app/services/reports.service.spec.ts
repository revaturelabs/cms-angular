import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';
import { GlobalReports } from 'src/app/providers/GlobalReports';
import { environment } from '../../environments/environment'
import { ReportsPageComponent } from '../components/reports-page/reports-page.component';
import { ReportsService } from './reports.service';
import { Filter } from '../models/Filter';
import { ReportsTimeGraphComponent } from '../components/reports-time-graph/reports-time-graph.component';
import { MetricsData } from '../models/MetricsData';
import { TimeGraphData } from '../models/TimeGraphData';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ReportsService', () => {
  let service: ReportsService;
  let httpTestingController: HttpTestingController;
  let baseURL;
  let globalReports: GlobalReports;
  let formats: string[];

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [HttpClientTestingModule,ToastrModule.forRoot(), BrowserAnimationsModule],
    providers: [ GlobalReports,  ReportsService,]
    });
    service = TestBed.get(ReportsService);
    globalReports = TestBed.get(GlobalReports);
    service.reportsPage = new ReportsPageComponent(service, null, null, null);
    service.reportsTimeGraph = new ReportsTimeGraphComponent(service, globalReports);
    httpTestingController = TestBed.get(HttpTestingController);
    baseURL = environment.cms_url;
    formats = ["String"]
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getMetricsTest, test subscribe', () => { 
    let timeGraphData: TimeGraphData = {numContents: 1,  returnedLongs: [1]}
    let result:MetricsData = { codeCount: 5, documentCount: 7, pptCount: 8, numDiffModsCount: 4, avgResources: 2, timeGraphData: timeGraphData};

    let url = baseURL + `/metrics/${service.MILLIS_PER_YEAR}`;
    let filter: Filter = new Filter("Test", formats, [1], []);
    service.getMetrics(filter);
    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toEqual("POST");
    req.flush(result);
  });

  it('getMetricsTest, test subscribe, metricsData', () => { 
    let timeGraphData: TimeGraphData = {numContents: 1,  returnedLongs: [1]}
    let result:MetricsData = { codeCount: 5, documentCount: 7, pptCount: 8, numDiffModsCount: 4, avgResources: 2, timeGraphData: timeGraphData};
    let url = baseURL + `/metrics/${service.MILLIS_PER_YEAR}`;
    let filter: Filter = new Filter("Test", formats, [1], []);
    service.getMetrics(filter);
    httpTestingController.expectOne(url).flush(result);
    expect(globalReports.metricsData).toBe(result)
  });
  
  it('getMetricsTest, test subscribe codeExamples', () => { 
    let timeGraphData: TimeGraphData = {numContents: 1,  returnedLongs: [1]}
    let result:MetricsData = { codeCount: 5, documentCount: 7, pptCount: 8, numDiffModsCount: 4, avgResources: 2, timeGraphData: timeGraphData};
    let url = baseURL + `/metrics/${service.MILLIS_PER_YEAR}`;
    let filter: Filter = new Filter("Test", formats, [1], []);
    service.getMetrics(filter);
    httpTestingController.expectOne(url).flush(result);
    expect(service.reportsPage.codeExamples).toBe(result.codeCount)
  });

  it('getMetricsTest, test subscribe, documentCount', () => { 
    let timeGraphData: TimeGraphData = {numContents: 1,  returnedLongs: [1]}
    let result:MetricsData = { codeCount: 5, documentCount: 7, pptCount: 8, numDiffModsCount: 4, avgResources: 2, timeGraphData: timeGraphData};
    let url = baseURL + `/metrics/${service.MILLIS_PER_YEAR}`;
    let filter: Filter = new Filter("Test", formats, [1], []);
    service.getMetrics(filter);
    httpTestingController.expectOne(url).flush(result);
    expect(service.reportsPage.lectureNotes).toBe(result.documentCount)
  });

  it('getMetricsTest, test subscribe, pptCount', () => { 
    let timeGraphData: TimeGraphData = {numContents: 1,  returnedLongs: [1]}
    let result:MetricsData = { codeCount: 5, documentCount: 7, pptCount: 8, numDiffModsCount: 4, avgResources: 2, timeGraphData: timeGraphData};
    let url = baseURL + `/metrics/${service.MILLIS_PER_YEAR}`;
    let filter: Filter = new Filter("Test", formats, [1], []);
    service.getMetrics(filter);
    httpTestingController.expectOne(url).flush(result);
    expect(service.reportsPage.powerpoints).toBe(result.pptCount)
  });

  it('getMetricsTest, test subscribe, numDiffModsCount', () => { 
    let timeGraphData: TimeGraphData = {numContents: 1,  returnedLongs: [1]}
    let result:MetricsData = { codeCount: 5, documentCount: 7, pptCount: 8, numDiffModsCount: 4, avgResources: 2, timeGraphData: timeGraphData};
    let url = baseURL + `/metrics/${service.MILLIS_PER_YEAR}`;
    let filter: Filter = new Filter("Test", formats, [1], []);
    service.getMetrics(filter);
    httpTestingController.expectOne(url).flush(result);
    expect(service.reportsPage.difModules).toBe(result.numDiffModsCount)
  });

  it('getMetricsTest, test subscribe, avgResources', () => { 
    let timeGraphData: TimeGraphData = {numContents: 1,  returnedLongs: [1]}
    let result:MetricsData = { codeCount: 5, documentCount: 7, pptCount: 8, numDiffModsCount: 4, avgResources: 2, timeGraphData: timeGraphData};
    let url = baseURL + `/metrics/${service.MILLIS_PER_YEAR}`;
    let filter: Filter = new Filter("Test", formats, [1], []);
    service.getMetrics(filter);
    httpTestingController.expectOne(url).flush(result);
    expect(service.reportsPage.avgResources).toBe(result.avgResources)
  });

  it('getMetricsTest, test subscribe, timeGraphData', () => { 
    let timeGraphData: TimeGraphData = {numContents: 1,  returnedLongs: [1]}
    let result:MetricsData = { codeCount: 5, documentCount: 7, pptCount: 8, numDiffModsCount: 4, avgResources: 2, timeGraphData: timeGraphData};
    let url = baseURL + `/metrics/${service.MILLIS_PER_YEAR}`;
    let filter: Filter = new Filter("Test", formats, [1], []);
    service.getMetrics(filter);
    httpTestingController.expectOne(url).flush(result);
    expect(service.reportsTimeGraph.timeGraphData).toBe(result.timeGraphData);
  });

  it('getMetricsTest, test error', () => {
     let url = baseURL + `/metrics/${service.MILLIS_PER_YEAR}`;
     let filter: Filter = new Filter("Test", formats, [1], []);
     service.getMetrics(filter);
     const req = httpTestingController.expectOne(url);
     expect(req.request.method).toEqual("POST");
     req.error(null, {status: 400, statusText: "Bad Request"});
   });

   it('getMetricsTest, test error, metricsData null', () => {
    let url = baseURL + `/metrics/${service.MILLIS_PER_YEAR}`;
    let filter: Filter = new Filter("Test", formats, [1], []);
    service.getMetrics(filter);
    httpTestingController.expectOne(url).error(null, {status: 400, statusText: "Bad Request"});
    expect(globalReports.metricsData).toBe(null)
  });

  it('getMetricsTest, test error, timeGraphData null', () => {
    let url = baseURL + `/metrics/${service.MILLIS_PER_YEAR}`;
    let filter: Filter = new Filter("Test", formats, [1], []);
    service.getMetrics(filter);
    httpTestingController.expectOne(url).error(null, {status: 400, statusText: "Bad Request"});
    expect(service.reportsTimeGraph.timeGraphData).toBe(null);
  });

  it('getMetricsTest, test error, loading false', () => {
    let url = baseURL + `/metrics/${service.MILLIS_PER_YEAR}`;
    let filter: Filter = new Filter("Test", formats, [1], []);
    service.getMetrics(filter);
    httpTestingController.expectOne(url).error(null, {status: 400, statusText: "Bad Request"});
    expect(service.loading).toBe(false)
  });

});
