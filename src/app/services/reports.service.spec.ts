import { TestBed, fakeAsync, tick, ComponentFixture } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';
import { GlobalReports } from 'src/app/providers/GlobalReports';
import { environment } from '../../environments/environment';
import { HttpHeaderResponse } from '@angular/common/http';


import { ReportsService } from './reports.service';
import { Filter } from '../models/Filter';
import { ReportsPageComponent } from '../components/reports-page/reports-page.component';

describe('ReportsService', () => {
  let service: ReportsService;
  let fixture: ComponentFixture<ReportsService>;
  let httpTestingController: HttpTestingController;
  let baseURL;

  beforeEach(async() => {
    TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
      ToastrModule.forRoot()
    ],
    providers: [GlobalReports, ReportsService]
    }).compileComponents();
    httpTestingController = TestBed.get(HttpTestingController);
  
    baseURL = environment.cms_url;
  });
  beforeEach(() => {
    service = TestBed.get(ReportsService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('getMetrics returns a response', fakeAsync(() => {
    let filter = new Filter(null,null,null);
    let response = {};

    service.getMetrics(filter);
    fixture.detectChanges;

    const req = httpTestingController.expectOne(baseURL + '/metrics/31540000000');
    expect(req.request.method).toEqual("POST");
    req.flush(null);
    tick();
    httpTestingController.verify();

  }));


});
