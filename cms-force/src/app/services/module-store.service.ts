import { Injectable } from '@angular/core';
import { Module } from '../models/Module';
import { ModuleFetcherService } from './module-fetcher.service';
import { INTERNAL_BROWSER_DYNAMIC_PLATFORM_PROVIDERS } from '@angular/platform-browser-dynamic/src/platform_providers';
import { INT_TYPE } from '@angular/compiler/src/output/output_ast';

@Injectable({
   providedIn: 'root'
})
export class ModuleStoreService {

   /* THESE MUST NOT BE INITIALIZED HERE, LEST WE
    PREMATURELY TRIGGER PROPERTY BINDINGS */
   modules: Map<string, Module>;
   subjectIdMap: Map<number, string>;
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
         }, () => this.populateArray(this.response)
      )
   }

   populateArray(modules: Module[]) {
      console.log("populating");
      if (modules.length > 0) {
         this.modules = new Map<string, Module>();
         this.subjectIdMap = new Map<number, string>();
         this.subjectNames = [];
         modules.forEach(
            (module) => {
               this.modules.set(module.subject, module);
               this.subjectIdMap.set(module.id, module.subject);
               this.subjectNames.push(module.subject);
            }, this
         )
      }
      this.isLoading = false;
      this.loadingText = "Select relevant subjects";
   }
}