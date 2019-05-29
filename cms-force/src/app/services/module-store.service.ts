import { Injectable } from '@angular/core';
import { Module } from '../models/Module';
import { ModuleFetcherService } from './module-fetcher.service';

@Injectable({
   providedIn: 'root'
})
export class ModuleStoreService {

   modules: Map<string, Module>;
   subjectIdMap: Map<number, string>;
   subjectNames: string[] = [];
   

   constructor(private ms: ModuleFetcherService) { }


   /* load Modules once from backend on program start */
   loadModules() {
      this.modules = new Map<string, Module>();
      this.subjectIdMap = new Map<number, string>();
      this.ms.getAllModules().subscribe(
         (response) => {
            if (response != null) {
               response.forEach(
                  (module) => {
                     this.modules.set(module.subject, module);
                     this.subjectIdMap.set(module.id, module.subject);
                     this.subjectNames.push(module.subject);
                  }, this
               )
            }
            else console.log("Failed to retrieve any modules.");
         }, (response) => {
            console.log("Failed to send module request.");
         }
      )
   }
}
