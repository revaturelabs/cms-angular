import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EndpointsService } from 'src/app/constants/endpoints.service';

@Component({
  selector: 'app-reports-page',
  templateUrl: './reports-page.component.html',
  styleUrls: ['./reports-page.component.css']
})
export class ReportsPageComponent implements OnInit {

  codeExamples : Object;
  lectureNotes : Object;
  difModules : Object;
  avgResources : Object;

  constructor(private http:HttpClient, private endpoints: EndpointsService) { }

  // Call in ngOnInit to happen immediately upon page visitation
  
  ngOnInit() {
    this.populateCode();
    this.populateAvg();
    this.populateModules();
    this.populateNotes();
  }

  // Functions call server to recieve metric statistics and display in HTML on Reports page

  populateCode(){
    this.http.get(this.endpoints.COUNTCODE).subscribe(data => {
      this.codeExamples = data;
    });

  }

  populateNotes(){
    this.http.get(this.endpoints.COUNTNOTES).subscribe(data => {
      this.lectureNotes = data;
    });
  }

  populateModules(){
    this.http.get(this.endpoints.COUNTMODULES).subscribe(data => {
      this.difModules = data;
    });
  }

  populateAvg(){
    this.http.get(this.endpoints.COUNTAVERAGE).subscribe(data => {
      this.avgResources = data;
    });
  }
}



