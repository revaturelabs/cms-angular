import { Injectable } from '@angular/core';
import { EndpointsService } from '../constants/endpoints.service';
import { Curriculum } from '../models/Curriculum';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CurriculumFetcherService {

  /** HTTP Headers to be used in HTTP requests */
  private readonly HEADERS = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http:HttpClient,
              private endpoints:EndpointsService) { }

//Get all current curricula
getCurricula(): Observable<Curriculum[]> {
  return this.http.get(this.endpoints.GET_ALL_CURRICULA).pipe(map(resp => resp as Curriculum[]));
}

//Create Curriculum
createCurriculum(curriculum: Curriculum): Observable<HttpHeaderResponse> {
  let body: string = JSON.stringify(curriculum);
  //*Need to add check to make sure curriculum mdoes not exist
      return this.http.post<HttpHeaderResponse>(this.endpoints.CREATE_NEW_CURRICULUM, curriculum, { headers: this.HEADERS });
}

//Get all current curricula
getCurriculumModules(id:number): Observable<Curriculum[]> {
  return this.http.get(this.endpoints.GET_CURRICULUM_MODULES.replace('${id}',id.toString())).pipe(map(resp => resp as Curriculum[]));
}

  
}
