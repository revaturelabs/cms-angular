/** Angular Imports */
import { Component, OnInit, Inject, Optional } from '@angular/core';
import { HttpHeaderResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

/** Service Imports */
import { CurriculumFetcherService } from '../../services/curriculum-fetcher.service';
import { CurriculumStoreService } from '../../services/curriculum-store.service';
import { ModuleFetcherService } from '../../services/module-fetcher.service';
import { ModuleStoreService } from '../../services/module-store.service';
import { SortSearchService } from '../../services/sort-search.service';

/** Model Imports */
import { Curriculum } from 'src/app/models/Curriculum';
import { Module } from '../../models/Module';
import { CurriculumModule } from '../../models/CurriculumModule';
import { link } from 'fs';

@Component({
    selector: 'app-curriculum-creator-page',
    templateUrl: './curriculum-creator-page.component.html',
    styleUrls: ['./curriculum-creator-page.component.css']
})

/** Page to display curricula and their contents */
export class CurriculumCreatorPageComponent implements OnInit {

    /** Active Curriculum since we can only have one at any given time */
    activeCurriculum: Curriculum;

    /** Map of Curriculum Ids to if their names are currently editable */
    editable: Map<number, boolean> = new Map<number, boolean>();

    /** Placeholder for renaming a curriculum */
    newName: string;

    /** Determine which module is currently highlighted within any given curriculum */
    moduleActive: Map<number, number> = new Map<number, number>();

    constructor(private cfs: CurriculumFetcherService,
                public cs: CurriculumStoreService,
                private toastr: ToastrService,
                public ss: SortSearchService,
                public dialog: MatDialog) { }

    /** Tell the service where we host the curricula to fetch them form the DB */
    ngOnInit() {

        this.cs.loadCurricula();
        this.activeCurriculum = undefined;
        this.editable = new Map<number, boolean>();
        this.newName = '';
        this.moduleActive = new Map<number, number>();
    }

    /**
     * Launches the Modal to Create a Curriculum
     * When the Modal is closed, we reload all of the Curricula from the DB
     */
    openCreateCurriculumDialog() {

        const dialogRef = this.dialog.open(NewCurriculumDialog, {
            width: '400px',
            data: {name: ''}
        });
    }

    /**
     * Launches the Modal to Delete a Curriculum
     * The list of nodes is updated in the modal
     * @param node - The Curriculum that we want to delete
     */
    openDeleteCurriculumDialog(node: Curriculum) {

        const dialogRef = this.dialog.open(DeleteCurriculumDialog, {
            width: '400px',
            data: {node}
        });
    }

    /**
     * Launches the Modal to append module(s) to the Curriculum
     * Injects the Curriculum that is currently open into the modal
     */
    openAddModulesDialog() {

        const dialogRef = this.dialog.open(
            AddModuleDialog,
            {
                width: '800px',
                data: {node: this.activeCurriculum}
            }
        );

        dialogRef.afterClosed().subscribe(

            () => {

                this.normalizeLinkPriority(this.activeCurriculum.currModules);
            }
        );
    }

    /**
     * Since the JSON that we get back doesn't directly contain the curriculum links, we have
     * to make a call to our DB to get the specifics of a given Curriculum
     * If the complete object has a null list of links, we initial it, otherwise, we retrieve it
     * and normalize the priorities before assigning the node as the current node
     * @param - id - ID of the Curriculum that we want to retrieve
     */
    getCurriculumDetails(id: number) {

        if (this.activeCurriculum === undefined || this.activeCurriculum.id !== id) {

            this.cs.loadCurriculumDetails(id).then(

                (node: Curriculum) => {

                    if (node !== null) {

                        if (node.currModules !== null && node.currModules.length !== 0) {

                            this.normalizeLinkPriority(node.currModules);
                            this.moduleActive.set(node.id, 0);

                        } else {

                            node.currModules = [];
                            this.moduleActive.set(node.id, -1);
                        }

                        this.activeCurriculum = node;

                    } else {

                        this.toastr.error('Failed to retrieve the Curriculum with that ID');
                    }
                },

                (error: HttpHeaderResponse) => {

                    this.toastr.error('Failed to communicate with the server');
                }
            );
        }
    }

    /**
     * Basically the same thing as the normalize Links from ModuleIndex that I made
     * can probably combine somewhere to remove duplications
     * Of a given list of CurriculumModules, we expect their priorities when sorted to be a
     * smooth, complete list from [0, n). If this is not the case, the we reassign the priorities
     * of the module in question. Also responsible for removing -1 priority and turning them into usable values
     * Should be called after Deletion, Insertion of modules and when opening a Curriculum
     * @param - nodes - THe list of CurriculumModules that we want to normalize
     */
    normalizeLinkPriority(nodes: CurriculumModule[]) {

        let changed = false;
        nodes.sort(this.ss.sortCurriculumModulesByPriority);

        for (let i = 0 ; i < nodes.length ; i++) {

            if (nodes[i].priority !== i) {

                nodes[i].priority = i;
                changed = true;
            }
        }

        if (changed) {

            this.cfs.postSetOfCurriculumModules(nodes).subscribe(

                (resp: CurriculumModule[]) => {

                    if (resp !== null) {

                        this.toastr.info('Reindexed Links');


                    } else {

                        this.toastr.error('Normalization Failed');
                    }
                },

                (error: HttpHeaderResponse) => {

                    this.toastr.error('Failed to communicate with the server');
                }
            );
        }
    }

    /**
     * Toggles the state of the input that corresponds to the Curriculum's name
     * We only want to have one editable name at a time for fairly obvious reasons
     * Additionally, the input auto saves when we lose focus of the input, so the editable
     * modification at the start is mostly for safety
     * @param - cur - The Curriculum that we want to rename
     */
    setEditable(cur: Curriculum) {

        for (const key of this.editable.keys()) {

            this.editable.set(key, false);
        }

        this.editable.set(cur.id, true);

        const ele = document.getElementById(`curriculum-input-${cur.id}`) as HTMLInputElement;
        ele.focus();
        ele.select();
    }

    /**
     * Changes the active module associated with the curriculum
     */
    setActiveModule(idx: number) {

        this.moduleActive.set(this.activeCurriculum.id, idx);
    }

    /**
     * Deletes a CurriculumModule from the Curriculum
     */
    removeModule(link: CurriculumModule) {

        const temp = this.activeCurriculum.currModules.filter(

            (node: CurriculumModule) => {

                return node.id !== link.id;
            }
        );

        this.cfs.deleteCurriculumModuleById(link).subscribe(

            (resp: HttpHeaderResponse) => {

                this.activeCurriculum.currModules = temp;
            },

            (error: HttpHeaderResponse) => {

                this.toastr.error("There was an error deleting the link");
            }
        );
    }

    /**
     * Updates the Curriculum outside of the modals
     * Really only used for renaming since thats the only update we really do outside of the modals
     * @param - cur - The Curriculum that we want to persist to the DB
     */
    updateCurriculum(cur: Curriculum) {

        this.editable.set(cur.id, false);
        this.cfs.updateCurriculumById(cur).subscribe(

            (resp: HttpHeaderResponse) => {

                if (resp !== null) {

                    this.toastr.info("Changes saved");

                } else {

                    this.toastr.error("Could not update the Curriculum");
                }
            },
            (error: HttpHeaderResponse) => {

                this.toastr.error("Failed to communicate to the server");
            }
        );
    }

    /**
     * Same thing as the function in ModuleIndex basically.
     * Swaps the priority of the currently active module within a Curriculum and the one
     * a discrete shift away from it. This is only realistically going to shift one up or down
     * so shift is going to be 1 or -1. Implemented if the user doesn't want to use drag and drop
     * @param - node - The Curriculum that contains the modules we want to reorder
     * @param - shift - Realistically going to be -1 or 1, denote a swap with the previous or next element
     */
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

        node.currModules.sort(this.ss.sortCurriculumModulesByPriority);
        this.moduleActive.set(node.id, curIdx + shift);

        this.cfs.postSetOfCurriculumModules(node.currModules).subscribe(

            (resp: CurriculumModule[]) => {

                if (resp === null) {

                    this.toastr.error('Failed to communicate with the server');
                }
            },

            (error: HttpHeaderResponse) => {

                this.toastr.error('Failed to communicate with the server');
            }
        );
    }

    /**
     * Drag and Drop priority reordering for Curriculum Module Links
     * Determines how much it needs to iterate and in what direction before incrementing
     * or decrementing the priorities. Requires a sorted list to function in terms of priority
     * @param - event - CDKDragDrop event that contains start and end indexes
     * @param - node - The Curriculum that contains the links to reorder
     */
    onDrop(event, node: Curriculum): void {

        const targetIdx: number = event.currentIndex
        const baseIdx: number = event.previousIndex;

        node.currModules.sort(this.ss.sortCurriculumModulesByPriority);
        node.currModules[baseIdx].priority = targetIdx;

        if (targetIdx < baseIdx) {

            for (let i = targetIdx ; i < baseIdx ; i++) {

                node.currModules[i].priority++;
            }

        } else {

            for (let i = baseIdx + 1 ; i <= targetIdx ; i++) {

                node.currModules[i].priority--;
            }
        }

        node.currModules.sort(this.ss.sortCurriculumModulesByPriority);

        this.moduleActive.set(node.id, targetIdx);

        this.cfs.postSetOfCurriculumModules(node.currModules).subscribe(

            (resp: CurriculumModule[]) => {

                if (resp === null) {

                    this.toastr.error('Failed to reorder Modules');
                }
            },

            (error: HttpHeaderResponse) => {

                this.toastr.error('Failed to communicate with server')
            }
        );
    }
}

