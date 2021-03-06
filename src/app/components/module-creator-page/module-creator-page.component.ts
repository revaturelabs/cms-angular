import { Component, OnInit, ViewChild } from '@angular/core';
import { Module } from 'src/app/models/Module';
import { ModuleStoreService } from 'src/app/services/module-store.service';
import { ModuleFetcherService } from 'src/app/services/module-fetcher.service';
import { ToastrService } from 'ngx-toastr';
import { ITreeOptions, TreeComponent, IActionMapping, TREE_ACTIONS, TreeModel, TreeNode } from 'angular-tree-component';
import { Router } from '@angular/router';


/**
 * Description - Typescript component for module creator page
 */
@Component({
    selector: 'app-module-creator-page',
    templateUrl: './module-creator-page.component.html',
    styleUrls: ['./module-creator-page.component.css']
})
export class ModuleCreatorPageComponent implements OnInit {
    [x: string]: any;

    /**
     * Tag name/subject. This will be used for the actual storing of a module.
     */
    subject: string = "";

    /**
     * Checks to see if a spinner is required to be displayed if module submission is in progress.
     * This will be tied directly to the submit() function and triggered as such.
     */
    isSubmitting: boolean = false;

    nodes: any[] = this.ms.nodes;
    tempChildren: Module[] = [];
    /**
     * Constructor for Module Crator
     * @param mf; Grabs links/tag, specific to Modules. 
     * @param toastr; Uses the ToastrService, this will be used to indicate whether there was an
     * error in input, or a success.
     */
    constructor(
        public ms: ModuleStoreService,
        private mf: ModuleFetcherService,
        private toastr: ToastrService,
        private router: Router
    ) { }

    ngOnInit() {
        this.ms.loadModules();
        this.tree.treeModel.update();
        this.tree.sizeChanged();
    }

    ngDoCheck() {
        if (this.nodes.length === 0) {
            this.nodes = this.ms.nodes;
            this.tree.treeModel.update();
            this.tree.sizeChanged();
        }
    }

    ngAfterViewInit() {
        this.tree.treeModel.update();
        this.tree.sizeChanged();
    }

    /**
     * checks if the input field in the Module Creator is filled in
     */

    validInput(): boolean {
        let cantBeNull = [this.subject];
        if (cantBeNull.includes(null) || cantBeNull.includes(undefined)) return false;
        if (this.subject.length == 0) return false;
        return true;
    }

    /**
     * This function makes the observable call by creating a module object with the inputted subject field
     * with HTTP GET from the services ModuleFetcherServce
     */
    submit() {
        // First isSubmitting is made true to start the spinner wheel. 
        this.isSubmitting = true;
        /* 
        To indicate whether or not something was input correctly, one tests whether or not this.subject, 
        the two-way databinded element, is an empty string, null, or undefined; i.e. no valid input was
        given. 
        */
        if (['', null, undefined].includes(this.subject)) {
            this.toastr.error('Please fill in the input field!');
            this.resetVariables();
            return;
        }

        /*
        This is to check if the module already exists based on the subject.
        */
        if(this.ms.subjectNames.includes(this.subject)){
            this.toastr.error('This module already exists.');
            this.resetVariables();
            return;
        }

        let thisModule: Module = null;

        if (this.ms.subjectNameToModule)
            thisModule = this.ms.subjectNameToModule.get(this.subject);

        if (thisModule != null) {
            let parents: Module[] = [];

            for (let nodeID in this.tree.treeModel.activeNodeIds) {
                parents.push(this.ms.subjectIdToModule.get(parseInt(nodeID)));
            }

            thisModule = this.ms.addParents(thisModule, parents);
        }
        else {
            // Next create an instance of a Module  for storing, using the Module model.
            
            thisModule = new Module(
                null,
                this.subject,
                null,
                null,
                null,
                this.getModulesFromSubjects(Object.entries(this.tree.treeModel.activeNodeIds)),
                null
            );
        }

        /**
         * This sends the module data to the backend and then stores it if successful.
         */
        this.mf.createOrUpdateModule(thisModule).subscribe(
            (response) => {
                if (response != null) {
                    this.toastr.success('Successfully sent module.');
                    this.ms.loadModules().then( (list) => {
                        this.nodes = list;
                    });
                } else {
                    this.toastr.error('There was a problem creating a subject');
                }
                this.isSubmitting = false;
            },

            // Also if an empty response is given from valid request, than throws this error. 
            (response) => {
                this.toastr.error('Failed to create subject. Subject may already exist.');
                this.isSubmitting = false;
            },
            // Lastly, reset field.
            () => this.resetVariables()
        );
    }

    /**
     * Resets subject field by simply turning subject back into an empty string and making
     * isSubmitting false.
     */
    resetVariables() {
        this.subject = "";
        this.isSubmitting = false;
    }

    // Creates the view for the tree component
    @ViewChild(TreeComponent, null)
    public tree: TreeComponent;

    // custom options for ITree that allows for nodes to be formatted like module
    options: ITreeOptions = {
        displayField: 'subject',
        childrenField: 'children',
        actionMapping,
        idField: 'id'
    }

    /**
     * Takes the tree of active node ids, 
     */
    getModulesFromSubjects(subjects: any): Module[] {
        let modules = [];
        subjects.forEach( (subject) => {
            if (subject[1])
                modules.push(this.ms.subjectIdToModule.get(parseInt(subject[0])));
        }, this);

        return modules;
    }
}
// Allows for mutliselect within ngTree
const actionMapping: IActionMapping = {
    mouse: {
        click: TREE_ACTIONS.TOGGLE_ACTIVE
    }
}

