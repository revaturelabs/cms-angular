import { Component, OnInit, ComponentFactoryResolver} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { globalCacheBusterNotifier } from 'ngx-cacheable';
import { HttpHeaderResponse } from '@angular/common/http';

import { ModuleStoreService } from 'src/app/services/module-store.service';
import { ModuleFetcherService } from 'src/app/services/module-fetcher.service';
import { ContentFetcherService } from 'src/app/services/content-fetcher.service';
import { SortSearchService } from '../../services/sort-search.service';

import { Link } from '../../models/Link';
import { Module } from 'src/app/models/Module';
import { Content } from 'src/app/models/Content';
import { Filter } from 'src/app/models/Filter';

/** Typescript Component for Module Index Page */
@Component({
    selector: 'app-module-index-page',
    templateUrl: './module-index-page.component.html',
    styleUrls: ['./module-index-page.component.css']
})

export class ModuleIndexPageComponent implements OnInit {

    /** Module whose contents are currently visible */
    activeModule: Module = null;

    /**
     * Map of children visibility status of a Module
     * You can probably combine this with the above map
     * into a number map to determine what should be displayed
     */
    childrenVisible: Map<Module, boolean> = new Map<Module, boolean>();

    /** Map of Active Link index for a given module */
    contentActive: Map<Module, number> = new Map<Module, number>();

    /** Map of Active Child index for a given module */
    childActive: Map<Module, number> = new Map<Module, number>();

    /** Variable that will reference selected Link for removal. */
    selLink: Link;

    /** Used to display a spinner when modules are loading. */
    isLoading = false;

    /** Deletion Method for Modules */
    selMethod: string = '1';

    /** Used to filter Modules by name with a pipe */
    searchConstraint: string;

    /**
     * Constructor for Module Index Component
     * @param cs - Fetches content
     * @param ms - Fetches tags
     * @param toastr - ???
     * @param mfs - Used to display stored nodes
     * @param ss - Sorts and Searches
     */
    constructor(
        public cs: ContentFetcherService,
        public ms: ModuleStoreService,
        private toastr: ToastrService,
        private mfs: ModuleFetcherService,
        private ss: SortSearchService
    ) { }

    /** On page initialization load the modules to list on the dropdown menu */
    ngOnInit() {

        this.ms.loadModules();
    }

    /**
     * Lists the available content for module input
     * @param module - module to expand
     */
    listContent(module: Module) {

        for (const key of this.childrenVisible.keys()) {

            if (key.id !== module.id) {
                this.childrenVisible.set(key, false);
            }
        }

        if (this.activeModule === null) {

            this.activeModule = module;

        } else {

            this.activeModule = this.activeModule.id === module.id ? null : module;
        }

        this.childrenVisible.set(module, false);

        this.contentActive.set(
            module,
            module.links.length === 0 ? -1 :
            this.contentActive.get(module) === undefined ? 0 : this.contentActive.get(module)
        );

        this.normalizePriority(module);
    }

    /**
     * Lists the content for module input or complete closes the node
     * @param module - Module to check for expansion
     * @param event  - Used to filter out double requests since this is a parent element event
     */
    listOrCloseContent(module: Module, event) {

        if (event) {

            const target = event.target || event.srcElement || event.currentTarget;
            const idAttr: string = target.attributes.id && (target.attributes.id.nodeValue || '');

            if (idAttr && !idAttr.includes('mat-expansion-panel')) {

                return;
            }
        }

        if ((this.activeModule !== null && this.activeModule.id === module.id) || this.childrenVisible.get(module)) {

            this.activeModule = null;
            this.childrenVisible.set(module, false);
            return;
        }

        this.listContent(module);
    }

    /**
     * Expands the children display option for the Node
     * @param module - Module to expand
     */
    listChildren(module: Module) {

        for (const key of this.childrenVisible.keys()) {

            if (key.id !== module.id) {

                this.childrenVisible.set(key, false);
            }
        }

        this.childrenVisible.set(module, !this.childrenVisible.get(module));
        this.activeModule = null;
        this.setActiveChild(module, 0);
        this.normalizePriority(this.activeModule);
    }

    /**
     * Send a request to remove the link between the selected Link and Module
     * If the response is a success, then we will delete the module link locally
     */
    removeContentFromModuleIndex() {

        globalCacheBusterNotifier.next();

        this.cs.removeLinkFromContent(this.selLink.id).subscribe(

            (resp) => {

                this.activeModule.links.splice(this.contentActive.get(this.activeModule), 1);
                this.contentActive.set(this.activeModule, this.activeModule.links.length === 0 ? -1 : 0);
                this.normalizePriority(this.activeModule);
            }
        );
    }
    /**
     * Assigns the link and module that will be used for link removal
     * @param link - the selected link
     * @param module - the module the selected link resides in
     */
    selectedLinkForRemoval(link: Link, module: Module) {

        this.selLink = link;
        this.activeModule = module;
    }

    /**
     * Assigns the module that will be used for module removal
     * @param module - module that will be writen as selected
     */
    selectedModuleForRemoval(module: Module) {
        this.activeModule = module;
    }

