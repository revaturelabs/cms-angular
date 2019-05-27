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

  constructor(private cs: ContentFetcherService) { }

  title: string;
  format: string;
  description: string;
  url: string;
  modules: Module[];

  ngOnInit() {
  }

  submit(){
    let content: Content = new Content(null, this.title, this.format, this.description, this.url);

    this.toModule(this.selectedTags);

    let cw:ContentWrapper = new ContentWrapper(content, this.modules);

    this.cs.createNewContent(cw).subscribe(
      (response)=>{
        if(response != null){
          //Success
        }else{
          //FAILURE GETTING RESPONSE
        }
      },
      (response)=>{
        //FAILURE TO SUBSCRIBE
      }
    )
  }

  tags:Array<any> = ["Java","SQL","HTML","CSS","JavaScript","Angular","TypeScript","Spring","Spring Data","Spring Boot","git","Agile","Microservices"];
  selectedTags:Array<any> = [];
  prerequisites:Array<any> = [];
  
  show(){
    console.log(this.selectedTags);
  }

  toModule(selectedTags){
    selectedTags.forEach(function (value){
      let model: Module = new Module(null, value, null);
      this.modules.push(model);
    });
  }

}
