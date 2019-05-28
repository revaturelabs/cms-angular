import { Component, OnInit } from '@angular/core';
import { Content } from 'src/app/models/Content';
import { Module } from 'src/app/models/Module';
import { ContentFetcherService } from 'src/app/services/content-fetcher.service';
import { ModuleFetcherService } from 'src/app/services/module-fetcher.service';
import { Link } from 'src/app/models/Link';

@Component({
   selector: 'app-content-creator-page',
   templateUrl: './content-creator-page.component.html',
   styleUrls: ['./content-creator-page.component.css']
})
export class ContentCreatorPageComponent implements OnInit {

   title: string;
   url: string;
   format: string;
   description: string;
   // document: string;
   modules: Map<string, Module>;
   subjectNames: string[] = [];  // to display in subject list
   selectedSubjects: string[] = [];  // selected from subject list
   prerequisites: string[] = [];


   constructor(private cs: ContentFetcherService, private ms: ModuleFetcherService) {
      this.populateSubjectNames();
   }

   ngOnInit() {
      this.loadModules();
   }

   submit() {
      let content: Content = new Content(
         null, this.title, this.format,
         this.description, this.url,
         this.getLinksFromSubjects(this.selectedSubjects));

      console.log('Sending content:');
      console.log(content);
      this.cs.createNewContent(content).subscribe(
         (response) => {
            if (response != null) {
               console.log('Successfully sent content.');
            } else {
               console.log('Response was null');
            }
         },
         (response) => {
            console.log("Failed to send content");
         }
      )
   }

   /* for debugging */
   showSelectedSubjects() {
      console.log(this.selectedSubjects);
   }

   /* load Modules once from backend on program start */
   loadModules() {
      this.modules = new Map<string, Module>();
      this.ms.getAllModules().subscribe(
         (response) => {
            if (response != null) this.modules.forEach(
               (module) => {
                  this.modules.set(module.getSubject(), module);
               }, this
            )
            else console.log("Failed to retrieve any modules.");
         }, (response) => {
            console.log("Failed to send module request.");
         }
      )
   }

   /* fill array of subject names on each instantiation */
   populateSubjectNames() {
      this.subjectNames = [];
      for (let subject in this.modules) {
         this.subjectNames.push(subject);
      }
   }

   /* create a new set of links from selected subject names */
   getLinksFromSubjects(subjects: string[]): Set<Link> {
      let links = new Set<Link>();
      subjects.forEach(
         (subject) => {
            links.add(new Link(null, null,
               this.modules[subject].getId(), null));
         }
      )
      return links;
   }

}
