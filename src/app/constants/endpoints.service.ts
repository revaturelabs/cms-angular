import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'

<<<<<<< HEAD:src/app/constants/endpoints.service.ts
/** Accessible back-end endpoints */
=======
/** 
 * For simplicity and abstraction, this service is used to call the
 * accessible back-end endpoints.
 */
>>>>>>> a16a9cc8878f901dc273343f22373d1b6e86ace3:src/app/constants/endpoints.service.ts
@Injectable({
   providedIn: 'root'
})
export class EndpointsService {
   /** Base URL to add endpoints to, obtained from ENV */
   public readonly baseURL = environment.cms_url;   // CHANGE TO HOST

   /** Create Content Endpoint */
   public readonly CREATE_NEW_CONTENT: string = this.baseURL + '/content';
   /** Update Content */
   public readonly UPDATE_CONTENT: string = this.baseURL + '/content';
   /** Get All Content Endpoint */
   public readonly GET_ALL_CONTENT: string = this.baseURL + '/content';
   /** Get Content by ID Endpoint */
   public readonly GET_CONTENT_BY_ID: string = this.baseURL + '/content/${id}';
   /** Update Content Endpoint */
   public readonly UPDATE_CONTENT_BY_ID: string = this.baseURL + '/content/${id}';
   /** Unused */
   public readonly UPDATE_CONTENT_MODULES_BY_ID: string = this.baseURL + '/content/${id}/modules';
   /** Delete Content Endpoint */
   public readonly DELETE_CONTENT_BY_ID: string = this.baseURL + '/content/${id}';
<<<<<<< HEAD:src/app/constants/endpoints.service.ts
=======
   /** Delete Module Endpoint */
   public readonly DELETE_MODULE_BY_ID: string = this.baseURL + '/module/${id}';
>>>>>>> a16a9cc8878f901dc273343f22373d1b6e86ace3:src/app/constants/endpoints.service.ts
   /** Create Module Endpoint */
   public readonly CREATE_NEW_MODULE: string = this.baseURL + '/module';
   /** Get All Modules Endpoint */
   public readonly GET_ALL_MODULES: string = this.baseURL + '/module';
   /** Get Module by ID Endpoint */
   public readonly GET_MODULE_BY_ID: string = this.baseURL + '/module/${id}';
   /** Filter Content Endpoint */
   public readonly FILTER_CONTENT: string = this.baseURL + '/search';
   /** Get metrics for information in DB */
   public readonly GET_METRICS: string = this.baseURL + '/metrics/${timeFrame}';
   
   /** Initialization of Endpoints */
   constructor(private http: HttpClient) { }

   /** Returns string array containing all endpoints */
   public getAllEndpoints(): string[] {
      let endpoints: string[] = new Array(
         this.CREATE_NEW_CONTENT,
         this.UPDATE_CONTENT,
         this.GET_ALL_CONTENT,
         this.GET_CONTENT_BY_ID,
         this.UPDATE_CONTENT_BY_ID,
         this.UPDATE_CONTENT_MODULES_BY_ID,
         this.DELETE_CONTENT_BY_ID,
         this.CREATE_NEW_MODULE,
         this.GET_ALL_MODULES,
         this.GET_MODULE_BY_ID,
         this.FILTER_CONTENT,
         this.GET_METRICS);

      return endpoints;
   }

   /** Test method for printing out JSON at any given URL 
    * @param uri
   */
   public printJSON(uri: string): any {
      let obs = this.http.get<any>(uri);
      obs.subscribe(
         (response) => {
            console.log(response);
         },
         (response) => {
            console.log('failed');
         }
      )
   }
}
