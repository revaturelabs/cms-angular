import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Module } from '../models/Module';
import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { EndpointsService } from '../constants/endpoints.service';
import { Cacheable, CacheBuster, globalCacheBusterNotifier } from 'ngx-cacheable';
import { map } from 'rxjs/operators';

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
    * @param http Client to send requests to back-end
    * @param endpoints Endpoints of back-end to send requests to
    */

   constructor(
      private http: HttpClient,
      private endpoints: EndpointsService) {

   }

   /**
    * Sends HTTP request to return all Modules
    */
   @Cacheable()
   getAllModules(): Observable<Module[]> {
      return this.http.get(this.endpoints.GET_ALL_MODULES).pipe(map(resp => resp as Module[]));
   }

   /**
    * Sends HTTP request to return Module by ID
    * @param id Unique Identifier of Module to be returned
    */
   @Cacheable()
   getModuleByID(id: number): Observable<Module> {
      return this.http.get(this.endpoints.GET_MODULE_BY_ID.replace('${id}', id.toString())).pipe(map(resp => resp as Module));
   }
   // Sends HTTP request for root modules, modules that have no parents... like batman
   @Cacheable()
   batman(): Observable<Module>{
      return this.http.get(this.endpoints.GET_ROOT_MODULES).pipe(map(resp => resp as Module));
   }

   // Sends HTTP request to get all children of a module, as an array of module JSON objects
   @Cacheable()
   getChildrenById(id: number): Observable<Module[]> {
      return this.http.get(this.endpoints.GET_CHILDREN_BY_ID.replace('${id}', id.toString())).pipe(map(resp => resp as Module[]));
   }

   @Cacheable()
   /** Used for debugging, loads Module[] from specified URL */
   getAllFakeModules(url: string): Observable<Module[]> {
      return this.http.get(url).pipe(map(resp => resp as Module[]));
   }

   /**
    * Sends HTTP request to persist Module to back-end
    * @param module What module to persist to back-end
    */
   
   createOrUpdateModule(module: Module): Observable<HttpHeaderResponse> {
      let body: string = JSON.stringify(module);
      globalCacheBusterNotifier.next();

      console.log(body);

      if (module.id == -1)
         return this.http.post<HttpHeaderResponse>(this.endpoints.CREATE_NEW_MODULE, module, { headers: this.HEADERS });
      
      return this.http.put<HttpHeaderResponse>(
         this.endpoints.UPDATE_MODULE.replace("${id}", module.id.toString()), body, { headers: this.HEADERS });
   }

   /**
    * Sends HTTP request to remove Module from back-end
    * @param id Unique identifier determining which Module to remove
    */
   
   deleteModuleByID(id: number): Observable<HttpHeaderResponse> {
      globalCacheBusterNotifier.next();
      return this.http.delete<HttpHeaderResponse>(this.endpoints.DELETE_MODULE_BY_ID.replace('${id}', id.toString()));
   }

   deleteModuleWithSpecificContent(id: number): Observable<HttpHeaderResponse> {
      globalCacheBusterNotifier.next();
      return this.http.delete<HttpHeaderResponse>(this.endpoints.DELETE_MODULE_BY_SPECIFIC_CONTENT.replace('${id}', id.toString()));
   }

   deleteModuleWithContent(id: number): Observable<HttpHeaderResponse> {
      globalCacheBusterNotifier.next();
      return this.http.delete<HttpHeaderResponse>(this.endpoints.DELETE_MODULE_WITH_CONTENT.replace('${id}', id.toString()));
   }


}
