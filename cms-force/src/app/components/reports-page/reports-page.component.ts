import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EndpointsService } from 'src/app/constants/endpoints.service';

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
  constructor(private http:HttpClient, private endpoints: EndpointsService) { }

 /** 
    * Call in ngOnInit to happen immediately upon page visitation
  */
  
  ngOnInit() {
    this.populateCode();
    this.populateAvg();
    this.populateModules();
    // this.populateNotes();
  }
  
  /**
   * Calls server to get code count
   */
  populateCode(){
    this.http.get(this.endpoints.COUNTCODE).subscribe(data => {
      this.codeExamples = data[0];
      this.lectureNotes = data[1];
    });

  }


   /**
   * Calls server to get notes (document) count
   */
  populateNotes(){
    this.http.get(this.endpoints.COUNTNOTES).subscribe(data => {
      this.lectureNotes = data;
    });
  }


  /** 
   * Calls server to get different module count 
   */
  populateModules(){
    this.http.get(this.endpoints.COUNTMODULES).subscribe(data => {
      this.difModules = data;
    });
  }


 /** 
   * Calls server to get average number of resources
   */
  populateAvg(){
    this.http.get(this.endpoints.COUNTAVERAGE).subscribe(data => {
      this.avgResources = data;
    });
  }
}



