import { Component, OnInit, ComponentFactoryResolver} from '@angular/core';
import { Module } from 'src/app/models/Module';
import { ModuleStoreService } from 'src/app/services/module-store.service';
import { ModuleFetcherService } from 'src/app/services/module-fetcher.service';
import { ContentFetcherService } from 'src/app/services/content-fetcher.service';
import { Content } from 'src/app/models/Content';
import { Filter } from 'src/app/models/Filter';
import { ToastrService } from 'ngx-toastr';
import { PagesService } from 'src/app/services/pages.service';
import { globalCacheBusterNotifier } from 'ngx-cacheable';

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
   selModule: Module = new Module(0, "", 0, [], null, null);

   /** Used to display a spinner when modules are loading.*/
   isLoading: boolean = false;

   /** Create nodes to load child modules as objects */
   nodes: any[] = this.ms.nodes;

   

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
      private pageService: PagesService
   ) { }

   /** On page initialization load the modules to list on the dropdown menu */
   ngOnInit() {
      this.ms.loadModules();
   }

   ngDoCheck() {
      if (this.nodes.length == 0) {
         this.nodes = this.ms.nodes;
      }
   }

   /**
    * Lists the available content for module input
    * @param {Module} module
    */
   listContent(module: Module) {
      if (null == this.moduleContents.get(module)) {
         console.log('if step 1');
         this.contentVisible.set(module, false);
         console.log('if step 1-2');
         let filter: Filter = new Filter(
            null, null, [module.id]
         );
         console.log(filter);
         this.cs.filterContent(filter).subscribe(
            (response) => {
               if (response != null) {
                  console.log('before if step 2');
                  this.parseContentResponse(response, module);
                  console.log('if step 2');
               } else {
                  this.toastr.error('Response was null');
                  console.log('error happend');
               }
            },
            (response) => {
               this.toastr.error('Failed to request contents');
               console.log('if step 3');
            },
            () => {
               this.contentVisible.set(module, true);
               console.log('if step 4');
            }
         );
      } else {
         this.contentVisible.set(module, !this.contentVisible.get(module));
         console.log('else step 1');
      }
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
      let found = this.selCon.links.findIndex(l => this.selModule.id === l.moduleId);
      this.selCon.links.splice(found, 1);

      let foundContent = this.moduleContents.get(this.selModule).findIndex(l => this.selCon.id === l.id);
      this.moduleContents.get(this.selModule).splice(foundContent, 1);

      this.cs.updateContent(this.selCon).subscribe(
         /**
          * Below is used to refresh this component when content has been removed from a module
          */
         data => {
            if (data != null) {
               this.ngOnInit();
            }
         }
      );
   }
   /**
    * Description - assigns the content and the module that the content resides into variables for this component to utilize.
    * @param content - the selected content
    * @param module - the module the selected content resides in
    */
   selectedLinkForRemoval(content: Content, module: Module) {
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
}