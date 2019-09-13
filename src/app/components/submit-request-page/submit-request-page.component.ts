import { Component, OnInit } from '@angular/core';
import { ModuleStoreService } from '../../services/module-store.service';
import { Filter } from '../../models/Filter';

@Component({
  selector: 'app-submit-request-page',
  templateUrl: './submit-request-page.component.html',
  styleUrls: ['./submit-request-page.component.css']
})
export class SubmitRequestPageComponent implements OnInit {
  //Document format types 
  readonly formats: string[] = ["Code", "Document", "Powerpoint"];

  //Selected from subject list
  selectedSubjects: string[] = [];

  constructor(
    public ms: ModuleStoreService
  ) { }

  //Load Modules on-page-load for dropdown menu
  ngOnInit() {
    this.ms.loadModules();

      //gets search parameters from url if they exist
      let url = window.location.href;
      if (url.indexOf('?') > -1) {
         //remove non-query part of url
         let query = url.substring(url.indexOf('?') + 1);

         //retrieve title param
         let title = query.substring(query.indexOf('=') + 1, query.indexOf('&'));

         //remove title param from query string
         query = query.substring(query.indexOf('&') + 1);

         //retreive the format param
         let format = query.substring(query.indexOf('=') + 1, query.indexOf('&'));

         //remove the format param from the query string
         query = query.substring(query.indexOf('&') + 1);

         //retrieve the modules param
         let modules = query.substring(query.indexOf('=') + 1);

         //convert modules string into an array of numbers
         let moduleIds = modules.split(',');
         let moduleIdNumbers: number[] = new Array;
         for (let i=0; i<moduleIds.length; i++) {
            moduleIdNumbers.push(parseInt(moduleIds[i]))
         }

         //populate a filter object with the params we just extracted
         let filter: Filter = new Filter(
            title, format, moduleIdNumbers
         );

      }
  }

}
