import { Injectable } from '@angular/core';
import { Module } from '../models/Module';
import { ModuleFetcherService } from './module-fetcher.service';

@Injectable({
   providedIn: 'root'
})
export class ModuleStoreService {

   /* THESE MUST NOT BE INITIALIZED HERE, LEST WE
    PREMATURELY TRIGGER PROPERTY BINDINGS */
   modules: Map<string, Module>;
   subjectIdMap: Map<number, string>;
   subjectNames: string[];


   constructor(private ms: ModuleFetcherService) { }


   /* load Modules once from backend on program start */
   loadModules() {
      let modules: Map<string, Module> = new Map<string, Module>();
      let subjectIdMap: Map<number, string> = new Map<number, string>();
      let subjectNames: string[] = [];
      this.ms.getAllModules().subscribe(
         (response) => {
            if (response != null) {
               response.forEach(
                  (module) => {
                     modules.set(module.subject, module);
                     module.color = this.getRandomColor();
                     subjectIdMap.set(module.id, module.subject);
                     subjectNames.push(module.subject);
                  }, this
               )
               /* sets arrays after, triggering property-bindings after
                * arrays have been fully set */
               this.modules = modules;
               this.subjectIdMap = subjectIdMap;
               this.subjectNames = subjectNames;
            }
            else console.log("Failed to retrieve any modules.");
         }, (response) => {
            console.log("Failed to send module request.");
         }
      )
   }
   
   private getRandomColor(): string {
     let randomInRange = (min, max) => { return Math.floor((Math.random() * (max-min) + min)).toString(16) };
     return '#' + randomInRange(232,256) + randomInRange(128,256) + randomInRange(128,256);
   }
}
