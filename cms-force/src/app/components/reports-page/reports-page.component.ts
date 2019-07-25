import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EndpointsService } from 'src/app/constants/endpoints.service';
import { ModuleStoreService } from 'src/app/services/module-store.service';
import { BehaviorSubject } from 'rxjs';
import { ReportsService } from 'src/app/services/reports.service';
import { MetricsData } from 'src/app/models/MetricsData';
import { GlobalReports } from 'src/app/providers/GlobalReports';
import { Content } from '../../models/Content';
import { Filter } from 'src/app/models/Filter';

/**
 * Reports page that measures and displays metrics.
 */

@Component({
  selector: 'app-reports-page',
  templateUrl: './reports-page.component.html',
  styleUrls: ['./reports-page.component.css']
})
export class ReportsPageComponent implements OnInit {

  readonly formats: string[] = ["Code", "Document", "Powerpoint", "All"];
  selFormat: string = "All";
   contents: Content[];
   tablebool: boolean = false;
   moduleIDs: number[];
   selectedSubjects: string[] = [];  // selected from subject list
   // contentWrapper: ContentWrapper;
   searchedSubjects: string[] = [];

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
    private globalReports: GlobalReports,
    public ms: ModuleStoreService) { }


 /** 
  * Call in ngOnInit to happen immediately upon page visitation
  */
  ngOnInit() {
    this.ms.loadModules();

    this.reportsService.reportsPage = this;

    if(this.globalReports.metricsData)
      this.updateMetrics(this.globalReports.metricsData);
    else
      this.getMetrics();
  }
  
  getMetrics() {
    this.reportsService.getMetrics(new Filter("", this.selFormat, this.moduleIDs));
    this.codeExamples = null;
    this.lectureNotes = null;
    this.difModules = null;
    this.avgResources = null;
  }

  updateMetrics(data: MetricsData) {

    this.codeExamples = data.codeCount;
    this.lectureNotes = data.documentCount;
    this.difModules = data.numDiffModsCount;
    this.avgResources = data.avgResources;
  }
}



