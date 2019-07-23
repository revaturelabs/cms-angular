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

   /**
    * Selection of formats to choose betwwen
    */
   readonly formats: string[] = ["Code", "Document", "Powerpoint", "All"];

   /**
    * Title of content
    */
   title: string = "";

   /**
    * Sets defualt for content selection to All
    */
   selFormat: string = "All";

   /**
    * Array of contents
    */
   contents: Content[];

   /**
    * Hides table for contents until Find content is clicked and content is available
    */
   tablebool: boolean = false;

   /**
    * Stores the tags
    */
   moduleIDs: number[];

   /**
    * Selected from subject list
    */
   selectedSubjects: string[] = [];

   /**
    * Takes selected subjects and used for searching
    */
   searchedSubjects: string[] = [];

   /**
    * @param cs Allows us to fetch content
    * @param ms Allows us to get information for tags
    */
   constructor(
      private cs: ContentFetcherService,
      public ms: ModuleStoreService) { }

   /**
    * On page initialization load the modules to list on the dropdown menu 
    */
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
      /* Sorts contents by their id */
      this.contents = response.sort(
         (a, b) => { return a.id - b.id });

      /* Sorts each content's list of links by
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
    * 
    * @returns True if table has content and false if no content is preset
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
    * Gets the string array of selected subjects and populates the number array of subject id
    * @param {string} subjects
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
