import { Injectable } from '@angular/core';
import { EndpointsService } from '../constants/endpoints.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TimeGraphData } from '../models/TimeGraphData';
/**
 * The Service for Time Graph
 */
@Injectable({
  providedIn: 'root'
})
export class TimeGraphService {

  /**
   * Constructor for Time-Graph
   * @param http 
   * @param endpoints 
   */
  constructor(
    private http: HttpClient,
    private endpoints: EndpointsService) { }

    /**
     * Method for getting the content for the time Range graph
     * @param rangeLength 
     * 
     */
  getContentForTimeRange(rangeLength: number): Observable<TimeGraphData> {
    return this.http.get<TimeGraphData>(this.endpoints.GET_CONTENT_FOR_TIME_RANGE.replace('${time}', rangeLength.toString()));
  }
}