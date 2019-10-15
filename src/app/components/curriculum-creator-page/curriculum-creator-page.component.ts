import { Component, OnInit, Inject } from '@angular/core';
import { HttpHeaderResponse } from '@angular/common/http';
import { CurriculumFetcherService } from 'src/app/services/curriculum-fetcher.service';
import { CurriculumStoreService } from '../../services/curriculum-store.service';
import { Curriculum } from 'src/app/models/Curriculum';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

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

    editable: Map<number, boolean> = new Map<number, boolean>();
    newName: string;

    constructor(private router: Router,
                private cfs: CurriculumFetcherService,
                public cs: CurriculumStoreService,
                private toastr: ToastrService,
                public dialog: MatDialog) { }

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

    openCreateCurriculumDialog() {

        const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
          width: '250px',
          data: {name: this.name, animal: this.animal}
        });

        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
          this.animal = result;
        });
    }

    //Set variables back to original value
    resetVariables() {
        this.curriculumName = '';
        this.isSubmitting = false;
    }

    getCurriculumDetails(id: number) {

        if (this.activeCurriculum === undefined || this.activeCurriculum.id !== id) {
            this.cs.loadCurriculumDetails(id).then((cur) => this.activeCurriculum = cur);
        }
    }

    setEditable(cur: Curriculum) {

        for (const key of this.editable.keys()) {

            this.editable.set(key, false);
        }

        this.editable.set(cur.id, true);

        const ele = document.getElementById(`curriculum-input-${cur.id}`) as HTMLInputElement;
        ele.focus();
        ele.select();
    }

    updateCurriculum(cur: Curriculum) {

        this.editable.set(cur.id, false);
        this.cfs.updateCurriculumById(cur).subscribe(

            (resp) => {

                if (resp !== null) {

                    this.toastr.info("Changes saved");

                } else {

                    this.toastr.error("Failed to communicate to the server");
                }
            },
            (error) => {

                this.toastr.error("Failed to communicate to the server");
            }
        );
    }
}


@Component({
    selector: 'new-curriculum-dialog',
    templateUrl: 'new-curriculum-dialog.html',
})
export class NewCurriculumDialog {

    constructor(public dialogRef: MatDialogRef<NewCurriculumDialog>,
                @Inject(MAT_DIALOG_DATA) public name: string) {}

    onNoClick(): void {
        this.dialogRef.close();
    }

}