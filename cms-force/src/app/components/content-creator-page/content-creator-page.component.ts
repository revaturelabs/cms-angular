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

   /* On page initialization load the modules to list on the dropdown menu */
   ngOnInit() {
      this.ms.loadModules();
   }

   /**
    * Check if the input fields are all valid - all filled in
    */
   validInput(): boolean {
      let cantBeNull = [this.title, this.selFormat, this.url, this.selectedSubjects.length];

      if (cantBeNull.includes(null) || cantBeNull.includes(undefined)) return false;
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

      this.cs.createNewContent(content).subscribe(
         (response) => {
            if (response != null) {
               alert('Successfully sent content.');
               this.resetVariables();
            } else {
               alert('Response was null');
            }
         },
         (response) => {
            alert("Failed to send content");
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
   }

   /* create a new set of links from selected subject names */
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
    * Takes in the url to check if it has the application protocol like http.
    * See "Url Regex Filter" for more information on this implementation
    * @param url
    */
   validURL(url: string): boolean {
      let regexp: RegExp = /^((http[s]?|ftp):\/\/)(((\w+\.)?\w+\.\w{2,})|(\d{1,3}.\d{1,3}.\d{1,3}.\d{1,3}))(\/[\w-._~:/?#[\]@!$&'()*+,;=]+(\.[\w-._~:/?#[\]@!$&'()*+,;=]+)?)*(\?|\?[\w-._~:/?#[\]@!$&'()*+,;=]+=[\w-._~:/?#[\]@!$&'()*+,;=]*(&[\w-._~:/?#[\]@!$&'()*+,;=]+=[\w-._~:/?#[\]@!$&'()*+,;=]*)*)?(#[\w-._~:/?#[\]@!$&'()*+,;=]*)?\/?$/;

      return regexp.test(url);
   }
}
