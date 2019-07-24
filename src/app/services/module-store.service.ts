import { Injectable } from '@angular/core';
import { Module } from '../models/Module';
import { ModuleFetcherService } from './module-fetcher.service';

/** 
 * ModuleStoreService provides a method to load all Modules and houses
 * collections of Module-related data for direct access.
 */
@Injectable({
   providedIn: 'root'
})
export class ModuleStoreService {

   /** Mapping of Subject Name to Module */
   subjectNameToModule: Map<string, Module>;
   /** Mapping of Subject ID to Module */
   subjectIdToModule: Map<number, Module>;
   /** Mapping of Subject ID to Subject Name */
   subjectIdToName: Map<number, string>;

   /** all subject names in alphabetical order */
   subjectNames: string[];

   /**
    * subject id => index of subject's name in
    * alphabetical order name array.
    * Can be used for module Name string comparison using
    * only module ID 
    */
   subjectIdToSortedIndex: Map<number, number>;

   /** All Modules being returned */
   response: Module[];
   /** Whether or not the Modules are still being loaded from back-end */
   isLoading: boolean = true;
   /** String representing the status of module-store-service */
   loadingText: string = "Loading Subjects...";

   /**
    * Basic constructor for bss
    * @param ms Service to obtain Modules from back-end
    */
   constructor(private ms: ModuleFetcherService) { }


   /** load Modules once from backend on program start */
   loadModules() {
      this.isLoading = true;
      this.loadingText = "Loading Subjects...";
      this.ms.getAllModules().subscribe(
         (response) => {
            if (response != null) {
               this.response = response;
            }
            else alert("Failed to retrieve any modules.");
         }, (response) => {
            alert("Failed to send module request.");
         }, () => this.populateCollections(this.response)
      )
   }

   /**
    * fills collections defined using all available module info for quick,
    * easy access to subject names, id, and alphabetical ordering 
    */
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
      this.loadingText = "Select relevant subjects";
   }

   /**
    * Choose color based on module index
    * @param index Index of Module, used to determine color
    */
   private getColor(index : number): string {
      if(index%2 == 0){
         return "#72A4C2";
      }
      else{
         return "#B9B9BA";
      }
   }
}
