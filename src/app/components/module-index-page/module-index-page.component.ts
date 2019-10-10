import { Component, OnInit, ComponentFactoryResolver} from '@angular/core';
import { Module } from 'src/app/models/Module';
import { ModuleStoreService } from 'src/app/services/module-store.service';
import { ModuleFetcherService } from 'src/app/services/module-fetcher.service';
import { ContentFetcherService } from 'src/app/services/content-fetcher.service';
import { Content } from 'src/app/models/Content';
import { Filter } from 'src/app/models/Filter';
import { ToastrService } from 'ngx-toastr';
import { globalCacheBusterNotifier } from 'ngx-cacheable';
import { UtilService } from '../../services/util.service';
import { Link } from '../../models/Link';

/** Typescript Component for Module Index Page */
@Component({
    selector: 'app-module-index-page',
    templateUrl: './module-index-page.component.html',
    styleUrls: ['./module-index-page.component.css']
})

export class ModuleIndexPageComponent implements OnInit {

    /** Map of Visibility status of each Module */
    contentVisible: Map<Module, boolean> = new Map<Module, boolean>();

    /** Map of Active Link index for a given module */
    contentActive: Map<Module, number> = new Map<Module, number>();

    /** Variable that will reference selected Link for removal. */
    selLink: Link;

    /** Variable that will reference the module of the selected content for removal. */
    selModule: Module;

    /** Used to display a spinner when modules are loading.*/
    isLoading: boolean = false;

    /**
        * Constructor for Module Index Component
        * @param cs - Fetches content
        * @param ms - Fetches tags
        * @param toastr - ???
        * @param mfs - Used to display stored nodes
        * @param util - Sorts and Searches
     */
    constructor(
        public cs: ContentFetcherService,
        public ms: ModuleStoreService,
        private toastr: ToastrService,
        private mfs: ModuleFetcherService,
        private util: UtilService
    ) { }

    /** On page initialization load the modules to list on the dropdown menu */
    ngOnInit() {

        this.ms.loadModules();
    }

    /**
        * Lists the available content for module input
        * @param {Module} module
    */
    listContent(module: Module) {

        console.log(this.ms.nodes);

        for (let i = 0 ; i < module.links.length ; i++) {

            module.links[i].priority = i;
        }

        this.contentVisible.set(module, !this.contentVisible.get(module));
        this.contentActive.set(module, module.links.length == 0 ? -1 : this.contentActive.get(module) == null ? 0 : this.contentActive.get(module));
    }

    /**
        * Send a request to remove the link between the selected Link and Module
        * If the response is a success, then we will delete the module link locally
    */
    removeContentFromModuleIndex() {

        globalCacheBusterNotifier.next();

        this.cs.removeLinkFromContent(this.selLink.id).subscribe(

            (resp) => this.selModule.links.splice(this.contentActive.get(this.selModule), 1)

        );
    }
    /**
        * Assigns the link and module that will be used for link removal
        * @param link - the selected link
        * @param module - the module the selected link resides in
    */
    selectedLinkForRemoval(link: Link, module: Module) {

        this.selLink = link;
        this.selModule = module;
    }

    /**
        * Assigns the module that will be used for module removal
        * @param module 
    */
    selectedModuleForRemoval(module: Module) {
        this.selModule = module;
    }

    /**
        * Sends a request to delete the module selected
    */
    removeModule() {

        const selMethod = (<HTMLInputElement>document.getElementById("Seldelmethod")).value;

        switch (selMethod) {
            case '1': this.mfs.deleteModuleByID(this.selModule.id).subscribe(() => this.ms.loadModules());
                break;
            case '2': this.mfs.deleteModuleWithSpecificContent(this.selModule.id).subscribe(() => this.ms.loadModules());
                break;
            case '3': this.mfs.deleteModuleWithContent(this.selModule.id).subscribe(() => this.ms.loadModules());
                break;
        }
    }

    /**
        * No one documented this before so I have absolutely no clue what it does
        * Seems important, so I won't mess with it
    */
    getModules(modules: Module[]){

        let fetchedModules : Module[] = [];

        modules.forEach(thisModule => {
            fetchedModules.push(this.ms.subjectIdToModule.get(thisModule.id));
        });

        return fetchedModules;
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
        * Bound to the onDragStart event regarding a particular link
        * Binds the index of the selected element to the event
        * @param event   - The DragEvent associated with the action
        * @param baseIdx - The index of the selected element 
    */
    onDragStart(event: DragEvent, baseIdx: number): void {

        event.dataTransfer.setData('baseIdx', JSON.stringify(baseIdx));
    }

    /**
        * Bound to the onDragOver event regarding a particular link
        * Simply overwrite the default event and allows the Drop operation
        * @param event - THe DragEvent associated with the action
    */
    onDragOver(event: DragEvent): void {

        event.preventDefault();
    }

    /**
        * Bound to the onDrop event regarding a particular link
        * The logic that blocks the code from proceeding is here since the DragEvent here is identical to the one from onDragStart
        * Calculates the offset - Amount of values that need to be modified
        * This method assumes that the values of priority are normalized: e.g. priority is 0-10 with no outliers
        * Sorted prior to action and after. Can remove the post sort if performance is deemed too slow
        * Algorithm at the moment is a simple top vs bottom half of algorithm for determining offset
        * @param event     - The DragEvent assoiated with a particular action
        * @param targetIdx - The index of the link that the drag ended on
        * @param module    - The module that contains all of the links
    */
    onDrop(event: DragEvent, targetIdx: number, module: Module): void {

        event.preventDefault();

        const offset = Math.floor(event.offsetY / 28) == 0 ? -1 : 1;
        const baseIdx: number = + JSON.parse(event.dataTransfer.getData('baseIdx'));

        if (baseIdx === targetIdx || baseIdx === targetIdx + offset) {

            return;
        }

        module.links.sort(this.util.sortLinksByPriority);
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

        module.links.sort(this.util.sortLinksByPriority);

        this.contentActive.set(module, targetIdx);
    }
}
