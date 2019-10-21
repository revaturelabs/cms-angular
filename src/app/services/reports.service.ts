import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MetricsData } from '../models/MetricsData';
import { EndpointsService } from '../constants/endpoints.service';
import { ModuleStoreService } from './module-store.service';
import { ReportsPageComponent } from '../components/reports-page/reports-page.component';
import { ReportsTimeGraphComponent } from '../components/reports-time-graph/reports-time-graph.component';
import { GlobalReports } from '../providers/GlobalReports';
import { Filter } from '../models/Filter';
import { ToastrService } from 'ngx-toastr';

/** Reports Service for Reports Page */
@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  /** Standard HttpHeader object for application/json */
  private readonly HEADERS = new HttpHeaders({ 'Content-Type': 'application/json' });
  
  /** Milliseconds per year */
  private readonly MILLIS_PER_YEAR: number = 3.154e+10;

  /** Reports page component */
  reportsPage: ReportsPageComponent;
  /** Reports time graph component */
  reportsTimeGraph: ReportsTimeGraphComponent;

  loading: boolean = false;

  /**
   * Constructor for reports service
   * @param http 
   * @param endpoints 
   * @param ms 
   * @param globalReports 
   */
  constructor(
    private http: HttpClient,
    private endpoints: EndpointsService,
    private ms: ModuleStoreService,
    private globalReports: GlobalReports,
    private toastr: ToastrService) { }
  
  /**
   * sends the http request to the server to get the reports metrics data
   */
  getMetrics(filter: Filter) {
    
    this.loading = true;

    //turn filter.getModules() into a string of comma separated integers
    let moduleIds: number[] = filter.getModules();
    let moduleIdsString: string = "";
    moduleIds.forEach( (id) => {
      moduleIdsString = moduleIdsString + id.toString() + ",";
    }, this);
    moduleIdsString = moduleIdsString.substring(0, moduleIdsString.length - 1);
    let body = {
      title: "",
      format: filter.getFormat(),
      modules: moduleIdsString
    };
    this.http.post(
      this.endpoints.GET_METRICS.replace('${timeFrame}', this.MILLIS_PER_YEAR.toString()),
      JSON.stringify(body),
      {
        headers: this.HEADERS
      }
      ).subscribe((result: MetricsData) => {
        this.globalReports.metricsData = result;
        this.reportsPage.updateMetrics(result);
        this.reportsTimeGraph.updateGraph(result.timeGraphData);
      },
      (err) => {
        this.globalReports.metricsData = null;
        this.toastr.error("Failed to load reports metrics.");
        this.reportsTimeGraph.updateGraph(null);
        this.loading = false;
      },
      () => {
        this.loading = false;
      });
  }
}
