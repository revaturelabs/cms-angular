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
      this.timeGraphData.push(currentTime - Math.floor(timeRange * Math.random()));
    }
    // sum values that land on same day
    // if day === day
    console.log(this.timeGraphData);

    // 
    //
  }
  
  view: any[] = [700, 400];
  multi: any[] = [
    {
      name: 'Cyan',
      series: [
        {
          name: 5,
          value: 2650
        },
        {
          name: 10,
          value: 2800      },
        {
          name: 15,
          value: 2000
        }
      ]
    }
  ];
  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Number';
  showYAxisLabel = true;
  yAxisLabel = 'Color Value';
  timeline = true;

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

}
