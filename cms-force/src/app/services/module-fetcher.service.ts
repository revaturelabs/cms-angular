import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Module } from '../models/Module';
import { HttpClient } from '@angular/common/http';
import { EndpointsService } from '../constants/endpoints.service';

@Injectable({
   providedIn: 'root'
})
export class ModuleFetcherService {

   constructor(
      private http: HttpClient,
      private endpoints: EndpointsService) {
   }

   getAllModules(): Observable<Module[]> {
      return this.http.get<Module[]>(this.endpoints.GET_ALL_MODULES);
   }

   getModuleByID(id: number): Observable<Module> {
      return this.http.get<Module>(this.endpoints.GET_MODULE_BY_ID.replace('${id}', id.toString()));
   }

   getAllFakeModules(url: string): Observable<Module[]> {
      return this.http.get<Module[]>(url);
   }
}
