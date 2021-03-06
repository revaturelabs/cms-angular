import { Component, OnInit } from '@angular/core';
import { Content } from '../../models/Content';
import { Module } from '../../models/Module';
import { Filter } from '../../models/Filter';
import { Curriculum } from '../../models/Curriculum';
import { ContentFetcherService } from '../../services/content-fetcher.service';
import { ModuleStoreService } from '../../services/module-store.service';
import { CurriculumStoreService } from '../../services/curriculum-store.service';
import { ToastrService } from 'ngx-toastr';
import { Link } from '../../models/Link';
import { SelectControlValueAccessor } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Location, LocationStrategy } from '@angular/common';
/** Typescript component for Content Finder page */
@Component({
   selector: 'app-content-finder-page',
   templateUrl: './content-finder-page.component.html',
   styleUrls: ['./content-finder-page.component.css'],
   providers: [Location]
})
export class ContentFinderPageComponent implements OnInit {
   /**
    * Selection of formats to choose betwwen
    */
   readonly formats: string[] = ["Code", "Document", "Powerpoint"];
   /**
    * Title of content
    */
   title: string = "";
   /**
    * Sets defualt for content selection to All
    */
   selFormat: string[] = ["Code", "Document", "Powerpoint"];

   /**
    * Array of contents
    */
   contents: Content[];

   /**
    * Hides table for contents until Find content is clicked and content is available
    */
   tablebool: boolean = false;

   /**
    * If a search shows no results, then it should show a link to make a request for content
    */
   noResultSearch: boolean = false;

   /**
    * Stores the tags
    */
   moduleIDs: number[];

   /**
    * Stores the Curriculum id's
    */
   curriculumIDs: number[];

   /** Map of Visibility status of each Module */
   contentVisible: Map<Module, boolean> = new Map<Module, boolean>();


   /**
    * Selected from subject list
    */
   selectedSubjects: string[] = [];

   /**
    * Selected from curriculum list
    */
   selectedCurricula: string[] = [];

   /**
    * Holds the links that will be applied to a content
    */
   selectedTags: string[] = [];

