import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Module } from '../models/Module';
import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { EndpointsService } from '../constants/endpoints.service';
import { Cacheable, CacheBuster, globalCacheBusterNotifier } from 'ngx-cacheable';

/** 
 * Manages Modules between Angular and spring-boot back-end. To do this, the 
 * endpoints service is utilized to fetch the endpoints that need to be used. 
 * With them in hand, an instance of HttpClient is used to use the required
 * HttpMethod.  
 */

@Injectable({
   providedIn: 'root'
})

export class ModuleFetcherService {

   /** HTTP Headers to be used in HTTP requests */
   private readonly HEADERS = new HttpHeaders({ 'Content-Type': 'application/json' });

   /**
    * Initialize Service
    * @param http; the client to send requests to back-end.
    * @param endpoints; the collection of available endpoints that are needed.
    */

   constructor(
      private http: HttpClient,
      private endpoints: EndpointsService) {

   }

   /**
    * Sends HTTP request to return all Modules using the .GET_ALL_MODULES endpoint to
    * fetch all the modules. 
    */
   @Cacheable()
   getAllModules(): Observable<Module[]> {
      return this.http.get<Module[]>(this.endpoints.GET_ALL_MODULES);
   }

   /**
    * Sends HTTP request to return Module by ID
    * @param id; Unique Identifier of Module to be returned
    */

   getModuleByID(id: number): Observable<Module> {
      return this.http.get<Module>(this.endpoints.GET_MODULE_BY_ID.replace('${id}', id.toString()));
   }

   /** Used for debugging, loads Module[] from specified URL */
   getAllFakeModules(url: string): Observable<Module[]> {
      return this.http.get<Module[]>(url);
   }

   /**
    * Sends HTTP request to persist Module to back-end
    * @param module What module to persist to back-end
    */
   
   createNewModule(module: Module): Observable<HttpHeaderResponse> {
      let body: string = JSON.stringify(module);
      globalCacheBusterNotifier.next();
      return this.http.post<HttpHeaderResponse>(this.endpoints.CREATE_NEW_MODULE, body, { headers: this.HEADERS });
   }

   /**
    * Sends HTTP request to remove Module from back-end
    * @param id Unique identifier determining which Module to remove
    */
   
   deleteModuleByID(id: number): Observable<HttpHeaderResponse> {
      globalCacheBusterNotifier.next();
      return this.http.delete<HttpHeaderResponse>(this.endpoints.DELETE_MODULE_BY_ID.replace('${id}', id.toString()));
   }

}

