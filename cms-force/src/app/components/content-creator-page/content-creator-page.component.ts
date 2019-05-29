import { Component, OnInit } from '@angular/core';
import { Content } from 'src/app/models/Content';
import { Module } from 'src/app/models/Module';
import { ContentFetcherService } from 'src/app/services/content-fetcher.service';
import { ModuleFetcherService } from 'src/app/services/module-fetcher.service';
import { Link } from 'src/app/models/Link';
import { ModuleStoreService } from 'src/app/services/module-store.service';

@Component({
   selector: 'app-content-creator-page',
   templateUrl: './content-creator-page.component.html',
   styleUrls: ['./content-creator-page.component.css']
})
export class ContentCreatorPageComponent implements OnInit {

   /* Each string automatically generates button */
   readonly formats: string[] = ["Code", "Document"];
   title: string;
   url: string;
   selFormat: string = "Code";
   description: string;
   // document: string;
   selectedSubjects: string[] = [];  // selected from subject list
   prerequisites: string[] = [];


   constructor(
      private cs: ContentFetcherService,
      private ms: ModuleStoreService) {
   }

   ngOnInit() {
      this.ms.loadModules();
   }

   validInput(): boolean {
      let inputs = [this.title, this.selFormat, this.description, this.url, this.selectedSubjects.length];

      if (inputs.includes(null) || inputs.includes(undefined)) return false;
      if (this.selectedSubjects.length == 0) return false;
      return true;
   }

   submit() {

      if (!this.validInput()) {
         alert('Please fill in all input fields!');
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
            } else {
               console.log('Response was null');
            }
         },
         (response) => {
            alert("Failed to send content");
         }
      )
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

}
