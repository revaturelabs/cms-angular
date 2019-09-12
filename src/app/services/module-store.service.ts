import { Injectable } from '@angular/core';
import { Module } from '../models/Module';
import { ModuleFetcherService } from './module-fetcher.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ContentFetcherService } from './content-fetcher.service';

/** 
 * ModuleStoreService provides a method to load all Modules and houses
 * collections of Module-related data for direct access.
 */
@Injectable({
   providedIn: 'root'
})
export class ModuleStoreService {

   nodes: any[] = [];

   /** Mapping of Subject Name to Module */
   subjectNameToModule: Map<string, Module>;
   /** Mapping of Subject ID to Module */
   subjectIdToModule: Map<number, Module>;
   /** Mapping of Subject ID to Subject Name */
   subjectIdToName: Map<number, string>;
   // Populates a collection of Root modules
   subjectIDToRootModule: Map<number, Module> = new Map<number, Module>();
   subjectRootArray: Module[] = [];
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

   /** All Modules that have no conten */
   emptyresponse: Module[] = [];

   /** Whether or not the Modules are still being loaded from back-end */
   isLoading: boolean = true;
   /** String representing the status of module-store-service */
   loadingText: string = "Loading modules...";
   /** BehaviorSubject for buffer */
   buffer: BehaviorSubject<boolean> = new BehaviorSubject(true);



   /**
    * Basic constructor for bss
    * @param ms Service to obtain Modules from back-end
    * @param toastr
    */
   constructor(private ms: ModuleFetcherService,
      private cs: ContentFetcherService,
      private toastr: ToastrService) { }

   /** load Modules once from backend on program start */
   loadModules() {
      this.isLoading = true;
      this.loadingText = "Loading modules...";
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
            this.isLoading = false;

         }, () => {
            this.populateCollections(this.response);
            this.nodes = [];
            this.subjectIDToRootModule.forEach(
               (modules) => {
                  this.nodes.push(modules);
               }
            );
         }
      );
   }

   /** load Modules that have no content */
   loadEmptyModules() {

      this.emptyresponse = []
      this.isLoading = true;
      this.loadingText = "Loading modules...";
      this.ms.getAllModules().subscribe(
         (response) => {
            if (response != null) {
               for (let i = 0; i < response.length; i++) {
                  if (response[i].links.length == 0) {
                     this.emptyresponse.push(response[i]);
                  }
               }

            }
            else {
               // this.failedRetrieve = true;
               this.toastr.error('failed to retrieve modules');
               this.isLoading = false;
            }
         }, (response) => {
            this.toastr.error('failed to retrieve modules');
            this.isLoading = false;

         }, () => this.populateCollections(this.emptyresponse)
      )
   }


   /**
    * fills collections defined using all available module info for quick,
    * easy access to subject names, id, and alphabetical ordering 
    * @param modules
    */
   populateCollections(modules: Module[]) {
      let i = 0;
      let c = 0;

      if (modules.length > 0) {
         this.subjectNameToModule = new Map<string, Module>();
         this.subjectIdToModule = new Map<number, Module>();
         this.subjectIdToName = new Map<number, string>();
         this.subjectIdToSortedIndex = new Map<number, number>();
         this.subjectIDToRootModule = new Map<number, Module>();
         this.subjectNames = [];
         this.subjectRootArray = [];
         // this.subjectIDtoData = new Map<Number, 

         modules.sort(
            (a, b) => {
               return a.subject.toLowerCase() < b.subject.toLowerCase() ? -1 : 1;
            }
         ).forEach(
            (module) => {
               module.color = this.getColor(c++);
               this.subjectNameToModule.set(module.subject, module);
               this.subjectIdToModule.set(module.id, module);
               this.subjectIdToName.set(module.id, module.subject);
               this.subjectIdToSortedIndex.set(module.id, i++);
               this.subjectNames.push(module.subject);
               // populates a collection of root modules
               if (module.parentModules.length == 0) {
                  this.subjectIDToRootModule.set(module.id, module);
                  this.subjectRootArray.push(module);
               }
            }, this
         );
         this.populateModuleChildObjects(this.subjectRootArray);
      }
      this.isLoading = false;
      this.buffer.next(false);
      this.loadingText = "Select relevant modules";
   }

   // takes the array of child ids and populates an array of module objects
   populateModuleChildObjects(modules: Module[]) {
         modules.forEach(
            (module) => {
               module.childrenModulesObject = [];
               if (module.childrenModules.length != 0) {
                  module.childrenModules.forEach(
                     (element) => {
                        module.childrenModulesObject.push(this.subjectIdToModule.get(element));
                     }
                  );
                  // recursive for each layer of children
                  // beware memory leaks
                  this.populateModuleChildObjects(module.childrenModulesObject);
               }
            }
         );
   
   }

   /**
    * Choose color based on module index
    * @param index Index of Module, used to determine color
    */
   private getColor(index: number): string {
      if (index % 2 == 0) {
         return "#72A4C2";
      }
      else {
         return "#B9B9BA";
      }
   }
}
