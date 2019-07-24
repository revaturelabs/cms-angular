import { Injectable } from '@angular/core';
import { Module } from '../models/Module';
import { ModuleFetcherService } from './module-fetcher.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
   providedIn: 'root'
})

/* ModuleStoreService provides a method to load all Modules and houses
 * collections of Module-related data for direct access.
 */
export class ModuleStoreService {

   /* Various maps for easy retrieving of module/subject info */
   subjectNameToModule: Map<string, Module>;
   subjectIdToModule: Map<number, Module>;
   subjectIdToName: Map<number, string>;

   /* all subject names in alphabetical order */
   subjectNames: string[];

   /* subject id => index of subject's name in
    * alphabetical order name array.
    * Can be used for module Name string comparison using
    * only module ID */
   subjectIdToSortedIndex: Map<number, number>;


   response: Module[];
   isLoading: boolean = false;
   loadingText: string = "Loading Subjects...";
   failedRetrieve: boolean = false;
   failedRequest: boolean = false;


   constructor(private ms: ModuleFetcherService,
               private toastr: ToastrService
                  ) { }

   /* load Modules once from backend on program start */
   loadModules() {
      this.isLoading = true;
      this.loadingText = "Loading Subjects...";
      this.ms.getAllModules().subscribe(
         (response) => {
            if (response != null) {
               this.response = response;
            }
            else { 
               // this.failedRetrieve = true;
               this.toastr.error('failed to retrieve modules');
               this.isLoading = false;
            }
         }, (response) => {
            this.toastr.error('failed to retrieve modules');
            // this.failedRequest = true;
            this.isLoading = false;

         }, () => this.populateCollections(this.response)
      )
   }

   /* fills collections defined using all available module info for quick,
    * easy access to subject names, id, and alphabetical ordering */
   populateCollections(modules: Module[]) {
      let i = 0;
      let c = 0;

      if (modules.length > 0) {
         this.subjectNameToModule = new Map<string, Module>();
         this.subjectIdToModule = new Map<number, Module>();
         this.subjectIdToName = new Map<number, string>();
         this.subjectIdToSortedIndex = new Map<number, number>();
         this.subjectNames = [];

         /* sort modules by subject name alphabetically */
         modules.sort(
            (a, b) => {
               return a.subject.toLowerCase() < b.subject.toLowerCase() ? -1 : 1;  // compare subject names alphabetically
            }
         ).forEach(
            /* then for each in order, populate maps/array */
            (module) => {
               module.color = this.getColor(c++);
               this.subjectNameToModule.set(module.subject, module);
               this.subjectIdToModule.set(module.id, module);
               this.subjectIdToName.set(module.id, module.subject);
               this.subjectIdToSortedIndex.set(module.id, i++);
               this.subjectNames.push(module.subject);
            }, this
         )
      }
      this.isLoading = false;
      this.failedRequest = false;
      this.failedRetrieve = false;
      this.loadingText = "Select relevant subjects";
   }

   /* Choose color based on module index */
   private getColor(index : number): string {
      if(index%2 == 0){
         return "#72A4C2";
      }
      else{
         return "#B9B9BA";
      }
   }
}
