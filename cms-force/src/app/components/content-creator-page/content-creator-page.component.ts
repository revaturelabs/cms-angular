import { Component, OnInit } from '@angular/core';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import { Module } from 'src/app/models/Module';
import { ModuleFetcherService } from 'src/app/services/module-fetcher.service';

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
    let content: Content = new Content(0, this.title, this.format, this.description, this.url, this.modules);

    this.toModule(this.selectedTags);

    

    this.cs.createNewContent(content).subscribe(
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
