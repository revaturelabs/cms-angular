import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpHeaderResponse } from '@angular/common/http';
import { EndpointsService } from '../constants/endpoints.service';
import { Request } from '../models/Request';
import { Cacheable, CacheBuster,globalCacheBusterNotifier } from 'ngx-cacheable';

@Injectable({
  providedIn: 'root'
})
export class SubmitRequestService {

  private readonly HEADERS = new HttpHeaders({ 'Content-Type': 'application/json' });


  constructor(
    private http: HttpClient,
    private endpoints: EndpointsService
  ) { }

  createNewRequest(request: Request): Observable<HttpHeaderResponse> {
    let body: string = JSON.stringify(request);
    globalCacheBusterNotifier.next();
    return this.http.post<HttpHeaderResponse>(this.endpoints.CREATE_NEW_REQUEST, body, { headers: this.HEADERS });
  }
}
