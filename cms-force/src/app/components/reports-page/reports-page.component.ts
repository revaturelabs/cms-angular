import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EndpointsService } from 'src/app/constants/endpoints.service';
import { ModuleStoreService } from 'src/app/services/module-store.service';
import { BehaviorSubject } from 'rxjs';

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
  /** TS variable that gets the moduleIDs we are sending back to the server to get average of */
  moduleIDs: number[] = [];
  /** TS variable to store all of the modules from server  */
  selectedSubject:string[] = [];



/**
 * Constructor uses HttpClient for communication and sends to specific endpoints.
 * @param http 
 * @param endpoints 
 */
  constructor(private http:HttpClient, private endpoints: EndpointsService,
              public ms:ModuleStoreService) { }

 /** 
  * Call in ngOnInit to happen immediately upon page visitation
  */
  
  ngOnInit() {
    this.populateCode();
    this.populateModules();
    this.ms.loadModules();
    this.ms.buffer.subscribe((ret)=>{
      if(ret === false){
        this.populateAvg();
      }
    });
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
  // populateNotes(){
  //   this.http.get(this.endpoints.COUNTNOTES).subscribe(data => {
  //     this.lectureNotes = data;
  //   });
  // }


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
    this.selectedSubject = this.ms.subjectNames;
    this.getIDsFromSubjects(this.selectedSubject); //sets
    
    if(this.moduleIDs.length > 0){
      this.http.post(this.endpoints.COUNTAVERAGE, {modules: this.moduleIDs}).subscribe(data => {
        this.avgResources = data;
      });
    } else {
      this.avgResources = 0;
    }
  }

  /**
    * Took this from another container
    * Gets the string array of selected subjects and populates
    * the number array of subject id (or model or tag or whatever the team never really settled on the name 
    * like it was tag at first then prerequisite then modules then affiliation then subjects like come on)
    * @param subjects
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



