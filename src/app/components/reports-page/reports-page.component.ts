import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EndpointsService } from 'src/app/constants/endpoints.service';
import { ModuleStoreService } from 'src/app/services/module-store.service';
import { BehaviorSubject } from 'rxjs';
import { ReportsService } from 'src/app/services/reports.service';
import { MetricsData } from 'src/app/models/MetricsData';
import { GlobalReports } from 'src/app/providers/GlobalReports';

/**
 * Reports page that measures and displays metrics.
 */

@Component({
  selector: 'app-reports-page',
  templateUrl: './reports-page.component.html',
  styleUrls: ['./reports-page.component.css']
})
export class ReportsPageComponent implements OnInit {
/** TS variable referenced to display number of code examples */
  codeExamples : Object;
    /** TS variable referenced to display number of lecture notes */
  lectureNotes : Object;
    /** TS variable referenced to display number of different modules */
  difModules : Object;
    /** TS variable referenced to display the average number of resources per module */
  avgResources : Object;

/**
 * Constructor uses HttpClient for communication and sends to specific endpoints.
 * @param http 
 * @param endpoints 
 */
  constructor(
    private reportsService: ReportsService,
    private globalReports: GlobalReports) { }

 /** 
  * Call in ngOnInit to happen immediately upon page visitation
  */
  ngOnInit() {

    this.reportsService.reportsPage = this;

    if(this.globalReports.metricsData)
      this.updateMetrics(this.globalReports.metricsData);
    else
      this.reportsService.getMetrics();
  }
  
  /** Method for getting the metrics and setting them to null */
  getMetrics() {
    this.reportsService.getMetrics();
    this.codeExamples = null;
    this.lectureNotes = null;
    this.difModules = null;
    this.avgResources = null;
  }

  /**
   * Method for updating the metrics using the data from MetricsData
   * @param data 
   */
  updateMetrics(data: MetricsData) {
    this.codeExamples = data.codeCount;
    this.lectureNotes = data.documentCount;
    this.difModules = data.numDiffModsCount;
    this.avgResources = data.avgResources;
  }
}



