import { Component, OnInit } from '@angular/core';
import { Content } from '../../models/Content';
import { Module } from '../../models/Module';
import { Filter } from '../../models/Filter';
import { ContentFetcherService } from '../../services/content-fetcher.service';
import { ModuleStoreService } from '../../services/module-store.service';
import { ToastrService } from 'ngx-toastr';
import { SelectControlValueAccessor } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

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
    * If a search shows no results, then it should show a button to make a request for content
    */
   noResultSearch: boolean = false;

   /**
    * Stores the tags
    */
   moduleIDs: number[];


   /** Map of Visibility status of each Module */
   contentVisible: Map<Module, boolean> = new Map<Module, boolean>();

   /**
    * Selected from subject list
    */
   selectedSubjects: Module[] = [];

   /**
    * Holds the Modules that will be applied to a content
    */
   selectedTags: Module[] = [];

   /**
    * Holds a reference of a content being worked upon
    */
   //Note that this needs defualt values so the bindings {{}} in html will work on page load
   selCon: Content = new Content(0, "", "", "", "", []);

   /**
    * Takes selected subjects and used for searching
    */
   searchedSubjects: Module[] = [];

   /**
    * Boolean for checking if a spinner should be displayed
    */
   isSearching: boolean = false;

   /**
    * Variable used to contain tags that a content does not have
    */
   tagOptions: string[] = [];

   /**
    * Module that is currently selected for deletion
    */
   selModule: Module;

   /**
    * Content Finder Constructor
    * @param cs Allows us to fetch content
    * @param ms Allows us to get information for tags
    */
   constructor(
      private cs: ContentFetcherService,
      public ms: ModuleStoreService,
      private toastr: ToastrService,
      private location: Location
   ) { }

   /**
    * On page initialization load the modules to list on the dropdown menu 
    */
   ngOnInit() {
      this.ms.loadModules();

      //gets search parameters from url if they exhist
      let url = window.location.href;
      if (url.indexOf('?') > -1) {
         //remove non-query part of url
         let query = url.substring(url.indexOf('?') + 1);
         //retrieve title param
         let title = query.substring(query.indexOf('=') + 1, query.indexOf('&'));
         //remove title param from query string
         query = query.substring(query.indexOf('&') + 1);
         //retreive the format param
         let format = query.substring(query.indexOf('=') + 1, query.indexOf('&'));
         //remove the format param from the query string
         query = query.substring(query.indexOf('&') + 1);
         //retrieve the modules param
         let modules = query.substring(query.indexOf('=') + 1);
         //convert modules string into an array of numbers
         let moduleIds = modules.split(',');
         let moduleIdNumbers: number[] = new Array;
         for (let i=0; i<moduleIds.length; i++) {
            moduleIdNumbers.push(parseInt(moduleIds[i]))
         }

         //populate a filter object with the params we just extracted
         let filter: Filter = new Filter(
            title, format, moduleIdNumbers
         );

         this.sendSearch(filter);
      }
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
      
      this.returnIdsFromModules(this.selectedSubjects);
      let filter: Filter = new Filter(
         this.title, format, this.moduleIDs
      );

      this.updateURL(filter);

      this.searchedSubjects = this.selectedSubjects;
      this.sendSearch(filter);
   }

   sendSearch(filter: Filter) {
      this.searchedSubjects = this.selectedSubjects;

      this.cs.filterContent(filter).subscribe(
         (response) => {
            if (response != null) {

               //populate the contents array with the response with the parseContentResponse function
               this.parseContentResponse(response);
               if (this.notEmpty()) { }
               else {
                  this.toastr.error('No Results Found');
               }
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

   updateURL(filter: Filter) {
      let url = window.location.href;
      if (url.indexOf('?') > -1) {
         url = url.substring(0, url.indexOf('?'));
      }
      let modules: string = JSON.stringify(filter.modules);
      modules = modules.replace('[','');
      modules = modules.replace(']','');
      this.location.replaceState("finder?title=" + filter.title + "&format=" + filter.format + "&modules=" + modules)
   }
   
   submitForDelete() {
      this.isSearching = true;
      let format: string = this.selFormat;

      //if 'all' or 'flagged' was selected return all content
      if (format === "All" || format === "Flagged") {
         format = "";
      }
      this.returnIdsFromModules(this.selectedSubjects);
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

      /* Sorts each content's list of modules by
       * subject/module name via lookup Map */
      this.contents.forEach(
         (content) => {

            content.modules = content.modules.sort(
               (a, b) => {
                  let sortedIndexA: number = a.id;
                  let sortedIndexB: number = b.id;
                  return sortedIndexA - sortedIndexB;
               }
            );
         }, this
      )

      /**
      * Filter the contents by content with no modules 
      * if 'flagged' is the selected format
      */
      if (this.selFormat === "Flagged") {
         this.contents = this.contents.filter(function (flaggedContent) {
            return flaggedContent.modules.length === 0;
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
         this.noResultSearch = false;
         this.tablebool = true;
         return true;
      } else {
         this.tablebool = false;
         this.noResultSearch = true;
         return false;
      }
   }

   /**
    * Description - This method deletes a link between a content and a module
    */
   removeTag() {
      let found = this.selCon.modules.findIndex(l => this.selModule.id === l.id);
      this.selCon.modules.splice(found, 1);
      this.cs.updateContent(this.selCon).subscribe(
         data => {
         this.updateTags();
         }
      );
   }

   /**
    * Description - selects the generated content
    * @param content - the content that needs to be selected
    */
   selectedContent(content: Content) {
      this.selCon = content;

      let subjectToName: string[] = [];

      for (let l of this.selCon.modules) {
         subjectToName.push(this.ms.subjectIdToName.get(l.id));
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
   selectedLinkForRemoval(content: Content, link: Module) {
      this.selCon = content;
      this.selModule = link;
   }

   /**
    * Description - Fills moduleIDs with a list of module Ids from a list of modules
    * @param modules - module list fed in
    */
   returnIdsFromModules(modules: Module[]){
      this.moduleIDs = [];

      for(let i = 0; i < modules.length; i++){
         this.moduleIDs[i] = modules[i].id;
      }
      console.log(modules);
      console.log(this.moduleIDs);
   }


   /**
    * Description - Adds tags to a specific content
    * Grabs the inputted tags and pushes them into the content.links array
    * Then sends a request to the database to update the content.
    */
   updateTags() {
      if (this.selectedTags.length > 0) {
         for (let st of this.selectedTags) {
            this.selCon.modules.push(st);
         }

         this.cs.updateContent(this.selCon).subscribe((response: Content) => {
            this.selCon.modules = response.modules;
         });
      }

      this.selectedTags = [];

   }

   /**
    * Description - set selCon to the content selected for removal, to show title on popup
    */
   selectedContentForRemoval(content: Content) {
      this.selCon = content;
   }

   removeContent() {
      this.cs.deleteContentByID(this.selCon.id).subscribe(
         /**
          * Below is used to refresh this component when a module has been removed 
          */
         data => {
            //this.tablebool = false;
            
            this.ngOnInit();
            this.submitForDelete();
         }
      );
     // this.ngOnInit();
   }


   /**
    * The DoThis function is used to ?????
    * @param contentID 
    * @param moduleID 
    */

   public DoThis(contentID: number, moduleID: number) {
      return ContentFinderPageComponent.generateLinkId(contentID, moduleID);
   }

   public static generateLinkId(contentID: number, moduleID: number) {
      return "contentID-" + contentID + "-moduleID-" + moduleID;
   }

   /**
    * If content for specific module combination cannot
    * be found then allow user to switch to page
    */

   gotoRequest() {
      
   }
}

