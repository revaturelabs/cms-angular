import { Component, OnInit } from '@angular/core';
import { Module } from 'src/app/models/Module';
import { ModuleStoreService } from 'src/app/services/module-store.service';
import { ContentFetcherService } from 'src/app/services/content-fetcher.service';
import { Content } from 'src/app/models/Content';
import { Filter } from 'src/app/models/Filter';
import { ToastrService } from 'ngx-toastr';

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

   selCon: Content = new Content(0, "", "", "", "", []);
   selModule: Module = new Module(0, "", 0, []);

   /**
    * Used to display a spinner when modules are loading.
    */
   isLoading: boolean = false;

   /**
    * Constructor for Module Index Component
    * @param cs Fetches content
    * @param ms Fetches tags
    */
   constructor(
      private cs: ContentFetcherService,
      public ms: ModuleStoreService,
      private toastr: ToastrService
   ) { }

   /** On page initialization load the modules to list on the dropdown menu
    */
   ngOnInit() {
      this.ms.loadModules();
   }

   /**
    * Lists the available content for module input
    * @param {Module} module 
    */
   listContent(module: Module) {
      /* Check if Content list already loaded for Module */
      if (null == this.moduleContents.get(module)) {

         /* initialize the module's visibility */
         this.contentVisible.set(module, false);

         /* Retrieve Module's list of Content */
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
            (response) => {
               this.toastr.error('Failed to request contents');
               
            },
            /* display module's contents when done loading */
            () => { this.contentVisible.set(module, true); }
         )
      }

      else {
         /* Toggle visibility of Module's list of Content
         * using ModuleStoreServices's map of Module->Boolean */
         this.contentVisible.set(module, !this.contentVisible.get(module));
      }
   }

   /**
    * Sort the content list order by title
    * Insert into Module->List<Content> Map
    * @param response Available content
    * @param module Tags/modules for content
    */
   parseContentResponse(response: Content[], module: Module) {

      /* sort contents by their title */
      let sortedResponse = response.sort(
         (a, b) => { return a.title < b.title ? -1 : 1 }
      )

      this.moduleContents.set(module, sortedResponse);
   }

   /**
    * Description - removes the content from the specified module. It will also send a request to decouple the link between content and module.
    * @param content - the content being removed
    * @param module - the module the content is being removed from
    */
   removeContentFromModuleIndex() {
      //looks through the array of links that belongs to content and splices out the module/tag if it finds one.
      let found = this.selCon.links.findIndex(l => this.selModule.id === l.moduleId);
      this.selCon.links.splice(found, 1);

      //looks through the contents being displayed and removes the deleted content from the specific module
      let foundContent = this.moduleContents.get(this.selModule).findIndex(l => this.selCon.id === l.id);
      this.moduleContents.get(this.selModule).splice(foundContent, 1);

      //once content has been adjusted, call the server for update.
      this.cs.updateContentByContent(this.selCon).subscribe();
   }

   selectedLinkForRemoval(content: Content, module: Module) {
      this.selCon = content;
      this.selModule = module;
   }
}