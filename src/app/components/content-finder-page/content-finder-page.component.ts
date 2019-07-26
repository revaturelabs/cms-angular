import { Component, OnInit } from '@angular/core';
import { Content } from '../../models/Content';
import { Filter } from '../../models/Filter';
import { ContentFetcherService } from 'src/app/services/content-fetcher.service';
import { ModuleStoreService } from 'src/app/services/module-store.service';

@Component({
   selector: 'app-content-finder-page',
   templateUrl: './content-finder-page.component.html',
   styleUrls: ['./content-finder-page.component.css']
})
export class ContentFinderPageComponent implements OnInit {

   readonly formats: string[] = ["Code", "Document", "All"];
   title: string = "";
   selFormat: string = "All";
   contents: Content[];
   tablebool: boolean = false;
   moduleIDs: number[];
   selectedSubjects: string[] = [];  // selected from subject list
   // contentWrapper: ContentWrapper;
   searchedSubjects: string[] = [];

   constructor(
      private cs: ContentFetcherService,
      public ms: ModuleStoreService) { }

   ngOnInit() {
      this.ms.loadModules();
   }

   /**
    * Submit function that takes in all input and puts it into a filter object
    * to subscribe method. If the request was successful then it will get the
    * response as the array of content and populate the table and print it.
    */
   submit() {
      let format: string = this.selFormat;
      if (format === "All") {
         format = "";
      }
      this.getIDsFromSubjects(this.selectedSubjects);
      let filter: Filter = new Filter(
         this.title, format, this.moduleIDs
      );
      this.searchedSubjects = this.selectedSubjects;
      this.cs.filterContent(filter).subscribe(
         (response) => {
            if (response != null) {
               this.parseContentResponse(response);
               if (this.notEmpty()) { }
               else
                  alert("No Results Found");
            } else {
               alert('Response was null');
            }
         },
         (response) => {
            alert("Failed to send filter")
         }
      )
   }

   /**
    * Sorts the content's order and then the content's link's order
    * @param response
    */
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
            this.moduleIDs.push(this.ms.subjectNameToModule.get(subject).id);
         }, this
      )
   }

}
