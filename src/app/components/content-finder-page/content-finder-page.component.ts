import { Component, OnInit } from '@angular/core';
import { Content } from '../../models/Content';
import { Module } from 'src/app/models/Module';
import { Filter } from '../../models/Filter';
import { ContentFetcherService } from 'src/app/services/content-fetcher.service';
import { ModuleStoreService } from 'src/app/services/module-store.service';
import { ToastrService } from 'ngx-toastr';
import { Link } from 'src/app/models/Link';

/** Typescript component for Content Finder page */
@Component({
   selector: 'app-content-finder-page',
   templateUrl: './content-finder-page.component.html',
   styleUrls: ['./content-finder-page.component.css']
})
export class ContentFinderPageComponent implements OnInit {

   /**
    * Selection of formats to choose betwwen
    */
   readonly formats: string[] = ["Code", "Document", "Powerpoint", "Flagged", "All"];

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

   
   /** Map of Visibility status of each Module */
   contentVisible: Map<Module, boolean> = new Map<Module, boolean>();


   /**
    * Selected from subject list
    */
   selectedSubjects: string[] = [];

   /**
    * Holds the links that will be applied to a content
    */
   selectedTags: string[] = [];

   /**
    * Holds a reference of a content being worked upon
    */
   selCon: Content;

   /**
    * Takes selected subjects and used for searching
    */
   searchedSubjects: string[] = [];

   /**
    * Boolean for checking if a spinner should be displayed
    */
   isSearching: boolean = false;

   /**
    * Variable used to contain tags that a content does not have
    */
   tagOptions: string[] = [];

   /**
    * Variable that holds the link that is currently selected. Used for removal of tags.
    */
   selLink: Link;

   /**
    * Content Finder Constructor
    * @param cs Allows us to fetch content
    * @param ms Allows us to get information for tags
    */
   constructor(
      private cs: ContentFetcherService,
      public ms: ModuleStoreService,
      private toastr: ToastrService
      ) { }

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
      this.isSearching = true;
      let format: string = this.selFormat;

      //if 'all' or 'flagged' was selected return all content
      if (format === "All" || format === "Flagged") {
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

               //populate the contents array with the response with the parseContentResponse function
               this.parseContentResponse(response);
               if (this.notEmpty()) { }
               else
                  this.toastr.error('No Results Found');
            } else {
               this.toastr.error('Response was null');
            }
         },
         (response) => {
            this.toastr.error('Failed to send filter');
            this.isSearching = false;
         }
      )
   }

   /**
    * Sorts the content's order and then the content's link's order
    * @param response
    */
   parseContentResponse(response: Content[]) {
      this.isSearching = false;
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

      /**
      * Filter the contents by content with no links (not attached to a modules) 
      * if 'flagged' is the selected format
      */
      if( this.selFormat === "Flagged"){
         this.contents = this.contents.filter(function(flaggedContent){
            return flaggedContent.links.length === 0;
         });
      }

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
    * Description - Gets the string array of selected subjects and populates
    * the number array of subject id (or model or tag or whatever the team never really settled on the name like it was tag at first then prerequisite then modules then affiliation then subjects like come on)
    * @param subjects - array of subjects
    */
   getIDsFromSubjects(subjects: string[]) {
      this.moduleIDs = [];
      subjects.forEach(
         (subject) => {
            this.moduleIDs.push(this.ms.subjectNameToModule.get(subject).id);
         }, this
      )
   }
   
   /**
    * Description - This method deletes a link between a content and a module
    */
   removeTag() {
      let found = this.selCon.links.findIndex(l => this.selLink.id === l.id);
      this.selCon.links.splice(found, 1);
      this.cs.updateContentByContent(this.selCon).subscribe();
   }

   /**
    * Description - selects the generated content
    * @param content - the content that needs to be selected
    */
   selectedContent(content: Content) {
      this.selCon = content;

      let subjectToName: string[] = [];

      for (let l of this.selCon.links) {
         subjectToName.push(this.ms.subjectIdToName.get(l.moduleId));
      }

      let tempArr: string[] = [];

      for (let t of this.ms.subjectNames) {
         if (!subjectToName.includes(t))
            tempArr.push(t);
      }
      this.tagOptions = tempArr;
   }

   /**
    * Description - Assigns references to a content and it's link that is being removed
    * @param content - content being worked upon
    * @param link - the link that will be removed from the content
    */
   selectedTagForRemoval(content: Content, link: Link) {
      this.selCon = content;
      this.selLink = link;
   }


/**
 * Description - Adds tags to a specific content
 * Grabs the inputted tags and pushes them into the content.links array
 * Then sends a request to the database to update the content.
 */
   updateTags() {
      let links = [];
      if (this.selectedTags.length > 0) {
         this.selectedTags.forEach(
            (subject) => {
               links.push(new Link(null, this.selCon.id,
                  this.ms.subjectNameToModule.get(subject).id, null));
            }, this
         )
         for (let l of links) {
            this.selCon.links.push(l);
         }
         
         this.cs.updateContentByContent(this.selCon).subscribe((response: Content) => {
            this.selCon.links = response.links;
         });
      }

      this.selectedTags = [];

   }



}
