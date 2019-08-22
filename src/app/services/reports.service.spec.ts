import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';
import { GlobalReports } from 'src/app/providers/GlobalReports';
import { environment } from '../../environments/environment'

import { ReportsService } from './reports.service';

describe('ReportsService', () => {
  let service: ReportsService;
  let httpTestingController: HttpTestingController;
  let baseURL;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
      ToastrModule.forRoot()
    ],
    providers: [
      GlobalReports, 
      ReportsService
    ]
    });

    service = TestBed.get(ReportsService);
    httpTestingController = TestBed.get(HttpTestingController);
    baseURL = environment.cms_url;

  });

  afterEach(() => {
    httpTestingController.verify();

  });

  it('should be created', () => {
    expect(service).toBeTruthy();

  });

  /**
   * There was an attempt to test the getMetrics() method here, however we were unable
   * to figure out how to define reportsPage.updateMetrics() and reportsTimeGraph.updateGraph()
   * in this spec.ts file. When running a test on that method it would fail saying reportsPage and 
   * reportsTimeGraph were undefined. We unfortunately were unable to properly test this function in 
   * the time we had. 
   */
  

});
