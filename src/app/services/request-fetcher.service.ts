import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import {Request} from '../models/Request';
import {EndpointsService} from '../constants/endpoints.service';
import {Module} from '../models/Module';


@Injectable({
  providedIn: 'root'
})
export class RequestFetcherService {
  /** HTTP Headers to be used in HTTP requests */
  private readonly HEADERS = new HttpHeaders({ 'Content-Type': 'application/json' });

  // Dummy data while back-end gets ready
  data: Request[] = [new Request( 1,  'Request Java Doc', 'Document',
      'Need this Java Doc ASAP', null,
      [new Module(1, 'Java', 1568317414131, [], [], [] )]  ), new Request( 2,  'Request SQL Code', 'Code',
      'An SQL doc would be beneficial to me.', null,
      [new Module(2, 'SQL', 1568317414131, [], [], [] )]  ), new Request( 3,  'Requesting Micro-service presentation', 'Powerpoint',
      'A presentation about Micro-services would be great!', null,
      [new Module(3, 'Micro-Services', 1568317414131, [], [], [] )]  )] ;


  constructor(
      private http: HttpClient,
      private endpoints: EndpointsService) { }

      getAllRequests(): Observable<Request[]> {
    return of (this.data);
      }

      getRequestById(requestId: number): Observable<Request> {
        // add funtion for retreiving individual request by id
      return this.http.get<Request>(this.endpoints.GET_REQUEST_BY_ID);
      }

      deleteRequestById(requestId: number) {
        // Dummy data deletion by index, index is mapped to id;
        // ToDo: Delete by id
        this.data.splice(requestId, 1);
      }
}


