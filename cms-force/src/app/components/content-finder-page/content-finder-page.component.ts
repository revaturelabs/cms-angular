import { Component, OnInit } from '@angular/core';
import { Content } from '../../models/Content';
import { Filter } from '../../models/filter';
import { ContentFetcherService } from 'src/app/services/content-fetcher.service';
// import { Module } from 'src/app/models/Module';
import { ModuleStoreService } from 'src/app/services/module-store.service';
import { Link } from 'src/app/models/Link';
// import { resetCompiledComponents } from '@angular/core/src/render3/jit/module';
// import { ContentWrapper } from 'src/app/models/ContentWrapper';

@Component({
   selector: 'app-content-finder-page',
   templateUrl: './content-finder-page.component.html',
   styleUrls: ['./content-finder-page.component.css']
})
export class ContentFinderPageComponent implements OnInit {

   readonly formats: string[] = ["Code", "Document", "All"];
   title: string = "";
   selFormat: string = "Code";
   contents: Content[];
   tablebool: boolean = false;
   moduleIDs: number[];
   selectedSubjects: string[] = [];  // selected from subject list
   // contentWrapper: ContentWrapper;

   constructor(
      private cs: ContentFetcherService,
      private ms: ModuleStoreService) { }

   ngOnInit() {
      this.ms.loadModules();
   }

   /**
    * Submit function that takes in all input and puts it into a filter object
    * to subscribe method. If the request was successful then it will get the
    * response as the array of content and populate the table and print it.
    */
   submit() {
      if (this.selFormat === "All") {
         this.selFormat = "";
      }
      this.getIDsFromSubjects(this.selectedSubjects);
      let filter: Filter = new Filter(
         this.title, this.selFormat, this.moduleIDs
      );
      console.log(filter);
      this.cs.filterContent(filter).subscribe(
         (response) => {
            if (response != null) {
               console.log(response);
               this.parseContentResponse(response);
               if (this.notEmpty())
                  this.reset();
               else
                  alert("No Results Found");
            } else {
               console.log('Response was null');
            }
         },
         (response) => {
            alert("Failed to send filter")
         }
      )
   }

   parseContentResponse(response: Content[]) {
      /* sort contents by their id */
      this.contents = response.sort(
         (a, b) => { return a.id - b.id });

      /* sort each content's list of links by
       * subject/module name via lookup Map */
      this.contents.forEach(
         (content) => {
            content.links = content.links.sort(
               (a, b) => {
                  let sortedIndexA: number = this.ms.subjectIdToSortedIndex.get(a.moduleId);
                  let sortedIndexB: number = this.ms.subjectIdToSortedIndex.get(b.moduleId);
                  return sortedIndexA - sortedIndexB;
               }
            );
         }, this
      )
   }

   /**
    * Resets the input fields
    */
   reset() {
      this.title = "";
      this.selFormat = "Code";
      this.selectedSubjects = [];
   }

   /**
    * Function to see if the table is populated with content
    */
   notEmpty(): boolean {
      if (this.contents.length != 0) {
         this.tablebool = true;
         return true;
      } else {
         this.tablebool = false;
         return false;
      }
   }

   /**
    * Gets the string array of selected subjects and populates
    * the number array of subject id (or model or tag or whatever the team never really settled on the name like it was tag at first then prerequisite then modules then affiliation then subjects like come on)
    * @param subjects
    */
   getIDsFromSubjects(subjects: string[]) {
      this.moduleIDs = [];
      subjects.forEach(
         (subject) => {
            this.moduleIDs.push(this.ms.modules.get(subject).id);
         }, this
      )
   }

}
