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
   /** Delete Module Endpoint */
   public readonly DELETE_MODULE_BY_ID: string = this.baseURL + '/module/${id}';
      /** Delete Module By Specific Content Endpoint */
   public readonly DELETE_MODULE_BY_SPECIFIC_CONTENT: string = this.baseURL + '/module/speccontent/${id}';
      /** Delete Module With Content Endpoint */
   public readonly DELETE_MODULE_WITH_CONTENT: string = this.baseURL + '/module/withcontent/${id}';
   /** Create Module Endpoint */
   public readonly CREATE_NEW_MODULE: string = this.baseURL + '/module';
   /** Get All Modules Endpoint */
   public readonly GET_ALL_MODULES: string = this.baseURL + '/module';
   /** Get Module by ID Endpoint */
   public readonly GET_MODULE_BY_ID: string = this.baseURL + '/module/${id}';

   // /** Filter Content Endpoint */
   // public readonly FILTER_CONTENT: string = this.baseURL + '/search';
   
   /** Filter Content Endpoint */
   public readonly FILTER_CONTENT: string = this.baseURL + '/search?title=${title}&format=${format}&modules=${modules}';
   /** Get metrics for information in DB */
   public readonly GET_METRICS: string = this.baseURL + '/metrics/${timeFrame}';
   //Get all root modules (modules with no parents)
   public readonly GET_ROOT_MODULES: string = this.baseURL + '/module/roots';
   //Set one parent-child relationship
   public readonly UPDATE_MODULE_RELATIONSHIP_BY_IDS: string = this.baseURL + '/childrenmodules/set/${parentId}/${childId}';
   //Get all child modules of an individual module
   public readonly GET_CHILDREN_BY_ID: string = this.baseURL + '/childrenmodules/${id}';
   
   /** Initialization of Endpoints */
   constructor(private http: HttpClient) { }

   /** Returns string array containing all endpoints */
   public getAllEndpoints(): string[] {
      let endpoints: string[] = new Array(
         this.CREATE_NEW_CONTENT,//0
         this.UPDATE_CONTENT,//1
         this.GET_ALL_CONTENT,//2
         this.GET_CONTENT_BY_ID,//3
         this.UPDATE_CONTENT_BY_ID,//4
         this.UPDATE_CONTENT_MODULES_BY_ID,//5
         this.DELETE_CONTENT_BY_ID,//6
         this.CREATE_NEW_MODULE,//7
         this.GET_ALL_MODULES,//8
         this.GET_MODULE_BY_ID,//9
         this.FILTER_CONTENT,//10
         this.GET_METRICS,//11
         this.GET_ROOT_MODULES,//12
         this.UPDATE_MODULE_RELATIONSHIP_BY_IDS,//13
         this.GET_CHILDREN_BY_ID);//14

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
