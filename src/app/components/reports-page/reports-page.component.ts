import { Component, OnInit } from '@angular/core';
import { ModuleStoreService } from 'src/app/services/module-store.service';
import { CurriculumStoreService } from 'src/app/services/curriculum-store.service';
import { BehaviorSubject } from 'rxjs';
import { ReportsService } from 'src/app/services/reports.service';
import { MetricsData } from 'src/app/models/MetricsData';
import { GlobalReports } from 'src/app/providers/GlobalReports';
import { Content } from '../../models/Content';
import { Filter } from 'src/app/models/Filter';
import { Curriculum } from 'src/app/models/Curriculum';

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
  selFormatFilter = "All";
  contents: Content[];
  moduleIDs: number[];
  curriculumIDs: number[];
  selectedSubjects: string[] = [];
  searchedSubjects: string[] = [];

  /** TS variable referenced to display number of code examples */
  codeExamples : Object;
  /** TS variable referenced to display number of lecture notes */
  lectureNotes : Object;
  /** TS varialbe referenced to display number of powerpoints */
  powerpoints : Object;
  /** TS variable referenced to display number of different modules */
  difModules : Object = null;
  /** TS variable referenced to display the average number of resources per module */
  avgResources : Object = null;

  /**
   * Constructor uses HttpClient for communication and sends to specific endpoints.
   * @param http 
   * @param endpoints 
   */
  constructor(
    public reportsService: ReportsService,
    public globalReports: GlobalReports,
    public crs: CurriculumStoreService,
    public ms: ModuleStoreService
    ) { }


  /** 
    * Call in ngOnInit to happen immediately upon page visitation
    * If metricsData exists in the globalReports it will use updateMetrics() on this page
    * to set the data to display. Otherwise it will call getMetrics() on this page to call
    * the reports service.
    */
  ngOnInit() {
    this.ms.loadModules();
    this.crs.loadCurricula();
    this.reportsService.reportsPage = this;

    if(this.globalReports.metricsData ) {
      this.updateMetrics(this.globalReports.metricsData);

    } else {
      this.getMetrics();
    }
  }
  
  /** Method for getting the metrics from the reportsService, this triggers
   * when the user clicks the filter/search button 
  */
  getMetrics() {
    this.getIDsFromSubjects(this.selectedSubjects);
    this.selFormatFilter = this.selFormat;

    //filter to get content by the selected format and moduleIDs from the reportsService
    this.reportsService.getMetrics(new Filter("", [this.selFormat], this.moduleIDs, this.curriculumIDs));

    this.codeExamples = null;
    this.lectureNotes = null;
    this.powerpoints = null;
    //difModules and avgResources are not set again on filtering/searching
  }

  /**
   * Method for updating the metrics using the data from globalReports.metricsData
   * 
   * difModules and avgResources are static variables
   * that refrence the total number of existing modules and the content per module
   * in the system overall. They will not change on filtering results. 
   * 
   * @param data the metricsData returned from globalReports
   */
  updateMetrics(data: MetricsData) {
    this.codeExamples = data.codeCount;
    this.lectureNotes = data.documentCount;
    this.powerpoints = data.pptCount;

    if(this.difModules == null){
      this.difModules = data.numDiffModsCount;
      this.avgResources = data.avgResources;
    }
  }

  
  /**
    * Method that takes a string array of selected subjects and populates the number array of subject id 
    * @param subjects an array of strings sent to this function
    */
   getIDsFromSubjects(subjects: string[]) {
    this.moduleIDs = [];
    if(subjects){
      subjects.forEach(
        (subject) => {
          this.moduleIDs.push(this.ms.subjectNameToModule.get(subject).id);
        }, this
      )
    }
  }

}



