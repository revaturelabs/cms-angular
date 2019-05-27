import { Component, OnInit } from '@angular/core';
import { Content } from 'src/app/models/Content';
import { Module } from 'src/app/models/Module';
import { ModuleFetcherService } from 'src/app/services/module-fetcher.service';
import { ContentWrapper } from 'src/app/models/ContentWrapper';
import { ContentFetcherService } from 'src/app/services/content-fetcher.service';

@Component({
   selector: 'app-content-creator-page',
   templateUrl: './content-creator-page.component.html',
   styleUrls: ['./content-creator-page.component.css']
})
export class ContentCreatorPageComponent implements OnInit {

   readonly tags: string[] = [
      'Java', 'SQL', 'HTML', 'CSS',
      'JavaScript', 'Angular', 'TypeScript',
      'Spring', 'Spring Data', 'Spring Boot',
      'git', 'Agile', 'Microservices'];

   title: string;
   url: string;
   code: string;
   description: string;
   // document: string;
   modules: Module[] = [];
   selectedTags: string[] = [];
   prerequisites: string[] = [];

   constructor(private cs: ContentFetcherService) { }

   ngOnInit() {
   }
   submit(title: string, url: string, code: string, description: string) {
      let content: Content = new Content(null, title, code, description, url);
      console.log(content);
      console.log(this.selectedTags);
      this.toModule();

      let cw: ContentWrapper = new ContentWrapper(content, this.modules);

      console.log(cw);

      this.cs.createNewContent(cw).subscribe(
         (response) => {
            if (response != null) {
               //Success
            } else {
               //FAILURE GETTING RESPONSE
            }
         },
         (response) => {
            //FAILURE TO SUBSCRIBE
         }
      )
   }


   show() {
      console.log(this.selectedTags);
   }

   toModule() {
      this.selectedTags.forEach(function (value) {
         let module: Module = new Module(null, value, null);
         console.log(module);
         this.modules.push(module);
      }, this);
   }

}
