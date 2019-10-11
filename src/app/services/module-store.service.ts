import { Injectable } from '@angular/core';
import { Module } from '../models/Module';
import { Link } from '../models/Link';
import { ModuleFetcherService } from './module-fetcher.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ContentFetcherService } from './content-fetcher.service';
import { UtilService } from './util.service';

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
   allModules: Module[];

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
   constructor(public ms: ModuleFetcherService,
      private cs: ContentFetcherService,
      private toastr: ToastrService,
      public util: UtilService) { }

   /** load Modules once from backend on program start */
   async loadModules(): Promise<Module[]> {
      this.isLoading = true;

      this.loadingText = "Loading modules...";
      // Returning promise with newly loaded modules
      return new Promise((resolve) => {this.ms.getAllModules().subscribe(
         (response) => {
            if (response != null) {

               this.allModules = response;
            } else {
               // this.failedRetrieve = true;
               this.toastr.error('failed to retrieve modules');
               this.isLoading = false;
            }
         }, (response) => {
            this.toastr.error('failed to retrieve modules');
            this.isLoading = false;

         }, () => {

            this.populateCollections(this.allModules);
            this.nodes = [];
            if (this.subjectIDToRootModule) {
               this.subjectIDToRootModule.forEach(
                  (modules) => {
                     this.nodes.push(modules);
                  }
               );
            }
            this.nodes.sort(this.util.sortModulesById);
            resolve(this.nodes);
            }
         );
      });
   }

   addLinkToNodes(link: Link) {

      if (link == null) {

         return;
      }


      this.nodes[this.util.findModuleIdxById(link.module.id, this.nodes)].links.push(link);
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
            (currModule) => {
               currModule.color = this.getColor(c++);
               this.subjectNameToModule.set(currModule.subject, currModule);
               this.subjectIdToModule.set(currModule.id, currModule);
               this.subjectIdToName.set(currModule.id, currModule.subject);
               this.subjectIdToSortedIndex.set(currModule.id, i++);
               this.subjectNames.push(currModule.subject);
               // populates a collection of root modules

               if (currModule.parents.length == 0) {
                  this.subjectIDToRootModule.set(currModule.id, currModule);
                  this.subjectRootArray.push(currModule);
               }
            }, this
         );
         this.populateModuleChildObjects(this.subjectRootArray);
      }
      this.isLoading = false;
      this.buffer.next(false);
      this.loadingText = "Select relevant modules";
   }



   populateModuleChildObjects(modules: Module[]) {
         modules.forEach(
            (thisModule) => {

               if (thisModule.children)
               thisModule.children.forEach(element => {
                  element.children = this.subjectIdToModule.get(element.id).children;
               });

               // recursive for each layer of children
               // beware memory leaks
               if (thisModule.children)
                  this.populateModuleChildObjects(thisModule.children);
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

   public addParents(currentModule: Module, parentModulesObject: Module[]) {
      let parents: any = [];

      currentModule.parents.forEach(parent => {
         parents.push(parent);
      });

      parentModulesObject.forEach(parent => {
         if (parent.id != currentModule.id)
            parents.push(parent);
      });

      currentModule.parents = parents;
      return currentModule;
   }
}
