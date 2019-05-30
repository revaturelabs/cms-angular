import { Component, OnInit } from '@angular/core';
import { Content } from 'src/app/models/Content';
import { ContentFetcherService } from 'src/app/services/content-fetcher.service';
import { Link } from 'src/app/models/Link';
import { ModuleStoreService } from 'src/app/services/module-store.service';

@Component({
   selector: 'app-content-creator-page',
   templateUrl: './content-creator-page.component.html',
   styleUrls: ['./content-creator-page.component.css']
})
export class ContentCreatorPageComponent implements OnInit {

   /* Each format string automatically generates button */
   readonly formats: string[] = ["Code", "Document"];
   title: string;
   url: string;
   selFormat: string = "Code";
   description: string;
   // document: string;
   selectedSubjects: string[] = [];  // selected from subject list
   // prerequisites: string[] = [];

   constructor(
      private cs: ContentFetcherService,
      private ms: ModuleStoreService) {
   }

   ngOnInit() {
      this.ms.loadModules();
   }

   /**
    * Check if the input fields are all valid - all filled in
    */
   validInput(): boolean {
      let inputs = [this.title, this.selFormat, this.url, this.selectedSubjects.length];

      if (inputs.includes(null) || inputs.includes(undefined)) return false;
      if (this.selectedSubjects.length == 0) return false;
      return true;
   }

   /**
    * Submit the content object which has the input fields and the list of tags as link array
    * where the link has it's subject id populated and the rest set to default value
    */
   submit() {

      if (!this.validInput()) {
         alert('Please fill in all input fields!');
         return;
      } else if (!this.validURL(this.url)) {
         alert('Invalid URL. e.g. "http://example.com", "ftp://www.example.com", "http://192.168.0.0"');
         return;
      }

      let content: Content = new Content(
         null, this.title, this.selFormat,
         this.description, this.url,
         this.getLinksFromSubjects(this.selectedSubjects));

      console.log('Sending content:');
      console.log(content);
      console.log(JSON.stringify(content));
      this.cs.createNewContent(content).subscribe(
         (response) => {
            if (response != null) {
               alert('Successfully sent content.');
               this.resetVariables();
            } else {
               console.log('Response was null');
            }
         },
         (response) => {
            alert("Failed to send content");
         }
      )
   }

   resetVariables() {
      this.title = null;
      this.url = null;
      this.selFormat = "Code";
      this.description = null;
      this.selectedSubjects = [];
   }

   /* for debugging */
   showSelectedSubjects() {
      console.log(this.selectedSubjects);
   }



   /* create a new set of links from selected subject names */
   getLinksFromSubjects(subjects: string[]): Link[] {
      let links = [];
      subjects.forEach(
         (subject) => {
            links.push(new Link(null, null,
               this.ms.modules.get(subject).id, null));
         }, this
      )
      return links;
   }

   printArrays() {
      console.log(this.ms.modules);
      console.log(this.ms.subjectIdToNameMap);
      console.log(this.ms.subjectNames);
   }

   validURL(url: string): boolean {
      let regexp: RegExp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;

      return regexp.test(url);
   }
}
