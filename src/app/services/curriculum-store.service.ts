import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EndpointsService } from '../constants/endpoints.service';
import { CurriculumFetcherService } from './curriculum-fetcher.service';
import { ToastrService } from 'ngx-toastr';
import { UtilService } from '../services/util.service';

import { Curriculum } from '../models/Curriculum';
import { CurrModule } from '../models/curr-module';

@Injectable({
  providedIn: 'root'
})
export class CurriculumStoreService {

    nodes: Curriculum[];
    allCurricula: Curriculum[];
    idToCurriculum: Map<number, Curriculum>;

    curriculum: Curriculum;

    loading: boolean = true;
    loadingText: string;
    loadingCurriculum: boolean = true;

    constructor(private http: HttpClient,
                private endpoints: EndpointsService,
                private cfs: CurriculumFetcherService,
                private toastr: ToastrService,
                private util: UtilService) { }

  
    async loadCurricula(): Promise<Curriculum[]> {

        this.loading = true;
        this.loadingText = 'Loading Curricula...';
        this.nodes = [];
        this.idToCurriculum = new Map<number, Curriculum>();
        this.allCurricula = [];

        return new Promise(

            (resolve) => {

                this.cfs.getAllCurricula().subscribe(

                    (resp) => {

                        if (resp !== null) {

                            this.nodes = resp;
                            this.loading = false;

                        } else {

                            this.toastr.error('Failed to retrieve Curricula');
                            this.loading = false;
                        }
                    },

                    (error) => {

                        this.toastr.error('Failed to retrieve Curricula');
                        this.loading = false;
                    },

                    () => {

                        this.idToCurriculum = new Map<number, Curriculum>();

                        for (const node of this.nodes) {

                            this.idToCurriculum.set(node.id, node);
                        }

                        this.nodes.sort(this.util.sortCurriculumById);
                        resolve(this.nodes);
                    }
                );
            }
        );
    }

    async loadCurriculumDetails(id: number): Promise<Curriculum> {

        this.loadingCurriculum = true;
        this.loadingText = 'Loading Curriculum...';

        return new Promise(

            (resolve) => {

                this.cfs.getCurriculumById(id).subscribe(

                    (resp) => { 

                        if (resp !== null) {

                            this.curriculum = resp;
                            this.loadingCurriculum = false;

                        } else {

                            this.toastr.error('Failed to retrieve specified Curriculum');
                            this.loadingCurriculum = false;
                        }
                    },

                    (error) => {

                        this.toastr.error('Failed to retrieve specified Curriculum');
                        this.loadingCurriculum = false;
                    },

                    () => {

                        resolve(this.curriculum);
                    }
                );
            }
        );
    }
}
