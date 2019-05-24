import { Injectable } from '@angular/core';

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

   constructor() { }

   public getAllEndpoints(): string[] {
      let endpoints: string[] = new Array(
         this.CREATE_NEW_CONTENT,
         this.GET_ALL_CONTENT,
         this.GET_ALL_MODULES,
         this.GET_CONTENT_BY_ID,
         this.GET_CONTENT_BY_SUBJECTS,
         this.GET_MODULE_BY_ID,
         this.UPDATE_CONTENT_BY_ID,
         this.UPDATE_CONTENT_MODULES_BY_ID);

      return endpoints;
   }
}