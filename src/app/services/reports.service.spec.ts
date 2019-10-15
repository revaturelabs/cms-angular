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

describe('ReportsService', () => {
  let service: ReportsService;
  let httpTestingController: HttpTestingController;
  let baseURL;
  let globalReports: GlobalReports
  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
      
      ToastrModule.forRoot()
    ],
    declarations:[
      
    ],
    providers: [
      GlobalReports, 
      ReportsService,
     ]
    });

    service = TestBed.get(ReportsService);
    globalReports = TestBed.get(GlobalReports);
    service.reportsPage = new ReportsPageComponent(service, null, null);
    service.reportsTimeGraph = new ReportsTimeGraphComponent(service, globalReports);
    httpTestingController = TestBed.get(HttpTestingController);
    baseURL = environment.cms_url;

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
    let filter: Filter = new Filter("Test", "String", [1]);
    service.getMetrics(filter);
    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toEqual("POST");
    req.flush(result);
    expect(globalReports.metricsData).toBe(result)
    expect(service.reportsPage.codeExamples).toBe(result.codeCount)
    expect(service.reportsPage.lectureNotes).toBe(result.documentCount)
    expect(service.reportsPage.powerpoints).toBe(result.pptCount)
    expect(service.reportsPage.difModules).toBe(result.numDiffModsCount)
    expect(service.reportsPage.avgResources).toBe(result.avgResources)
    expect(service.reportsTimeGraph.timeGraphData).toBe(result.timeGraphData);
  });

  it('getMetricsTest, test error', () => {
     let url = baseURL + `/metrics/${service.MILLIS_PER_YEAR}`;
     let filter: Filter = new Filter("Test", "String", [1]);
     service.getMetrics(filter);
     const req = httpTestingController.expectOne(url);
     expect(req.request.method).toEqual("POST");
     req.error(null, {status: 400, statusText: "Bad Request"});
     expect(globalReports.metricsData).toBe(null)
     expect(service.reportsTimeGraph.timeGraphData).toBe(null);
     expect(service.loading).toBe(false)
   });

});
