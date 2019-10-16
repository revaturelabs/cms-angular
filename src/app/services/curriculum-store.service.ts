import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EndpointsService } from '../constants/endpoints.service';

@Injectable({
  providedIn: 'root'
})
export class CurriculumStoreService {

  constructor(private http:HttpClient,
              private endpoints:EndpointsService) { }

  
  
}
