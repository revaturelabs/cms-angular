import { Injectable } from '@angular/core';
import { Module } from '../models/Module';
import { ModuleFetcherService } from './module-fetcher.service';

@Injectable({
   providedIn: 'root'
})
export class ModuleStoreService {

   modules: Map<string, Module>;
   subjectIdToNameMap: Map<number, string>;

   /* subject id => index of subject's name in
    * alphabetically-sorted array */
   subjectIdToSortedIndex: Map<number, number>;

   /* all subject names in alphabetical order */
   subjectNames: string[];
   response: Module[];
   isLoading: boolean = true;
   loadingText: string = "Loading Subjects...";


   constructor(private ms: ModuleFetcherService) { }


   /* load Modules once from backend on program start */
   loadModules() {
      this.isLoading = true;
      this.loadingText = "Loading Subjects...";
      this.ms.getAllModules().subscribe(
         (response) => {
            if (response != null) {
               this.response = response;
            }
            else console.log("Failed to retrieve any modules.");
         }, (response) => {
            console.log("Failed to send module request.");
         }, () => this.populateCollections(this.response)
      )
   }

   /* fills collections defined using all available module info for quick,
    * easy access to subject names, id, and alphabetical ordering */
   populateCollections(modules: Module[]) {
      let i = 0;

      console.log("populating");
      if (modules.length > 0) {
         this.modules = new Map<string, Module>();
         this.subjectIdToNameMap = new Map<number, string>();
         this.subjectIdToSortedIndex = new Map<number, number>();
         this.subjectNames = [];

         /* sort modules by subject name alphabetically */
         modules.sort(
            (a, b) => {
               return a.subject.toLowerCase() < b.subject.toLowerCase() ? -1 : 1;  // compare subject names alphabetically
            }
         ).forEach(  // then process each in order
            (module) => {
               this.modules.set(module.subject, module);
               this.subjectIdToNameMap.set(module.id, module.subject);
               this.subjectIdToSortedIndex.set(module.id, i++);
               this.subjectNames.push(module.subject);
            }, this
         )
      }
      this.isLoading = false;
      this.loadingText = "Select relevant subjects";
   }
}