import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
   providedIn: 'root'
})
export class EndpointsService {
   public readonly baseURL = 'http://ec2-18-191-112-157.us-east-2.compute.amazonaws.com:9009/CMSforce/as';   // CHANGE TO HOST

   public readonly CREATE_NEW_CONTENT: string = this.baseURL + '/content';
   public readonly GET_ALL_CONTENT: string = this.baseURL + '/content';
   public readonly GET_CONTENT_BY_ID: string = this.baseURL + '/content/${id}';
   public readonly UPDATE_CONTENT_BY_ID: string = this.baseURL + '/content/${id}';
   public readonly UPDATE_CONTENT_MODULES_BY_ID: string = this.baseURL + '/content/${id}/modules';
   public readonly DELETE_CONTENT_BY_ID: string = this.baseURL + '/content/${id}';
   public readonly CREATE_NEW_MODULE: string = this.baseURL + '/module';
   public readonly GET_ALL_MODULES: string = this.baseURL + '/module';
   public readonly GET_MODULE_BY_ID: string = this.baseURL + '/module/${id}';
   public readonly FILTER_CONTENT: string = this.baseURL + '/search';

   constructor(private http: HttpClient) { }

   /* for easy access for testing, etc. */
   public getAllEndpoints(): string[] {
      let endpoints: string[] = new Array(
         this.CREATE_NEW_CONTENT,
         this.GET_ALL_CONTENT,
         this.GET_CONTENT_BY_ID,
         this.UPDATE_CONTENT_BY_ID,
         this.UPDATE_CONTENT_MODULES_BY_ID,
         this.DELETE_CONTENT_BY_ID,
         this.CREATE_NEW_MODULE,
         this.GET_ALL_MODULES,
         this.GET_MODULE_BY_ID,
         this.FILTER_CONTENT);

      return endpoints;
   }

   /* test method for printing out JSON at any given URL */
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