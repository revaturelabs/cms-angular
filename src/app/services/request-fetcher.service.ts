import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import {Request} from '../models/Request';
import {RequestLink} from '../models/RequestLink';
import {EndpointsService} from '../constants/endpoints.service';
import {Module} from '../models/Module';
import {ModuleStoreService} from './module-store.service';
import { Filter } from '../models/Filter';
import { Cacheable, CacheBuster,globalCacheBusterNotifier } from 'ngx-cacheable';
import { map } from 'rxjs/operators';


/*
* Manages Requests between Angular and back-end
*/
@Injectable({
  providedIn: 'root'
})

export class RequestFetcherService {
  /** HTTP Headers to be used in HTTP requests */
  private readonly HEADERS = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(
      private http: HttpClient,
      private ms: ModuleStoreService,
      private endpoints: EndpointsService) {
        this.ms.loadModules();
     }


  getAllRequests(): Observable<Request[]> {
    return this.http.get<Request[]>(this.endpoints.GET_ALL_REQUEST);
  }

  deleteRequestByID(id: number): Observable<HttpHeaderResponse> {
    // globalCacheBusterNotifier.next();
    return this.http.delete<HttpHeaderResponse>(this.endpoints.DELETE_REQUEST_BY_ID.replace('${id}', id.toString()));
  }

  getRequestByID(id: number): Observable<Request>{
    return this.http.get<Request>(this.endpoints.GET_REQUEST_BY_ID.replace('${id}', id.toString()));
  }

  updateRequestByID(id: number, request: Request): Observable<Request>{
  const body: string = JSON.stringify(request);
  return this.http.put<Request>(this.endpoints.UPDATE_REQUEST.replace('${id}', id.toString()), body,  { headers: this.HEADERS } );
  }

  @Cacheable()
  filterContent(filter: Filter): Observable<Request[]> {
    filter = filter == null ? new Filter(null, null, null) : filter;
    let modules: string = JSON.stringify(filter.modules);
    modules = modules.replace('[','');
    modules = modules.replace(']','');

    return this.http.get<Request[]>(this.endpoints.FILTER_REQUEST.replace('${title}',
    filter.title).replace('${format}', filter.format).replace('${modules}', modules), {withCredentials: true}).pipe(
        map(resp => resp as Request[])
      );
  }
}


