import { Injectable } from '@angular/core';
import { EndpointsService } from '../constants/endpoints.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TimeGraphData } from '../models/TimeGraphData';

@Injectable({
  providedIn: 'root'
})
export class TimeGraphService {

  constructor(
    private http: HttpClient,
    private endpoints: EndpointsService) { }

  getContentForTimeRange(rangeLength: number): Observable<TimeGraphData> {
    return this.http.get<TimeGraphData>(this.endpoints.GET_CONTENT_FOR_TIME_RANGE.replace('${time}', rangeLength.toString()));
  }
}