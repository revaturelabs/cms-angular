import { Component, OnInit, Inject } from '@angular/core';
import { HttpHeaderResponse } from '@angular/common/http';
import { CurriculumFetcherService } from 'src/app/services/curriculum-fetcher.service';
import { CurriculumStoreService } from '../../services/curriculum-store.service';
import { Curriculum } from 'src/app/models/Curriculum';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { UtilService } from '../../services/util.service';

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

    openCreateCurriculumDialog() {

        const dialogRef = this.dialog.open(NewCurriculumDialog, {
            width: '400px',
            data: {name: this.curriculumName}
        });

        dialogRef.afterClosed().subscribe(result => {

            this.cs.loadCurricula();
        });
    }

    openDeleteCurriculumDialog(node: Curriculum) {

        const dialogRef = this.dialog.open(DeleteCurriculumDialog, {
            width: '400px',
            data: {node}
        });
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
    templateUrl: './new-curriculum-dialog.html',
    styleUrls: ['./curriculum-creator-page.component.css']
})
export class NewCurriculumDialog {

    constructor(public dialogRef: MatDialogRef<NewCurriculumDialog>,
                public toastr: ToastrService,
                public cfs: CurriculumFetcherService,
                public cs: CurriculumStoreService,
                @Inject(MAT_DIALOG_DATA) public data: {name: string}) {}

    isSubmitting: boolean = false;

    onNoClick(): void {

        this.data.name = ''
        this.dialogRef.close();
    }

    submit(){

        this.isSubmitting = true;
        
        /* 
        To indicate whether or not something was input correctly, one tests whether or not this.subject, 
        the two-way databinded element, is an empty string, null, or undefined; i.e. no valid input was
        given. 
        */

        if (['', null, undefined].includes(this.data.name)) {
            this.toastr.error('Please fill in the input field!');
            this.isSubmitting = false;
            return;
        }

        //Execute service and persist object
        this.cfs.createCurriculum(new Curriculum(null, this.data.name, null)).subscribe(

            (resp) => {

                if (resp != null) {

                    this.toastr.info("Curriculum successfully made");
                    this.cs.nodes.push(resp);
                    this.cs.idToCurriculum.set(resp.id, resp);
                    this.isSubmitting = false;
                    this.data.name = '';

                } else {

                    this.toastr.error("Failed to communicate with the server")
                }
            },

            (error) => {

                this.toastr.error("Failed to communicate with the server")
            }
        );
    }

}

@Component({
    selector: 'delete-curriculum-dialog',
    templateUrl: './delete-curriculum-dialog.html',
    styleUrls: ['./curriculum-creator-page.component.css']
})
export class DeleteCurriculumDialog {

    constructor(public dialogRef: MatDialogRef<NewCurriculumDialog>,
                public toastr: ToastrService,
                public cfs: CurriculumFetcherService,
                public cs: CurriculumStoreService,
                public util: UtilService,
                @Inject(MAT_DIALOG_DATA) public data: {node: Curriculum}) {}

    isDeleting: boolean = false;

    onNoClick(): void {

        this.dialogRef.close();
    }

    delete() {

        this.isDeleting = true;
        this.cfs.deleteCurriculumById(this.data.node).subscribe(

            (resp) => {

                this.cs.nodes = this.cs.nodes.filter(

                    (node: Curriculum) => {

                        return node.id !== this.data.node.id;
                    }
                );

                this.toastr.info(`${this.data.node.name} deleted`);
            },

            (error) => {

                this.toastr.error('Failed to communicate with the server')
            }
        );
    }

}