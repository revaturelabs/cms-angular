import { Injectable } from '@angular/core';
import { Module } from '../models/Module';
import { ModuleFetcherService } from './module-fetcher.service';

@Injectable({
   providedIn: 'root'
})
export class ModuleStoreService {

   /* Various maps for easy retrieving of module/subject info */
   subjectNameToModule: Map<string, Module>;
   subjectIdToModule: Map<number, Module>;
   subjectIdToName: Map<number, string>;

   /* subject id => index of subject's name in
    * alphabetically-sorted name array.
    * used for module Name string comparison using
    * only module ID */
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
               module.color = this.getRandomColor();
               this.subjectNameToModule.set(module.subject, module);
               this.subjectIdToModule.set(module.id, module);
               this.subjectIdToName.set(module.id, module.subject);
               this.subjectIdToSortedIndex.set(module.id, i++);
               this.subjectNames.push(module.subject);
            }, this
         )
      }
      this.isLoading = false;
      this.loadingText = "Select relevant subjects";
   }

   private getRandomColor(): string {
      let randomInRange = (min, max) => { return Math.floor((Math.random() * (max - min) + min)).toString(16) };
      return '#' + randomInRange(232, 256) + randomInRange(128, 256) + randomInRange(128, 256);
   }
}
