import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
   providedIn: 'root'
})
export class EndpointsService {
   public readonly baseURL = 'http://localhost:8080';   // CHANGE TO HOST

   public readonly CREATE_NEW_CONTENT: string = this.baseURL + '/content';
   public readonly GET_ALL_CONTENT: string = this.baseURL + '/content';
   public readonly GET_CONTENT_BY_ID: string = this.baseURL + '/content/${id}';
   public readonly UPDATE_CONTENT_BY_ID: string = this.baseURL + '/content/${id}';
   public readonly UPDATE_CONTENT_MODULES_BY_ID: string = this.baseURL + '/content/${id}/modules';
   public readonly DELETE_CONTENT_BY_ID: string = this.baseURL + '/content/${id}';
   public readonly GET_ALL_MODULES: string = this.baseURL + '/module';
   public readonly GET_MODULE_BY_ID: string = this.baseURL + '/module/${id}';
   public readonly GET_CONTENT_BY_SUBJECTS: string = this.baseURL + '/module/${id}/content';
   public readonly FILTER_CONTENT: string = this.baseURL + '/search';
   // public readonly FILTER_CONTENT_BY_TITLE: string = this.baseURL + '/search/title';
   // public readonly FILTER_CONTENT_BY_FORMAT: string = this.baseURL + '/search/format';
   // public readonly FILTER_CONTENT_BY_SUBJECTS: string = this.baseURL + '/search/subjects';

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
         this.GET_ALL_MODULES,
         this.GET_MODULE_BY_ID,
         this.GET_CONTENT_BY_SUBJECTS,
         this.FILTER_CONTENT);
      // this.FILTER_CONTENT_BY_TITLE,
      // this.FILTER_CONTENT_BY_FORMAT,
      // this.FILTER_CONTENT_BY_SUBJECTS);

      return endpoints;
   }

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