    /**
     * Sends a request to delete the module selected
     */
    removeModule() {

        switch (this.selMethod) {

            case '1':
                this.mfs.deleteModuleByID(this.activeModule.id).subscribe(() => this.ms.loadModules());
                break;
            case '2':
                this.mfs.deleteModuleWithSpecificContent(this.activeModule.id).subscribe(() => this.ms.loadModules());
                break;
            case '3':
                this.mfs.deleteModuleWithContent(this.activeModule.id).subscribe(() => this.ms.loadModules());
                break;
        }

        this.selMethod = '1';
    }

    /**
     * The ms.nodes variable doesn't actually contain all of the information about the nodes
     * Rather, it only contains full information about the first generation ancestor nodes
     * As such, this function is required - or atleast the service map - to access child nodes
     * @param module - The parent module. Will get the current active child and get the corresponding module
     */
    getChildModule(module: Module) {

        const ret: Module = this.ms.subjectIdToModule.get(module.children[this.childActive.get(module)].id);

        if (ret.links.length !== 0 && this.contentActive.get(ret) === undefined) {

            this.contentActive.set(ret, 0);
        }

        this.activeModule = ret;

        return ret;
    }

    /**
     * Bound to a onClick event regarding a particular Link
     * Maps the index of the link within the module to the module
     * Used to display active CSS class
     * @param module - key to the map
     * @param idx    - value to the map
     */
    setActiveContent(module: Module, idx: number) {

        this.contentActive.set(module, idx);
    }

    /**
     * Maps the index of the child module to the parent
     * Used to display information
     * @param module  - key to the map
     * @param idx     - value to the map
     */
    setActiveChild(module: Module, idx: number) {

        this.childActive.set(module, idx);
        this.childActive.set(this.ms.subjectIdToModule.get(module.children[idx].id), -1);
        this.activeModule = this.ms.subjectIdToModule.get(module.children[idx].id);

        this.normalizePriority(this.activeModule);
    }

    /**
     * For the Angular Material Lists
     * Takes the event and shifts module priority
     * @param event  - The event containing starting and ending index
     * @param module - The module that contains the links to be shifted 
     */
    onDrop(event, module: Module): void {

        const targetIdx: number = event.currentIndex
        const baseIdx: number = event.previousIndex;

        module.links.sort(this.ss.sortLinksByPriority);
        module.links[baseIdx].priority = targetIdx;

        if (targetIdx < baseIdx) {

            for (let i = targetIdx ; i < baseIdx ; i++) {

                module.links[i].priority++;
            }

        } else {

            for (let i = baseIdx + 1 ; i <= targetIdx ; i++) {

                module.links[i].priority--;
            }
        }

        module.links.sort(this.ss.sortLinksByPriority);

        this.contentActive.set(module, targetIdx);

        this.mfs.updateModuleLinks(module).subscribe(
            (resp: HttpHeaderResponse) => {

                if (resp === null) {

                    this.toastr.error('Failed to Normalize this Module');
                }
            },
            (error: HttpHeaderResponse) => {

                this.toastr.error('Failed to Normalize this Module')
            }
        );
    }

    /**
     * For the Angular Material Lists
     * Discretely moves the content by a discrete index value depending on which button was pressed
     * Just incase the user doesn't want to use drag and drop
     * @param module - The module to shift the links in
     * @param shift - Number of spaces to shift the module. Always either -1 or 1
     */
    shiftLinkPriority(module: Module, shift: number): void {

        if (module.links.length === 0) {

            return;
        }

        const numLinks = module.links.length;
        const curIdx = this.contentActive.get(module);

        if (curIdx + shift >= numLinks || curIdx + shift <= -1) {

            return;
        }

        module.links[curIdx].priority = curIdx + shift;
        module.links[curIdx + shift].priority = curIdx;

        module.links.sort(this.ss.sortLinksByPriority);
        this.contentActive.set(module, curIdx + shift);

        this.mfs.updateModuleLinks(module).subscribe(
            (resp: HttpHeaderResponse) => {

                if (resp === null) {

                    this.toastr.error('Failed to Normalize this Module');
                }
            },
            (error: HttpHeaderResponse) => {

                this.toastr.error('Failed to Normalize this Module')
            }
        );

    }

    /**
     * Noramalizes the priority of each link in a module
     * The resulting link priorities is a smooth list from 0 to n
     * First sort the list then normalize
     * @param module - Module whos links we wish to sort
     */
    normalizePriority(module: Module): void {

        module.links.sort(this.ss.sortLinksByPriority);
        let change = false;

        for (let i = 0 ; i < module.links.length ; i++) {

            if (module.links[i].priority !== i) {

                module.links[i].priority = i;
                change = true;
            }
        }

        if (change) {

            this.mfs.updateModuleLinks(module).subscribe(
                (resp: HttpHeaderResponse) => {

                    if (resp !== null) {

                        this.toastr.info('Normalized Module Priority');

                    } else {

                        this.toastr.error('Failed to Normalize this Module');
                    }
                },
                (error: HttpHeaderResponse) => {

                    this.toastr.error('Failed to Normalize this Module')
                }
            );
        }
    }

    getDate(ms: number) {

        return new Date(ms).toString();
    }
}
