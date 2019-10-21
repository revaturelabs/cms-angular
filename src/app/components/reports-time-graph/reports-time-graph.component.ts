import { Component, OnInit, HostListener } from '@angular/core';
import { TimeGraphData } from 'src/app/models/TimeGraphData';
import { ReportsService } from 'src/app/services/reports.service';
import { GlobalReports } from 'src/app/providers/GlobalReports';

/**
 * Reports Time Graph component for displaying the time graph
 */
@Component({
  selector: 'app-reports-time-graph',
  templateUrl: './reports-time-graph.component.html',
  styleUrls: ['./reports-time-graph.component.css']
})
export class ReportsTimeGraphComponent implements OnInit {
  /** Milliseconds per year */
  public readonly MILLIS_PER_YEAR: number = 3.154e+10;
  /** Milliseconds per month */
  public readonly MILLIS_PER_MONTH: number = 2.628e+9;
  /** Milliseconds per day */
  public readonly MILLIS_PER_DAY : number = 8.64e+7;

  /** Data returned by time graph, including number of content */
  timeGraphData: TimeGraphData = {
    numContents: 0,
    returnedLongs: []
  };
  /** The time at which the data was retrieved */
  requestTime: number = null;

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
  yAxisLabel = 'Total Content Records';
  /** Line chart option for timeline */
  timeline = true;

  /** The color scheme of the line chart */
  colorScheme = {
    domain: ['#F26925']
  };

  /** text representing the selected time range displayed in the graph */
  selectedView: string = null;

  /** Viewport base width of the line chart */
  w: number = Math.max(document.documentElement.clientWidth, window.innerWidth);

  /** The dimensions of the line chart */
  view: any[] = [(this.w/2), 400];

  /** Displaying the selected time range */
  selectedTimeRange: number = this.MILLIS_PER_MONTH;

 /**
  * Constructor using the ReportsService service and GlobalReports Service
  * @param reportsService 
  * @param globalReports 
  */
  constructor(
    public reportsService: ReportsService,
    public globalReports: GlobalReports) { }

  /** 
  * Call in ngOnInit to happen immediately upon page visitation
  */
  ngOnInit() {
    this.reportsService.reportsTimeGraph = this;
    if(this.globalReports.metricsData)
      this.updateGraph(this.globalReports.metricsData.timeGraphData);
  }
  
  /**
   * Callback method for updating the timegraph data
   * @param timeGraphData 
   */
  updateGraph(timeGraphData: TimeGraphData) {
    this.timeGraphData = timeGraphData;
    if (this.timeGraphData == null) {
      this.graphResults = null;
      return;
    }
    this.requestTime = Date.now();
    this.timeGraphData.returnedLongs.sort();
    this.setGraphResults(this.selectedTimeRange);
  }

  /**
   * Method to set the graph's displaying data to match the timeGraphData variable
   * @param timeRange Search by 'Past Month', 'Past Six Months' or 'Past Year'
   */
  setGraphResults(timeRange: number) {

    this.selectedTimeRange = timeRange;
    if (timeRange === this.MILLIS_PER_MONTH)
      this.selectedView = "Past Month";
    else if(timeRange === 6 * this.MILLIS_PER_MONTH)
      this.selectedView = "Past Six Months";
    else
      this.selectedView = "Past Year";
    
    //if there is no data to display return an empty array to display
    if (this.timeGraphData.returnedLongs.length === 0) {
      this.graphResults = [
        {
          name: 'content',
          series: []
        }
      ]
      return;
    }

    let dataEntries = [];
    let currentDay = 0;
    let total = this.timeGraphData.numContents;
    let startTime = this.requestTime - timeRange;

    //loops through all data returned
    for (let datum of this.timeGraphData.returnedLongs) {
      total++;
      
      //if the data is in the selected timeframe
      if (datum > startTime) {

        //if the data was created in the current day
        if ((datum - this.MILLIS_PER_DAY) > currentDay) {
          currentDay = Math.floor(datum / this.MILLIS_PER_DAY) * this.MILLIS_PER_DAY;
          dataEntries.push({
            name: new Date(currentDay),
            value: total
          })
        } else {
          if(dataEntries.length != 0){
            dataEntries[dataEntries.length - 1].value = total;
          }
        }
      }
    }

    //set the graph results to the returned content in the correct timeframe
    this.graphResults = [
      {
        name: 'content',
        series: dataEntries
      }
    ]
    
  }

/**
 * Method to resize the window
 * @param event on window resize
 */
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.w = Math.max(document.documentElement.clientWidth, window.innerWidth);
    this.view = [(this.w/2), 400];

    //commented out since it does not seem to do anything though I may be wrong
    //event.target.innerWidth;
  }
}
