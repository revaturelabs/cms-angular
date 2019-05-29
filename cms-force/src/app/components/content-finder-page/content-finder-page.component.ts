import { Component, OnInit } from '@angular/core';
import { Content } from '../../models/Content';
import { Filter } from '../../models/filter';
import { ContentFetcherService } from 'src/app/services/content-fetcher.service';
import { Module } from 'src/app/models/Module';

@Component({
   selector: 'app-content-finder-page',
   templateUrl: './content-finder-page.component.html',
   styleUrls: ['./content-finder-page.component.css']
})
export class ContentFinderPageComponent implements OnInit {

   title: string;
   format: string;
   modules: Map<string, Module>;
   contents: Content[];
   tablebool: boolean = false;
   moduleIDs: number[];

   constructor(private cs: ContentFetcherService) { }

   ngOnInit() {
      this.loadModules();
   }

   submit() {
      let filter: Filter = new Filter(
         this.title, this.format, this.moduleIDs
      );

      this.cs.filterContent(filter).subscribe(
         (response) => {
            if (response != null) {
               this.contents = response;
            } else {
               console.log('Response was null');
            }
         },
         (response) => {
            alert("Failed to send filter")
         }
      )
   }

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

   notEmpty() {
      if (this.contents.length != 0) {
         this.tablebool = true;
      }
   }

}
