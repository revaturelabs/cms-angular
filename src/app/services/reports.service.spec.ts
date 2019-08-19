import { TestBed, tick, fakeAsync } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';
import { GlobalReports } from 'src/app/providers/GlobalReports';
import { environment } from '../../environments/environment'

import { ReportsService } from './reports.service';
import { Filter } from '../models/Filter';

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
    providers: [GlobalReports, ReportsService]
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


    it('getAllContent is working', fakeAsync(() => {
    let filter = new Filter(null,null,null);
    let response = {};

    service.getMetrics(filter);
    const req = httpTestingController.expectOne(baseURL + '/metrics/31540000000');
    expect(req.request.method).toEqual("POST");
    req.flush(response);
    tick();

  }));


});
