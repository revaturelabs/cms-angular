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

// TODO

/** Typescript Component for Module Index Page */
@Component({
    selector: 'app-module-index-page',
    templateUrl: './module-index-page.component.html',
    styleUrls: ['./module-index-page.component.css']
})
export class ModuleIndexPageComponent implements OnInit {

    /** Map of Visibility status of each Module */
    contentVisible: Map<Module, boolean> = new Map<Module, boolean>();

    /** Map of Modules to their list of related Content.
     * Loaded when user clicks on Module (lazy load) */
    moduleContents: Map<Module, Content[]> = new Map<Module, Content[]>();

    /**
     * Variable that will reference selected content for removal. Pre-initialized as it would 
     * cause errors upon loading the component.
     */
    //Note that this needs defualt values so the bindings {{ }} in html will work on page load
    selCon: Content = new Content(0, "", "", "", "", []);

    /**
     * Variable that will reference the module of the selected content for removal. 
     * Pre-initialized as it would cause errors upon loading the component.
     */
    //Note that this needs defualt values so the bindings {{ }} in html will work on page load
    selModule: Module = new Module(0, "", 0, [], null, null, null);

    /** Used to display a spinner when modules are loading.*/
    isLoading: boolean = false;

    /** Create nodes to load child modules as objects */
    nodes: Module[] = this.ms.nodes;

    activeContentIdx: number = -1;
    activeModuleIdx: number = -1;
    dragIdx: number = -1;


    /**
     * Constructor for Module Index Component
     * @param cs Fetches content
     * @param ms Fetches tags
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

    ngDoCheck() {
        if (this.nodes.length == 0) {
            this.nodes = this.ms.nodes;
            console.log('dsadsa')

            for (let module of this.nodes) {

                for (let i = 0 ; i < module.links.length ; i++) {

                    module.links[i].priority = i;
                }
            }
        }
    }

    /**
     * Lists the available content for module input
     * @param {Module} module
     */
    listContent(module: Module, moduleIdx: number) {

        console.log(this.ms.nodes);

        for (let i = 0 ; i < module.links.length ; i++) {

            module.links[i].priority = i;
        }

        this.activeContentIdx = 0;
        this.activeModuleIdx = moduleIdx;

        /*
        if (this.moduleContents.get(module) == null) {

            this.contentVisible.set(module, false);
            
            let filter: Filter = new Filter(
                null, null, [module.id]
            );

            this.cs.filterContent(filter).subscribe(
                (response) => {
                    if (response != null) {
                        this.parseContentResponse(response, module);
                    } else {
                        this.toastr.error('Response was null');
                    }
                },
                (response) =>{
                    this.toastr.error('Failed to request contents');
                },
                () => {
                    this.contentVisible.set(module, true);
                }
            );
        } else {
            this.contentVisible.set(module, !this.contentVisible.get(module));
        } */

        this.contentVisible.set(module, !this.contentVisible.get(module));
    }

    /**
     * Sort the content list order by title
     * Insert into Module->List<Content> Map
     * @param response Available content
     * @param module Modules for content
     */
    parseContentResponse(response: Content[], module: Module) {

        let sortedResponse = response.sort(
            (a, b) => { return a.title < b.title ? -1 : 1 }
        );

        this.moduleContents.set(module, sortedResponse);
    }

    /**
     * Description - removes the content from the specified module. It will also send a request to decouple the link between content and module.
     * @param content - the content being removed
     * @param module - the module the content is being removed from
     */
    removeContentFromModuleIndex() {
        globalCacheBusterNotifier.next();
        console.log(this.selCon);
        //let found = this.selCon.links.findIndex(l => this.selModule.id === l.module.id);
        //this.selCon.links.splice(found, 1);
        this.nodes[this.activeModuleIdx].links.splice(this.activeContentIdx, 1);

        //let foundContent = this.moduleContents.get(this.selModule).findIndex(l => this.selCon.id === l.id);
        //this.moduleContents.get(this.selModule).splice(foundContent, 1);

        this.mfs.createOrUpdateModule(this.nodes[this.activeModuleIdx]).subscribe(
        );
    }
    /**
     * Description - assigns the content and the module that the content resides into variables for this component to utilize.
     * @param content - the selected content
     * @param module - the module the selected content resides in
     */
    selectedLinkForRemoval(content: Content, module: Module) {
        console.log(content);
        this.selCon = content;
        this.selModule = module;
    }

    /** 
        This method checks whether the flag should be displayed for the current module.
        @param module - the module that is selected.
    */
    checkFlag(module: Module) {
        if (module.links.length === 0) {
            return true;
        }
        else {
            return false;
        }
    }

    /**
     * 
     * @param module 
     */
    selectedModuleForRemoval(module: Module) {
        this.selModule = module;
    }

    removeModule() {
        /**
         * Below is used to refresh this component when a module has been removed
         */
        var selMethod = (<HTMLInputElement>document.getElementById("Seldelmethod")).value;
        switch (selMethod) {
            case '1': this.mfs.deleteModuleByID(this.selModule.id).subscribe(() => this.ms.loadModules());
                break;
            case '2': this.mfs.deleteModuleWithSpecificContent(this.selModule.id).subscribe(() => this.ms.loadModules());
                break;
            case '3': this.mfs.deleteModuleWithContent(this.selModule.id).subscribe(() => this.ms.loadModules());
                break;
        }
    }

    getModules(modules: Module[]){

        let fetchedModules : Module[] = [];

        modules.forEach(thisModule => {
            fetchedModules.push(this.ms.subjectIdToModule.get(thisModule.id));
        });

        return fetchedModules;
    }

    setActiveContent(idx: number) {
        this.activeContentIdx = idx;
    }

    onDragStart(event: DragEvent, baseIdx: number): void {

        event.dataTransfer.setData('baseIdx', JSON.stringify(baseIdx));
        this.dragIdx = baseIdx;
    }

    onDragOver(event: DragEvent): void {

        event.preventDefault();
    }

    onDrop(event: DragEvent, targetIdx: number, moduleIdx: number): void {

        event.preventDefault();

        const offset = Math.floor(event.offsetY / 28) == 0 ? -1 : 1;
        const baseIdx: number = + JSON.parse(event.dataTransfer.getData('baseIdx'));

        if (baseIdx === targetIdx || baseIdx === targetIdx + offset) {

            return;
        }

        this.ms.nodes[moduleIdx].links.sort(this.util.sortLinksByPriority);
        this.ms.nodes[moduleIdx].links[baseIdx].priority = targetIdx;

        if (targetIdx < baseIdx) {

            for (let i = targetIdx ; i < baseIdx ; i++) {

                this.ms.nodes[moduleIdx].links[i].priority++;
                console.log(this.ms.nodes[moduleIdx].links[i])
            }

        } else {

            for (let i = baseIdx + 1 ; i <= targetIdx ; i++) {

                this.ms.nodes[moduleIdx].links[i].priority--;
                console.log(this.ms.nodes[moduleIdx].links[i])
            }
        }

        this.ms.nodes[moduleIdx].links.sort(this.util.sortLinksByPriority);

        this.activeContentIdx = targetIdx;

    }
}
