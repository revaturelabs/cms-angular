import { Injectable } from '@angular/core';
import { Module } from '../models/Module';
import { ModuleFetcherService } from './module-fetcher.service';

@Injectable({
   providedIn: 'root'
})
export class ModuleStoreService {

   modules: Map<string, Module>;
   subjectNames: string[] = [];

   constructor(private ms: ModuleFetcherService) { }


   /* load Modules once from backend on program start */
   loadModules() {
      this.modules = new Map<string, Module>();
      this.ms.getAllModules().subscribe(
         (response) => {
            if (response != null) {
               response.forEach(
                  (module) => {
                     this.modules.set(module.subject, module);
                  }, this
               )
            }
            else console.log("Failed to retrieve any modules.");
         }, (response) => {
            console.log("Failed to send module request.");
         }, () => this.populateSubjectNames()
      )
   }

   /* fill array of subject names on each instantiation */
   populateSubjectNames() {
      this.subjectNames = [];
      for (let subject of Array.from(this.modules.keys())) {
         this.subjectNames.push(subject);
      }
   }
}
