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

   /* Each string automatically generates button */
   readonly formats: string[] = ["Code", "Document"];
   title: string;
   url: string;
   selFormat: string = "Code";
   description: string;
   // document: string;
   modules: Map<string, Module>;
   subjectNames: string[] = [];  // to display in subject list
   selectedSubjects: string[] = [];  // selected from subject list
   prerequisites: string[] = [];


   constructor(private cs: ContentFetcherService, private ms: ModuleFetcherService) {
   }

   ngOnInit() {
      this.loadModules();
   }

   submit() {

      if(this.title==null||this.selFormat==null||this.description==null||this.url==null||this.selectedSubjects.length==0) {
         alert('Please fill in all input fields!');
      }else {

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
   }

   /* for debugging */
   showSelectedSubjects() {
      console.log(this.selectedSubjects);
   }

   /* load Modules once from backend on program start */
   loadModules() {
      this.modules = new Map<string, Module>();
      this.ms.getAllModules().subscribe(
         // this.ms.getAllFakeModules(this.TEST_URL).subscribe(
         (response) => {
            if (response != null) {
               response.forEach(
                  (module) => {
                     this.modules.set(module.subject, module);
                  }, this
               )
            }
            else console.log("Failed to retrieve any modules.");
         }, (response) => {
            console.log("Failed to send module request.");
         }, () => this.populateSubjectNames()
      )
   }

   /* fill array of subject names on each instantiation */
   populateSubjectNames() {
      this.subjectNames = [];
      for (let subject of Array.from(this.modules.keys())) {
         this.subjectNames.push(subject);
      }
   }

   /* create a new set of links from selected subject names */
   getLinksFromSubjects(subjects: string[]): Link[] {
      let links = [];
      subjects.forEach(
         (subject) => {
            links.push(new Link(null, null,
               this.modules.get(subject).id, null));
         }, this
      )
      return links;
   }

}
