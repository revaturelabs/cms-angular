import { Injectable } from '@angular/core';

@Injectable({
   providedIn: 'root'
})
export class EndpointsService {
   public readonly baseURL = "http://localhost:8080";   // CHANGE TO HOST

   public readonly CREATE_NEW_CONTENT: string = "/content";
   public readonly GET_ALL_CONTENT: string = "/content";
   public readonly GET_CONTENT_BY_ID: string = "/content/${id}";
   public readonly UPDATE_CONTENT_BY_ID: string = "/content/${id}";
   public readonly UPDATE_CONTENT_MODULES_BY_ID: string = "/content/${id}/modules";
   public readonly DELETE_CONTENT_BY_ID: string = "/content/${id}";
   public readonly GET_ALL_MODULES: string = "/module";
   public readonly GET_MODULE_BY_ID: string = "/module/${id}";
   public readonly GET_CONTENT_BY_TAG: string = "/module/${id}/content";

   constructor() { }
}