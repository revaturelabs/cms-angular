import { Component, OnInit } from '@angular/core';
import { HttpHeaderResponse } from '@angular/common/http';
import { CurriculumFetcherService } from 'src/app/services/curriculum-fetcher.service';
import { CurriculumStoreService } from '../../services/curriculum-store.service';
import { Curriculum } from 'src/app/models/Curriculum';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
    selector: 'app-curriculum-creator-page',
    templateUrl: './curriculum-creator-page.component.html',
    styleUrls: ['./curriculum-creator-page.component.css']
})
export class CurriculumCreatorPageComponent implements OnInit {

    curricula: Curriculum[];
    curriculumName: string;
    isSubmitting: boolean;
    isLoading: boolean = true;

    searchConstraint: string;

    activeCurriculum: Curriculum;

    constructor(private router: Router,
                private cfs: CurriculumFetcherService,
                public cs: CurriculumStoreService,
                private toastr: ToastrService) { }

    ngOnInit() {

        this.cs.loadCurricula();
    }

    submit(){

        // First isSubmitting is made true to start the spinner wheel. 
        this.isSubmitting = true;
        
        /* 
        To indicate whether or not something was input correctly, one tests whether or not this.subject, 
        the two-way databinded element, is an empty string, null, or undefined; i.e. no valid input was
        given. 
        */

        if (['', null, undefined].includes(this.curriculumName)) {
            this.toastr.error('Please fill in the input field!');
            this.resetVariables();
            return;
        }

        //Execute service and persist object
        this.cfs.createCurriculum(new Curriculum(null, this.curriculumName, null)).subscribe(

            (resp) => {

                if (resp != null) {
                    
                    this.cs.loadCurricula();
                }
            }
        );
    }

    //Set variables back to original value
    resetVariables() {
        this.curriculumName = '';
        this.isSubmitting = false;
    }

    getCurriculumDetails(id: number) {

        if (this.activeCurriculum === undefined || this.activeCurriculum.id !== id) {

            console.log('dsa')
            this.cs.loadCurriculumDetails(id).then((cur) => this.activeCurriculum = cur);
        }
    }
}
