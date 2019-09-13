import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import {Request} from '../models/Request';
import {EndpointsService} from '../constants/endpoints.service';


@Injectable({
  providedIn: 'root'
})
export class RequestFetcherService {
  /** HTTP Headers to be used in HTTP requests */
  private readonly HEADERS = new HttpHeaders({ 'Content-Type': 'application/json' });

  // Dummy data while back-end gets ready
  data: Request[] = [new Request( 1,  'Request Java Doc', 'Document',
                'Need this Java Doc ASAP', null, []  ), new Request( 2,  'Request SQL Code', 'Code',
      'An SQL doc would be beneficial to me.', null, []  ), new Request( 3,  'Requesting Micro-service presentation', 'Powerpoint',
      'A presentation about Micro-services would be great!', null, []  )] ;


  constructor(
      private http: HttpClient,
      private endpoints: EndpointsService) { }

      getAllRequests(): Observable<Request[]> {
    return of (this.data);
      }
}
