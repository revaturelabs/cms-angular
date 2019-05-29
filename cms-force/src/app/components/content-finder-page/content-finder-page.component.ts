import { Component, OnInit } from '@angular/core';
import { Content } from '../../models/Content';
import { Filter } from '../../models/filter';
import { ContentFetcherService } from 'src/app/services/content-fetcher.service';
import { Module } from 'src/app/models/Module';
import { ModuleStoreService } from 'src/app/services/module-store.service';

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

   constructor(
      private cs: ContentFetcherService,
      private ms: ModuleStoreService) { }

   ngOnInit() {
      this.ms.loadModules();
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


   notEmpty() {
      if (this.contents.length != 0) {
         this.tablebool = true;
      }
   }

}
