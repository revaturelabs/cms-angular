import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Module } from '../models/Module';
import { HttpClient, HttpHeaders, HttpHeaderResponse } from '@angular/common/http';
import { EndpointsService } from '../constants/endpoints.service';
import { Content } from '../models/Content';

@Injectable({
   providedIn: 'root'
})
export class ContentFetcherService {
   private readonly HEADERS = new HttpHeaders({ 'Content-Type': 'application/json' });

   constructor(
      private http: HttpClient,
      private endpoints: EndpointsService) {
   }

   createNewContent(content: Content): Observable<HttpHeaderResponse> {
      let body: string = JSON.stringify(content);
      return this.http.post<HttpHeaderResponse>(this.endpoints.CREATE_NEW_CONTENT, body, { headers: this.HEADERS });
   }

   getAllContent(): Observable<Content[]> {
      return this.http.get<Content[]>(this.endpoints.GET_ALL_CONTENT);
   }

   getContentByID(id: number): Observable<Content> {
      return this.http.get<Content>(this.endpoints.GET_CONTENT_BY_ID.replace('${id}', id.toString()));
   }

   updateContentById(id: number, content: Content): Observable<HttpHeaderResponse> {
      let body: string = JSON.stringify(content);
      return this.http.put<HttpHeaderResponse>(this.endpoints.UPDATE_CONTENT_BY_ID.replace('${id}', id.toString()), body, { headers: this.HEADERS });
   }

   updateContentModulesById(id: number, modules: Module[]): Observable<HttpHeaderResponse> {
      let body: string = JSON.stringify(modules);
      return this.http.put<HttpHeaderResponse>(this.endpoints.UPDATE_CONTENT_MODULES_BY_ID.replace('${id}', id.toString()), body, { headers: this.HEADERS });
   }

   deleteContentByID(id: number): Observable<HttpHeaderResponse> {
      return this.http.delete<HttpHeaderResponse>(this.endpoints.DELETE_CONTENT_BY_ID.replace('${id}', id.toString()));
   }

   getContentBySubjects(id: number, subjects: Module[]): Observable<Content[]> {
      let body: string = JSON.stringify(subjects);
      return this.http.post<Content[]>(this.endpoints.GET_CONTENT_BY_SUBJECTS.replace('${id}', id.toString()), body, { headers: this.HEADERS });
   }

   filterContent(id: number, content: Content): Observable<Content[]> {
      let body: string = JSON.stringify(content);
      return this.http.post<Content[]>(this.endpoints.FILTER_CONTENT.replace('${id}', id.toString()), body, { headers: this.HEADERS });
   }

   // filterContentByTitle(id: number, content: Content): Observable<Content[]> {
   //    let body: string = JSON.stringify(content);
   //    return this.http.post<Content[]>(this.endpoints.FILTER_CONTENT_BY_TITLE.replace('${id}', id.toString()), body, { headers: this.HEADERS });
   // }

   // filterContentByFormat(id: number, content: Content): Observable<Content[]> {
   //    let body: string = JSON.stringify(content);
   //    return this.http.post<Content[]>(this.endpoints.FILTER_CONTENT_BY_FORMAT.replace('${id}', id.toString()), body, { headers: this.HEADERS });
   // }

   // filterContentByModules(id: number, content: Content): Observable<Content[]> {
   //    let body: string = JSON.stringify(content);
   //    return this.http.post<Content[]>(this.endpoints.FILTER_CONTENT_BY_SUBJECTS.replace('${id}', id.toString()), body, { headers: this.HEADERS });
   // }
}
