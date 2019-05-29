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

   readonly formats: string[] = ["Code", "Document"];
   title: string;
   selFormat: string = "Code";
   contents: Content[];
   tablebool: boolean = false;
   moduleIDs: number[];
   selectedSubjects: string[] = [];  // selected from subject list

   constructor(
      private cs: ContentFetcherService,
      private ms: ModuleStoreService) { }

   ngOnInit() {
      this.ms.loadModules();
   }

   submit() {
      this.getIDsFromSubjects(this.selectedSubjects);
      console.log("title:");
      console.log(this.title);
      console.log("format:");
      console.log(this.selFormat);
      console.log("moduleIDs:");
      console.log(this.moduleIDs);
      let filter: Filter = new Filter(
         this.title, this.selFormat, this.moduleIDs
      );
      console.log(filter);
      this.cs.filterContent(filter).subscribe(
         (response) => {
            if (response != null) {
               console.log(response);
               this.contents = response;
               this.notEmpty();
               alert("Query Successfully Submitted");
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
      } else this.tablebool = false;
   }

   getIDsFromSubjects(subjects: string[]) {
      this.moduleIDs = [];
      console.log("ms.modules:");
      console.log(this.ms.modules);
      subjects.forEach(
         (subject)=>{
            this.moduleIDs.push(this.ms.modules.get(subject).id);
         }, this
      )
   }

}
