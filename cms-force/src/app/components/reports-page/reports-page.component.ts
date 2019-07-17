import { Component, OnInit } from '@angular/core';
import { TimeGraphService } from 'src/app/services/time-graph.service';

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
  timeGraphData: number[];
  yearInMillis: number = 3.154e+10;
  monthInMillis: number = 2.628e+9;

  constructor(private timeGraphService: TimeGraphService) { }

  ngOnInit() {

  }

  getTimesForRange(timeRange: number) {

    // TODO re-activate fetching code here
    // this.timeGraphService.getContentForTimeRange(timeRange)
    //   .subscribe(
    //   (result: number[]) => {
    //     this.timeGraphData = result;
    //     console.log(result);
    //   },
    //   (result) => {
    //     console.log(result);
    //   });

    let currentTime: number = Date.now();

    this.timeGraphData = [];

    for(let i = 0; i < 100; i++) {
      this.timeGraphData.push(currentTime - timeRange * Math.random());
    }
  }
}
