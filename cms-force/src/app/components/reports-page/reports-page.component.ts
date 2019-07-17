import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reports-page',
  templateUrl: './reports-page.component.html',
  styleUrls: ['./reports-page.component.css']
})
export class ReportsPageComponent implements OnInit {

  codeExamples : number;
  lectureNotes : number;
  difModules : number;
  avgResources : number;

  constructor() { }

  ngOnInit() {
  }

}
