import { Component, OnInit, HostListener } from '@angular/core';
import { TimeGraphService } from 'src/app/services/time-graph.service';
import { TimeGraphData } from 'src/app/models/TimeGraphData';

@Component({
  selector: 'app-reports-page',
  templateUrl: './reports-page.component.html',
  styleUrls: ['./reports-page.component.css']
})
export class ReportsPageComponent implements OnInit {
  
  private readonly MILLIS_PER_YEAR: number = 3.154e+10;
  private readonly MILLIS_PER_MONTH: number = 2.628e+9;
  private readonly MILLIS_PER_DAY : number = 8.64e+7;

  codeExamples : number;
  lectureNotes : number;
  difModules : number;
  avgResources : number;
  timeGraphData: TimeGraphData = {
    totalBeforeRange: 0,
    creationTimesInRange: []
  };

  graphResults: any[] = [
    {
      name: '',
      series: []
    }
  ];

  // line chart options
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
    domain: ['#F26925']
  };

  // viewport based width
  w: number = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  // h: number = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  view: any[] = [(this.w/2), 400];

  constructor(private timeGraphService: TimeGraphService) { }

  ngOnInit() {
    this.getTimesForRange(this.MILLIS_PER_YEAR);
  }

  getTimesForRange(timeRange: number) {

    // TODO: re-activate fetching code here
    // this.timeGraphService.getContentForTimeRange(timeRange)
    //   .subscribe(
    //   (result: TimeGraphData) => {
    //     this.timeGraphData = result;
    //     console.log(result);
    //   },
    //   (result) => {
    //     console.log(result);
    //   });

    // TODO: remove this line once the real data is being retrieved
    this.getMockData(timeRange);

    this.timeGraphData.creationTimesInRange.sort();
  }

  // TODO: remove this method once the real data is being retrieved
  getMockData(timeRange: number) {

    let currentDay: number = Date.now();

    this.timeGraphData = {
      totalBeforeRange: 100,
      creationTimesInRange: []
    };

    for(let i = 0; i < 100; i++) {
      this.timeGraphData.creationTimesInRange.push(currentDay - Math.floor(timeRange * Math.random()));
    }
  }

  // sets the graph's displaying data to match the timeGraphData variable
  setGraphResults() {

    let dataEntries = [];
    let currentDay = 0;
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

    this.graphResults = [
      {
        name: 'content',
        series: dataEntries
      }
    ]
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    this.view = [(this.w/2), 400];
    event.target.innerWidth;
  }
}