/**
 * Component Dedicated to creating new Curricula
 * New Curricula are persisted as they are created within the Modal
 * Allows for multiple curricula to be made before closing
 */
@Component({
    selector: 'new-curriculum-dialog',
    templateUrl: './new-curriculum-dialog.html',
    styleUrls: ['./curriculum-creator-page.component.css']
})
export class NewCurriculumDialog {

    constructor( public dialogRef: MatDialogRef<NewCurriculumDialog>,
                public toastr: ToastrService,
                public cfs: CurriculumFetcherService,
                public cs: CurriculumStoreService,
                @Inject(MAT_DIALOG_DATA) public data: {name: string}) {}

    /** Spinny Wheel functionality as well as locking submit button */
    isSubmitting: boolean = false;

    /** Exit Function */
    onNoClick(): void {

        this.data.name = ''
        this.dialogRef.close();
    }

    /** 
     * Attempts to persist the newly created Curriculum to the backend
     */
    submit(){

        this.isSubmitting = true;

        if (['', null, undefined].includes(this.data.name)) {
            this.toastr.error('Please fill in the input field!');
            this.isSubmitting = false;
            return;
        }

        /** Required fields were all filled to specifiation */
        this.cfs.createCurriculum(new Curriculum(null, this.data.name, null)).subscribe(

            (resp) => {

                if (resp != null) {

                    this.toastr.info("Curriculum successfully made");
                    this.cs.nodes.push(resp);
                    this.cs.idToCurriculum.set(resp.id, resp);
                    this.isSubmitting = false;
                    this.data.name = '';

                } else {

                    this.toastr.error("There was an error creating the Curriculum")
                }
            },

            (error) => {

                this.toastr.error("Failed to communicate with the server")
            }
        );
    }

}

