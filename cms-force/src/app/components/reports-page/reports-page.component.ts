import { Component, OnInit, HostListener } from '@angular/core';
import { TimeGraphService } from 'src/app/services/time-graph.service';
import { TimeGraphData } from 'src/app/models/TimeGraphData';

@Component({
  selector: 'app-reports-page',
  templateUrl: './reports-page.component.html',
  styleUrls: ['./reports-page.component.css']
})
export class ReportsPageComponent implements OnInit {

  readonly MILLIS_PER_DAY : number = 8.64e+7;

  codeExamples : number;
  lectureNotes : number;
  difModules : number;
  avgResources : number;
  timeGraphData: TimeGraphData = {
    totalBeforeRange: 0,
    creationTimesInRange: []
  };
  yearInMillis: number = 3.154e+10;
  monthInMillis: number = 2.628e+9;

  constructor(private timeGraphService: TimeGraphService) { }

  ngOnInit() {

  }

  getTimesForRange(timeRange: number) {

    // TODO re-activate fetching code here
    // this.timeGraphService.getContentForTimeRange(timeRange)
    //   .subscribe(
    //   (result: TimeGraphData) => {
    //     this.timeGraphData = result;
    //     console.log(result);
    //   },
    //   (result) => {
    //     console.log(result);
    //   });

    let currentDay: number = Date.now();

    this.timeGraphData = {
      totalBeforeRange: 100,
      creationTimesInRange: []
    };

    for(let i = 0; i < 100; i++) {
      this.timeGraphData.creationTimesInRange.push(currentDay - Math.floor(timeRange * Math.random()));
    }

    this.timeGraphData.creationTimesInRange.sort();

    // This version does total accumulated over time
    let dataEntries = [];
    currentDay = 0;
    let total = this.timeGraphData.totalBeforeRange;

    for(let datum of this.timeGraphData.creationTimesInRange) {

      total++;

      if((datum - this.MILLIS_PER_DAY) > currentDay) {
        currentDay = Math.floor(datum / this.MILLIS_PER_DAY) * this.MILLIS_PER_DAY;
        dataEntries.push({
          name: new Date(currentDay),
          value: total
        })
      } else {
        dataEntries[dataEntries.length - 1].value = total;
      }
    }

    this.multi = [
      {
        name: 'content',
        series: dataEntries
      }
    ]
  }
  // viewport based width
  w: number = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  // h: number = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  view: any[] = [(this.w/2), 400];

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    event.target.innerWidth;
    this.w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    this.view = [(this.w/2), 400];

  }


  multi: any[] = [
    {
      name: 'Cyan',
      series: [
        {
          name: new Date('July 4, 2019 00:00:00'),
          value: 2650
        },
        {
          name: new Date('July 6, 2019 00:00:00'),
          value: 2800
        },
        {
          name: new Date('July 7, 2019 00:00:00'),
          value: 2000
        }
      ]
    }
  ];
  // options
  autoScale = true; 
  animations = true;
  showXAxis = true;
  showYAxis = true;
  gradient = true;
  showLegend = false;
  showXAxisLabel = true;
  xAxisLabel = 'Time';
  showYAxisLabel = true;
  yAxisLabel = 'Total Number of Content Records';
  timeline = true;

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

}
