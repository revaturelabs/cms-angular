import { Injectable } from '@angular/core';
import { EndpointsService } from '../constants/endpoints.service';
import { Curriculum } from '../models/Curriculum';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Cacheable, CacheBuster, globalCacheBusterNotifier } from 'ngx-cacheable';
import { HttpClient, HttpHeaderResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root'
})

export class CurriculumFetcherService {

    /** HTTP Headers to be used in HTTP requests */
    private readonly HEADERS = new HttpHeaders({ 'Content-Type': 'application/json' });

    isLoading: boolean = true;

    constructor(private http:HttpClient,
                private endpoints:EndpointsService) { }

    //Get all current curricula
    @Cacheable()
    getAllCurricula(): Observable<Curriculum[]> {

        return this.http.get(this.endpoints.GET_ALL_CURRICULA).pipe(map(resp => resp as Curriculum[]));
    }

    //Create Curriculum
    createCurriculum(curriculum: Curriculum): Observable<Curriculum> {

        let body: string = JSON.stringify(curriculum);
        //*Need to add check to make sure curriculum mdoes not exist
        return this.http.post<Curriculum>(this.endpoints.CREATE_NEW_CURRICULUM, curriculum, { headers: this.HEADERS });
    }

    //Get all current curricula
    @Cacheable()
    getCurriculumById(id: number): Observable<Curriculum> {

        return this.http.get<Curriculum>(this.endpoints.GET_CURRICULUM_BY_ID.replace('${id}',id.toString()));
    }

    updateCurriculumById(cur: Curriculum): Observable<HttpHeaderResponse> {

        const body: string = JSON.stringify(cur);

        return this.http.put<HttpHeaderResponse>(
            this.endpoints.UPDATE_CURRICULUM_BY_ID.replace('${id}', cur.id.toString()), body, { headers: this.HEADERS }
        );
    }

    deleteCurriculumById(cur: Curriculum): Observable<HttpHeaderResponse> {

        return this.http.delete<HttpHeaderResponse>(
            this.endpoints.DELETE_CURRICULUM_BY_ID.replace('${id}', cur.id.toString())
        );
    }
}