/**
 * Modal Component dedicated to deleting a curriculum
 * Auto closes upon a successful deletion, otherwise, allows the user to try again
 * Change is persisted after a success is received from the sever
 */
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
                public ss: SortSearchService,
                @Inject(MAT_DIALOG_DATA) public data: {node: Curriculum}) {}

    /** Spinny wheel functionality as well as delete button lock */
    isDeleting: boolean = false;

    /** Exit Function */
    onNoClick(): void {

        this.dialogRef.close();
    }

    /** Attempts to Delete the Requested Curriculum */
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
                this.onNoClick();
            },

            (error) => {

                this.toastr.error('Failed to communicate with the server')
                this.isDeleting = false;
            }
        );
    }

}

/**
 * Modal Component dedicated to adding preexisting modules to Curriculum
 * Modules are retrieved upon window launch and filtered according to if they currently exist in the curriculum
 * A list of desired additions is created and attempts to be persisted in the DB
 */
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
                public ss: SortSearchService,
                public ms: ModuleStoreService,
                @Inject(MAT_DIALOG_DATA) public data: {node: Curriculum}) {}

    /** Spinny wheel functionality and lock of Add Button */
    isAdding: boolean = false;

    /** Spinny wheel for module retrieval */
    isFetching: boolean = true;

    /** Desired modules to be added - Unsorted*/
    modules: Module[] = [];

    /** Map relating the ID of a module to if a user wants to add it */
    checked: Map<number, boolean>;

    /** Retrieve all modules and reinitialize the map upon window opening */
    ngOnInit() {

        this.ms.loadModules();
        this.checked = new Map<number, boolean>();
    }

    /** Exit Function */
    onNoClick(): void {
        
        this.dialogRef.close();
    }

    /** Attempts to persist CurriculumModules to the database */
    addModules() {

        this.isAdding = true;

        let links: CurriculumModule[] = [];

        for (const key of this.checked.keys()) {

            if (this.checked.get(key) === true) {

                links.push(new CurriculumModule(null, -1, this.data.node.id, this.ss.findModuleById(key, this.ms.nodes)));
            }
        }

        if(links.length != 0){
            this.cfs.postSetOfCurriculumModules(links).subscribe(

            (resp: CurriculumModule[]) => {

                if (resp !== null) {

                    this.isAdding = false;
                    
                    for (const link of resp) {

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
    }

    /** Overwriting default behavior for checkboxes */
    check(node: Module, event) {

        event.preventDefault();

        this.checked.set(node.id, this.checked.get(node.id) === undefined ? true : !this.checked.get(node.id));
    }

}
