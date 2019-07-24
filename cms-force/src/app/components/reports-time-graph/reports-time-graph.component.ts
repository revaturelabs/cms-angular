import { Component, OnInit, HostListener } from '@angular/core';
import { TimeGraphData } from 'src/app/models/TimeGraphData';
import { TimeGraphService } from 'src/app/services/time-graph.service';

/**
 * Reports Time Graph component for didsplaying the time graph
 */
@Component({
  selector: 'app-reports-time-graph',
  templateUrl: './reports-time-graph.component.html',
  styleUrls: ['./reports-time-graph.component.css']
})

export class ReportsTimeGraphComponent implements OnInit {
  /** Milliseconds per year */
  private readonly MILLIS_PER_YEAR: number = 3.154e+10;
  /** Milliseconds per month */
  private readonly MILLIS_PER_MONTH: number = 2.628e+9;
  /** Milliseconds per day */
  private readonly MILLIS_PER_DAY : number = 8.64e+7;

  /** Data returned by time graph, including number of content */
  timeGraphData: TimeGraphData = {
    numContents: 0,
    returnedLongs: []
  };
  /** Time for request to display */
  requestTime: number;

  /** Displaying the results of the graph in an array */
  graphResults: any[] = null;

 /** Line chart option to auto scale */
  autoScale = true; 
  /** Line chart option for animations */
  animations = true;
  /** Line chart option to show the x axis of graph */
  showXAxis = true;
  /** Line chart option to show the y axis of graph */
  showYAxis = true;
  /** Line chart option for gradient */
  gradient = true;
  /** Line chart option to show the legend of graph */
  showLegend = false;
  /** Line chart option to show x axis label */
  showXAxisLabel = true;
  /** Declaring the x axis label */
  xAxisLabel = 'Date';
  /** Line chart option to show the y axis label */
  showYAxisLabel = true;
  /** Declaring the y axis label */
  yAxisLabel = 'Total Number of Content Records';
  /** Line chart option for timeline */
  timeline = true;

  /** Declaring the color scheme being following */
  colorScheme = {
    domain: ['#F26925']
  };

  /** text representing the selected time range displayed in the graph */
  selectedView: string = null;

  /** Viewport base width */
  w: number = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  // h: number = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  /** Setting view size */
  view: any[] = [(this.w/2), 400];

  /**
   * Constructor using the TimeGraphService service
   * @param timeGraphService 
   */
  constructor(private timeGraphService: TimeGraphService) { }

  /** Declaring functions to be called on page load */
  ngOnInit() {
    this.getData(this.MILLIS_PER_YEAR);
  }

  /**
   * Method for getting data to populate graph
   * @param timeRange 
   */
  getData(timeRange: number) {

    this.timeGraphService.getContentForTimeRange(timeRange)
      .subscribe(
        (result: TimeGraphData) => {
          this.timeGraphData = result;
          this.requestTime = Date.now();
          this.timeGraphData.returnedLongs.sort();
          this.setGraphResults(this.MILLIS_PER_MONTH);
          // console.log(this.timeGraphData);
        },
        (result) => {
          console.log(result);
        });
  }

  /**
   * Method to set the graph's displaying data to match the timeGraphData variable
   * @param timeRange 
   */
  setGraphResults(timeRange: number) {

    if (timeRange === this.MILLIS_PER_MONTH)
      this.selectedView = "Past Month";
    else if(timeRange === 6 * this.MILLIS_PER_MONTH)
      this.selectedView = "Past Six Months";
    else
      this.selectedView = "Past Year";
    
    if (this.timeGraphData.returnedLongs.length === 0)
      return;

    let dataEntries = [];
    let currentDay = 0;
    let total = this.timeGraphData.numContents;
    let startTime = this.requestTime - timeRange;

    for (let datum of this.timeGraphData.returnedLongs) {

      total++;

      if (datum > startTime) {

        if ((datum - this.MILLIS_PER_DAY) > currentDay) {
          
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

    this.graphResults = [
      {
        name: 'content',
        series: dataEntries
      }
    ]
  }

/**
 * Method to resize the window
 * @param event 
 */
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    this.view = [(this.w/2), 400];
    event.target.innerWidth;
  }
}
