import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'

/** Accessible back-end endpoints */
/** 
 * For simplicity and abstraction, this service is used to call the
 * accessible back-end endpoints.
 */
@Injectable({
   providedIn: 'root'
})
export class EndpointsService {
   /** Base URL to add endpoints to, obtained from ENV */
   public readonly baseURL = environment.cms_url;   // CHANGE TO HOST

   /** Create Content Endpoint */
   public readonly CREATE_NEW_CONTENT: string = this.baseURL + '/content';
   /** Update Content */
   public readonly UPDATE_CONTENT: string = this.baseURL + '/content/${id}';
   /** Get All Content Endpoint */
   public readonly GET_ALL_CONTENT: string = this.baseURL + '/content';
   /** Get Content by ID Endpoint */
   public readonly GET_CONTENT_BY_ID: string = this.baseURL + '/content/${id}';
   /** Delete Content Endpoint */
   public readonly DELETE_CONTENT_BY_ID: string = this.baseURL + '/content/${id}';
   /** Delete Module and preserve content within Endpoint */
   public readonly DELETE_MODULE_BY_ID: string = this.baseURL + '/modules/${id}';
   /** Delete Module and content that exists only in said module Endpoint */
   public readonly DELETE_MODULE_BY_SPECIFIC_CONTENT: string = this.baseURL + '/modules/${id}?type=unique';
   /** Delete Module and all content associated with said module Endpoint */
   public readonly DELETE_MODULE_WITH_CONTENT: string = this.baseURL + '/modules/${id}?type=all';
   /** Create Module Endpoint */
   public readonly CREATE_NEW_MODULE: string = this.baseURL + '/modules';
   /** Get All Modules Endpoint */
   public readonly GET_ALL_MODULES: string = this.baseURL + '/modules';
   /** Get Module by ID Endpoint */
   public readonly GET_MODULE_BY_ID: string = this.baseURL + '/modules/${id}';
   /** Filter Content Endpoint */
   public readonly FILTER_CONTENT: string = this.baseURL + '/content?title=${title}&format=${format}&modules=${modules}';
   /** Get metrics for information in DB */
   public readonly GET_METRICS: string = this.baseURL + '/metrics/${timeFrame}';
   //Get all root modules (modules with no parents)
   public readonly GET_ROOT_MODULES: string = this.baseURL + '/modules/roots';
   //Get all child modules of an individual module
   public readonly GET_CHILDREN_BY_ID: string = this.baseURL + '/modules/${id}/children/';
   //update module
   public readonly UPDATE_MODULE: string = this.baseURL + '/modules/${id}';
<<<<<<< HEAD

   
   //requests
   public readonly CREATE_NEW_REQUEST: string = this.baseURL + '/request';
   /** Update Request */
   public readonly UPDATE_REQUEST: string = this.baseURL + '/request/${id}';
   /** Get All Request Endpoint */
   public readonly GET_ALL_REQUEST: string = this.baseURL + '/request';
   /** Get Request by ID Endpoint */
   public readonly GET_REQUEST_BY_ID: string = this.baseURL + '/request/${id}';
   /** Update Request Endpoint */
   public readonly UPDATE_REQUEST_BY_ID: string = this.baseURL + '/request/${id}';
   /** Unused */
   public readonly UPDATE_REQUEST_REQMODULES_BY_ID: string = this.baseURL + '/request/${id}/modules';
   /** Delete Request Endpoint */
   public readonly DELETE_REQUEST_BY_ID: string = this.baseURL + '/request/${id}';
   /** Filter Content Endpoint */
   public readonly FILTER_REQUEST: string = this.baseURL + '/request?title=${title}&format=${format}&modules=${modules}';
=======
>>>>>>> a6ba6137b11b1bb938c4db1e15b4af2709f4aa25
   
   /** Initialization of Endpoints */
   constructor(private http: HttpClient) { }

   /** Returns string array containing all endpoints */
   public getAllEndpoints(): string[] {
      let endpoints: string[] = new Array(
         this.CREATE_NEW_CONTENT,//0
         this.UPDATE_CONTENT,//1
         this.GET_ALL_CONTENT,//2
         this.GET_CONTENT_BY_ID,//3
         this.DELETE_CONTENT_BY_ID,//6
         this.CREATE_NEW_MODULE,//7
         this.GET_ALL_MODULES,//8
         this.GET_MODULE_BY_ID,//9
         this.FILTER_CONTENT,//10
         this.GET_METRICS,//11
         this.GET_ROOT_MODULES,//12

         this.GET_CHILDREN_BY_ID, //14
         this.CREATE_NEW_REQUEST,//15
         this.UPDATE_REQUEST,//16
         this.GET_ALL_REQUEST,//17
         this.GET_REQUEST_BY_ID,//18
         this.UPDATE_REQUEST_REQMODULES_BY_ID,//19
         this.DELETE_REQUEST_BY_ID,//20
         this.FILTER_REQUEST //21
      );

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
