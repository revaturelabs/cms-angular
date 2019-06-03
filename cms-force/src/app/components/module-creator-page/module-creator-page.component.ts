import { Component, OnInit } from '@angular/core';
import { Module } from 'module';

@Component({
  selector: 'app-module-creator-page',
  templateUrl: './module-creator-page.component.html',
  styleUrls: ['./module-creator-page.component.css']
})
export class ModuleCreatorPageComponent implements OnInit {

  subject: String;

  constructor() { }

  ngOnInit() {
  }

  /**
   * Makes the observable call by creating a module object with the inputted subject field
   * with HTTP GET from the services
   */
  submit(){

    if(this.subject==null){
      alert('Please fill in the input field!');
      return;
    }//If input field is null alert the user

    let module: Module = new Module(
      1, this.subject, 1, []
      )

  }

}
