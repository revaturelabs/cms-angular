import { Component, OnInit } from '@angular/core';
import { Content } from 'src/app/models/Content';
import { ContentFetcherService } from 'src/app/services/content-fetcher.service';
import { Link } from 'src/app/models/Link';
import { ModuleStoreService } from 'src/app/services/module-store.service';
import { ToastrService } from 'ngx-toastr';

/** Typescript component for the Content Creator page */
@Component({
   selector: 'app-content-creator-page',
   templateUrl: './content-creator-page.component.html',
   styleUrls: ['./content-creator-page.component.css']
})
export class ContentCreatorPageComponent implements OnInit {

   /**
    * Each format string automatically generates button 
    */
   readonly formats: string[] = ["Code", "Document", "Powerpoint"];

   /**
    * Title of content
    */
   title: string;

   /**
    * Url of content
    */
   url: string;

   /**
    * Used for radio selection for content (Ex. Powerpoint, code, etc)
    */
   selFormat: string = "Code";

   /**
    * Description of content
    */
   description: string;

   /**
    * Description - boolean to display a spinner for submitting in progress
    */
   isSubmitting: boolean = false;

   /**
    * Stores selected subjects
    */
   selectedSubjects: string[] = [];  

   /**
    *  Content creater constructor 
    * @param cs Content Fetcher
    * @param ms Module Store
    */
   constructor(
      private cs: ContentFetcherService,
      public ms: ModuleStoreService,
      private toastr: ToastrService
      ) {
   }

   /** On page initialization load the modules to list on the dropdown menu 
   */
   ngOnInit() {
      this.ms.loadModules();
   }



   /**
    * Check if the input fields are all valid - all filled in
    */
   validInput(): boolean {
      this.isSubmitting = false;
      let cantBeNull = [this.title, this.selFormat, this.url, this.selectedSubjects.length];

      if (cantBeNull.includes(null) || cantBeNull.includes(undefined)) return false;
      if (this.selectedSubjects.length == 0) return false;
      return true;
   }

   /**
    * Submit the content object which has the input fields and the list of tags as link array
    * where the link has its subject id populated and the rest are set to default values
    */
   submit() {
      this.isSubmitting = true;
      if (!this.validInput()) {
         this.toastr.error('Please fill in all input fields!');
         return;
      } else if (!this.validURL(this.url)) {
         this.toastr.error('Invalid URL. e.g. "http://example.com", "ftp://www.example.com", "http://192.168.0.0"');
         return;
      }

      let content: Content = new Content(
         null, this.title, this.selFormat,
         this.description, this.url,
         this.getLinksFromSubjects(this.selectedSubjects));

      this.cs.createNewContent(content).subscribe(
         (response) => {
            if (response != null) {
               this.toastr.success('Successfully sent content.');
               this.resetVariables();
            } else {
               this.toastr.error('Response was null.');
               this.isSubmitting = false;
            }
         },
         (response) => {
            this.toastr.error('Failed to send content.');
            this.isSubmitting = false;
         }
      )
   }

   /**
    * Clears the input fields after successful content submit
    */
   resetVariables() {
      this.title = null;
      this.url = null;
      this.selFormat = "Code";
      this.description = null;
      this.selectedSubjects = [];
      this.isSubmitting = false;
   }

   
   /**
    * Creates a new set of links from selected subject names
    * 
    * @param {string[]} subjects List/array of selected subjects subjects
    * @returns A new set of links.
    */
   getLinksFromSubjects(subjects: string[]): Link[] {
      let links = [];
      subjects.forEach(
         (subject) => {
            links.push(new Link(null, null,
               this.ms.subjectNameToModule.get(subject).id, null));
         }, this
      )
      return links;
   }

   /**
    * Takes in the url to check if it matches the application protocol such as http
    * See "Url Regex Filter" for more information on this implementation
    * 
    * @param {string} url Url of content
    * @returns True if url is valid, false if not valid.
    */
   validURL(url: string): boolean {
      let regexp: RegExp = /^((http[s]?|ftp):\/\/)(((\w+\.)?\w+\.\w{2,})|(\d{1,3}.\d{1,3}.\d{1,3}.\d{1,3}))(\/[\w-._~:/?#[\]@!$&'()*+,;=]+(\.[\w-._~:/?#[\]@!$&'()*+,;=]+)?)*(\?|\?[\w-._~:/?#[\]@!$&'()*+,;=]+=[\w-._~:/?#[\]@!$&'()*+,;=]*(&[\w-._~:/?#[\]@!$&'()*+,;=]+=[\w-._~:/?#[\]@!$&'()*+,;=]*)*)?(#[\w-._~:/?#[\]@!$&'()*+,;=]*)?\/?$/;
      this.isSubmitting = false;
      return regexp.test(url);
   }
}
