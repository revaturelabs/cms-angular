import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Module } from '../models/Module';
import { HttpClient, HttpHeaders, HttpHeaderResponse } from '@angular/common/http';
import { EndpointsService } from '../constants/endpoints.service';
import { ContentWrapper } from '../models/ContentWrapper';

@Injectable({
   providedIn: 'root'
})
export class ContentFetcherService {
   private readonly HEADERS = new HttpHeaders({ 'Content-Type': 'application/json' });

   constructor(
      private http: HttpClient,
      private endpoints: EndpointsService) {
   }

   createNewContent(contentWrapper: ContentWrapper): Observable<HttpHeaderResponse> {
      let body: string = JSON.stringify(contentWrapper);
      return this.http.post<HttpHeaderResponse>(this.endpoints.CREATE_NEW_CONTENT, body, { headers: this.HEADERS });
   }

   getAllContent(): Observable<ContentWrapper[]> {
      return this.http.get<ContentWrapper[]>(this.endpoints.GET_ALL_CONTENT);
   }

   getContentByID(id: number): Observable<ContentWrapper> {
      return this.http.get<ContentWrapper>(this.endpoints.GET_CONTENT_BY_ID.replace('${id}', id.toString()));
   }

   updateContentById(id: number, contentWrapper: ContentWrapper): Observable<HttpHeaderResponse> {
      let body: string = JSON.stringify(contentWrapper);
      return this.http.put<HttpHeaderResponse>(this.endpoints.UPDATE_CONTENT_BY_ID.replace('${id}', id.toString()), body, { headers: this.HEADERS });
   }

   updateContentModulesById(id: number, modules: Module[]): Observable<HttpHeaderResponse> {
      let body: string = JSON.stringify(modules);
      return this.http.put<HttpHeaderResponse>(this.endpoints.UPDATE_CONTENT_MODULES_BY_ID.replace('${id}', id.toString()), body, { headers: this.HEADERS });
   }

   deleteContentByID(id: number): Observable<HttpHeaderResponse> {
      return this.http.delete<HttpHeaderResponse>(this.endpoints.DELETE_CONTENT_BY_ID.replace('${id}', id.toString()));
   }

   getContentBySubjects(id: number, subjects: Module[]): Observable<ContentWrapper[]> {
      let body: string = JSON.stringify(subjects);
      return this.http.post<ContentWrapper[]>(this.endpoints.GET_CONTENT_BY_SUBJECTS.replace('${id}', id.toString()), body, { headers: this.HEADERS });
   }

   filterContent(id: number, contentWrapper: ContentWrapper): Observable<ContentWrapper[]> {
      let body: string = JSON.stringify(contentWrapper);
      return this.http.post<ContentWrapper[]>(this.endpoints.FILTER_CONTENT.replace('${id}', id.toString()), body, { headers: this.HEADERS });
   }

   // filterContentByTitle(id: number, contentWrapper: ContentWrapper): Observable<ContentWrapper[]> {
   //    let body: string = JSON.stringify(contentWrapper);
   //    return this.http.post<ContentWrapper[]>(this.endpoints.FILTER_CONTENT_BY_TITLE.replace('${id}', id.toString()), body, { headers: this.HEADERS });
   // }

   // filterContentByFormat(id: number, contentWrapper: ContentWrapper): Observable<ContentWrapper[]> {
   //    let body: string = JSON.stringify(contentWrapper);
   //    return this.http.post<ContentWrapper[]>(this.endpoints.FILTER_CONTENT_BY_FORMAT.replace('${id}', id.toString()), body, { headers: this.HEADERS });
   // }

   // filterContentByModules(id: number, contentWrapper: ContentWrapper): Observable<ContentWrapper[]> {
   //    let body: string = JSON.stringify(contentWrapper);
   //    return this.http.post<ContentWrapper[]>(this.endpoints.FILTER_CONTENT_BY_SUBJECTS.replace('${id}', id.toString()), body, { headers: this.HEADERS });
   // }
}
