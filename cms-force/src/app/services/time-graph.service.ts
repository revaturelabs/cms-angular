import { Injectable } from '@angular/core';
import { EndpointsService } from '../constants/endpoints.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TimeGraphService {

  constructor(
    private http: HttpClient,
    private endpoints: EndpointsService) { }

  getContentForTimeRange(rangeLength: number): Observable<number[]> {
    return this.http.get<number[]>(this.endpoints.GET_CONTENT_FOR_TIME_RANGE.replace('${range}', rangeLength.toString()));
  }
}
