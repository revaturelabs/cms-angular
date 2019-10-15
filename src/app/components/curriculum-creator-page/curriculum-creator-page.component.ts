import { Component, OnInit, Inject } from '@angular/core';
import { HttpHeaderResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { CurriculumFetcherService } from 'src/app/services/curriculum-fetcher.service';
import { CurriculumStoreService } from '../../services/curriculum-store.service';
import { ModuleFetcherService } from '../../services/module-fetcher.service';
import { ModuleStoreService } from '../../services/module-store.service';
import { UtilService } from '../../services/util.service';

import { Curriculum } from 'src/app/models/Curriculum';
import { Module } from '../../models/Module';
import { CurrModule } from '../../models/curr-module';

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

    moduleActive: Map<number, number> = new Map<number, number>();

    constructor(private router: Router,
                private cfs: CurriculumFetcherService,
                public cs: CurriculumStoreService,
                private toastr: ToastrService,
                public util: UtilService,
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

    openAddModulesDialog(node: Curriculum) {

        const dialogRef = this.dialog.open(
            AddModuleDialog,
            {
                width: '800px',
                data: {node: this.activeCurriculum}
            }
        );
    }

    getCurriculumDetails(id: number) {

        if (this.activeCurriculum === undefined || this.activeCurriculum.id !== id) {

            this.cs.loadCurriculumDetails(id).then(

                (node: Curriculum) => {

                    if (node.currModules !== null) {

                        this.normalizeLinkPriority(node.currModules);

                    } else {

                        node.currModules = [];
                    }

                    this.activeCurriculum = node;
                }

            );
        }
    }

    normalizeLinkPriority(nodes: CurrModule[]) {

        let changed = false;
        nodes.sort(this.util.sortCurrModulesById);

        for (let i = 0 ; i < nodes.length ; i++) {

            if (nodes[i].priority !== i) {

                nodes[i].priority = i;
                changed = true;
            }
        }

        if (changed) {

            this.cfs.postSetOfCurrModules(nodes).subscribe(

                (resp) => {

                    if (resp !== null) {

                        this.toastr.info('Reindexed Links');


                    } else {

                        this.toastr.error('Failed to communicate with the server');
                    }
                },

                (error) => {

                    this.toastr.error('Failed to communicate with the server');
                }
            );
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

    shiftLinkPriority(node: Curriculum, shift: number): void {

        if (node.currModules.length === 0) {

            return;
        }

        const numLinks = node.currModules.length;
        const curIdx = this.moduleActive.get(node.id);

        if (curIdx + shift >= numLinks || curIdx + shift <= -1) {

            return;
        }

        node.currModules[curIdx].priority = curIdx + shift;
        node.currModules[curIdx + shift].priority = curIdx;

        node.currModules.sort(this.util.sortCurrModulesByPriority);
        this.moduleActive.set(node.id, curIdx + shift);

        this.cfs.postSetOfCurrModules(node.currModules).subscribe(

            (resp) => {

                if (resp === null) {

                    this.toastr.error('Failed to communicate with the server');
                }
            },

            (error) => {

                this.toastr.error('Failed to communicate with the server');
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

@Component({
    selector: 'add-module-dialog',
    templateUrl: './add-module-dialog.html',
    styleUrls: ['./curriculum-creator-page.component.css']
})
export class AddModuleDialog implements OnInit {

    constructor(public dialogRef: MatDialogRef<NewCurriculumDialog>,
                public toastr: ToastrService,
                public cfs: CurriculumFetcherService,
                public cs: CurriculumStoreService,
                public util: UtilService,
                public ms: ModuleStoreService,
                @Inject(MAT_DIALOG_DATA) public data: {node: Curriculum}) {}

    isAdding: boolean = false;
    isFetching: boolean = true;
    modules: Module[] = [];

    searchConstraint: string = ''

    checked: Map<number, boolean>;

    ngOnInit() {

        this.ms.loadModules();
        this.checked = new Map<number, boolean>();
    }

    onNoClick(): void {

        this.searchConstraint = '';
        this.dialogRef.close();
    }

    addModules() {

        this.isAdding = true;

        let links: CurrModule[] = [];

        for (const key of this.checked.keys()) {

            if (this.checked.get(key) === true) {

                links.push(new CurrModule(null, -1, this.data.node.id, this.util.findModuleById(key, this.ms.nodes)));
            }
        }

        this.cfs.postSetOfCurrModules(links).subscribe(

            (resp) => {

                if (resp !== null) {

                    this.isAdding = false;
                    
                    for (const link of links) {

                        this.data.node.currModules.push(link);
                    }

                    this.toastr.info(`Added ${links.length} module${links.length === 1 ? '' : 's'} to ${this.data.node.name}`);

                    this.onNoClick();

                } else {
                    this.isAdding = false;
                    this.toastr.error('Failed to communicate with the server');
                }
            },

            (error) => {

                this.isAdding = false;
                this.toastr.error('Failed to communicate with the server');
            }
        );
    }

    check(node: Module, event) {

        event.preventDefault();

        this.checked.set(node.id, this.checked.get(node.id) === undefined ? true : !this.checked.get(node.id));
    }

}
