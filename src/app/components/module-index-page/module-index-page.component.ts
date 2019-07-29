import { Component, OnInit } from '@angular/core';
import { Module } from 'src/app/models/Module';
import { ModuleStoreService } from 'src/app/services/module-store.service';
import { ContentFetcherService } from 'src/app/services/content-fetcher.service';
import { Content } from 'src/app/models/Content';
import { Filter } from 'src/app/models/Filter';

/** Component for module index */

@Component({
   selector: 'app-module-index-page',
   templateUrl: './module-index-page.component.html',
   styleUrls: ['./module-index-page.component.css']
})
export class ModuleIndexPageComponent implements OnInit {

   /** Visibility status of each Module */
   contentVisible: Map<Module, boolean> = new Map<Module, boolean>();

   /** Map of Modules to their list of related Content.
      Loaded when user clicks on Module (lazy load) */
   moduleContents: Map<Module, Content[]> = new Map<Module, Content[]>();

   /**
    * Constructor with ContentFetcherService and ModuleStoreService
    * @param cs 
    * @param ms ModuleStoreService variable
    */
   constructor(
      private cs: ContentFetcherService,
      public ms: ModuleStoreService
   ) { }

   /** Load modules on page load */
   ngOnInit() {
      this.ms.loadModules();
   }

   /** Method for liting the content
    * @param module
    */
   listContent(module: Module) {

      if (null == this.moduleContents.get(module)) {

         this.contentVisible.set(module, false);

         let filter: Filter = new Filter(
            null, null, [module.id]
         );
         this.cs.filterContent(filter).subscribe(
            (response) => {
               if (response != null) {
                  this.parseContentResponse(response, module);
               } else {
                  alert('Response was null');
               }
            },
            (response) => {
               alert("Failed to request contents");
            },
            () => { this.contentVisible.set(module, true); }
         )
      } else {

         this.contentVisible.set(module, !this.contentVisible.get(module));
      }
   }

   /**
     * Sort the content list order by title,
     * insert into Module->List<Content> Map
     * @param response
     * @param module
     */
   parseContentResponse(response: Content[], module: Module) {

      let sortedResponse = response.sort(
         (a, b) => { return a.title < b.title ? -1 : 1 }
      )

      this.moduleContents.set(module, sortedResponse);
   }

}
