import { Component, OnInit, HostListener } from '@angular/core';
import { TimeGraphData } from 'src/app/models/TimeGraphData';
import { TimeGraphService } from 'src/app/services/time-graph.service';

@Component({
  selector: 'app-reports-time-graph',
  templateUrl: './reports-time-graph.component.html',
  styleUrls: ['./reports-time-graph.component.css']
})
export class ReportsTimeGraphComponent implements OnInit {
  private readonly MILLIS_PER_YEAR: number = 3.154e+10;
  private readonly MILLIS_PER_MONTH: number = 2.628e+9;
  private readonly MILLIS_PER_DAY : number = 8.64e+7;

  codeExamples : number;
  lectureNotes : number;
  difModules : number;
  avgResources : number;
  timeGraphData: TimeGraphData = {
    numContents: 0,
    returnedLongs: []
  };
  requestTime: number;

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
  xAxisLabel = 'Date';
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
    this.getData(this.MILLIS_PER_YEAR);
  }

  getData(timeRange: number) {

    this.timeGraphService.getContentForTimeRange(timeRange)
      .subscribe(
      (result: TimeGraphData) => {
        this.timeGraphData = result;
        this.requestTime = Date.now();
        this.timeGraphData.returnedLongs.sort();
        this.setGraphResults(this.MILLIS_PER_MONTH);
        
      },
      (result) => {
        console.log(result);
      });
  }

  // sets the graph's displaying data to match the timeGraphData variable
  setGraphResults(timeRange: number) {

    if(this.timeGraphData.returnedLongs.length === 0)
      return;
    
    let dataEntries = [];
    let currentDay = 0;
    let total = this.timeGraphData.numContents;
    let startTime = this.requestTime - timeRange;

    for(let datum of this.timeGraphData.returnedLongs) {

      total++;

      if(datum > startTime) {

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
    }
    console.log("After for loop");
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