   /**
    * Holds a reference of a content being worked upon
    */
   //Note that this needs defualt values so the bindings {{}} in html will work on page load
   selCon: Content = new Content(0, "", "", "", "", []);

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
      public crs: CurriculumStoreService,
      private toastr: ToastrService,
      private location: Location
   ) { }

   /**
    * On page initialization load the modules to list on the dropdown menu 
    */
   ngOnInit() {
      this.ms.loadModules();
      this.crs.loadCurricula();

      //gets search parameters from url if they exhist
      let url = window.location.href;
      this.createSearch(url.indexOf('?'),url);
   }


   createSearch(n:number,url:any){

      if (n > -1) {
         //remove non-query part of url
         let query = url.substring(url.indexOf('?') + 1);
         //retrieve title param
         let title = query.substring(query.indexOf('=') + 1, query.indexOf('&'));
         //remove title param from query string
         query = query.substring(query.indexOf('&') + 1);
         //retreive the format param
         let format = query.substring(query.indexOf('=') + 1, query.indexOf('&'));
         //set the formats into an array
         let formats = format.split(',');
         //remove the format param from the query string
         query = query.substring(query.indexOf('&') + 1);
         //retrieve the modules param
         let modules = query.substring(query.indexOf('=') + 1);
         //convert modules string into an array of numbers
         let moduleIds = modules.split(',');
         let moduleIdNumbers: number[] = new Array();
         //retrieve the curricula param
         let curricula = query.substring(query.indexOf('=') + 1);
         //convert curricula string into an array of numbers
         let curriculaIds = curricula.split(',');
         let curriculaIdNumbers: number[] = new Array();
        
         if (0 !== modules.length) {
            for (let i=0; i<moduleIds.length; i++) {

               moduleIdNumbers.push(parseInt(moduleIds[i]))
            }
         }

         if (0 !== curricula.length) {
            for (let i=0; i<curriculaIds.length; i++) {

               curriculaIdNumbers.push(parseInt(curriculaIds[i]))
            }
         }
         
         //populate a filter object with the params we just extracted
         let filter: Filter = new Filter(
            title, formats, moduleIdNumbers, curriculaIdNumbers
         );

         this.sendSearch(filter);

      }
   }

   /**
    * Description: Adds/removes a format from selFormat array object.
    * @param format Format to be added/removed, corresponds with button clicked.
    */
   toggleFormat(format : string){   
      if(this.selFormat.includes(format)){
         if(this.selFormat.length==1){
            this.toastr.info("You must include at least one format type.");
         }else{
            this.selFormat.splice(this.selFormat.indexOf(format), 1);
         }
      }
      else{
         this.selFormat.push(format);
      }    
   }

   /**
    * Submit function that takes in all input and puts it into a filter object
    * to subscribe method. If the request was successful then it will get the
    * response as the array of content and populate the table and print it.
    */
   submit() {
      this.isSearching = true;
      let format: string[] = this.selFormat;
      
      this.getIDsFromSubjects(this.selectedSubjects);
      this.getIDsFromCurricula(this.selectedCurricula);
      
      let filter: Filter = new Filter(
         this.title, format, this.moduleIDs, this.curriculumIDs
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
               if (this.notEmpty()) {
                }
               else {
                  this.toastr.error('No Results Found');
               }
            } else {
               this.toastr.error('Response was null');
            }
            
         },
         (error) => {
            this.toastr.error('Failed to send filter');
            this.isSearching = false;
         }
      )
   }

   updateURL(filter: Filter) {
    
      let modules: string = JSON.stringify(filter.modules);
      let curricula: string = JSON.stringify(filter.curricula);
      let formats: string = JSON.stringify(filter.format);
      modules = modules.replace('[','');
      modules = modules.replace(']','');
      curricula = curricula.replace('[','');
      curricula = curricula.replace(']','');
      formats = formats.replace('[','');
      formats = formats.replace(']','');
      formats = formats.replace(/"/g, '');
      this.location.replaceState("finder?title=" + filter.title + "&format=" + formats + "&modules=" + modules + "&curricula=" + curricula)
   }
   
   submitForDelete() {
      this.isSearching = true;
      let format: string[] = this.selFormat;

      this.getIDsFromSubjects(this.selectedSubjects);
      let filter: Filter = new Filter(
         this.title, format, this.moduleIDs, this.curriculumIDs
      );
      this.searchedSubjects = this.selectedSubjects;

      this.cs.filterContent(filter).subscribe(
         (response) => {
            if (response != null) {

               //populate the contents array with the response with the parseContentResponse function
               this.parseContentResponse(response);
               
            } else {
               this.toastr.error('Response was null');
            }
         },
         (error) => {
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
                  
                  let sortedIndexA: number = this.ms.subjectIdToSortedIndex.get(a.module.id);
                  
                  let sortedIndexB: number = this.ms.subjectIdToSortedIndex.get(b.module.id);
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
      this.selFormat = ["Code", "Document", "Powerpoint"];
      this.selectedSubjects = [];
      this.selectedCurricula = [];
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
      );
   }

   getIDsFromCurricula(curricula: string[]){
      this.curriculumIDs = [];
      curricula.forEach(
         (curriculum) => {
            this.curriculumIDs.push(this.crs.nameToCurriculum.get(curriculum).id);
         }, this
      );
   }

   /**
    * Description - This method deletes a link between a content and a module
    */
   removeTag() {
      this.cs.removeLinkFromContent(this.selLink.id).subscribe( () => {
            this.submit();
      });
   }

   /**
    * Description - selects the generated content
    * @param content - the content that needs to be selected
    */
   selectedContent(content: Content) {
      this.selCon = content;

      let subjectToName: string[] = [];
      for (let l of this.selCon.links) {
         subjectToName.push(this.ms.subjectIdToName.get(l.module.id));
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
   selectedLinkForRemoval(content: Content, link: Link) {
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
               links.push(new Link(null, new Content(this.selCon.id,'','','','',[]), this.ms.subjectNameToModule.get(subject), null, -1));
            }, this
         )
         this.selCon.links = links;
         this.cs.updateContent(this.selCon).subscribe((response: Content) => {
         });
         this.cs.addLinkToContent(this.selCon).subscribe((response: Link[]) => {
            this.selCon.links = response;
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
   }


   /**
    * The DoThis function is used to ?????
    * @param contentID 
    * @param linkID 
    */

   public DoThis(contentID: number, linkID: number) {
      return ContentFinderPageComponent.generateLinkId(contentID, linkID);
   }

   public static generateLinkId(contentID: number, linkID: number) {
      return "contentID-" + contentID + "-linkID-" + linkID;
   }

   /**
    * To do: This method is supposed to fill out a request for content
    * based on the failed search
    */

   gotoRequest() {
      // To do: get the search parameters and actually fill out a request form
   }
}

