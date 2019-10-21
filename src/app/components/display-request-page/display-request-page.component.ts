import { Filter } from './../../models/Filter';
import { Location, LocationStrategy } from '@angular/common';
import { Module } from './../../models/Module';
import { ModuleStoreService } from './../../services/module-store.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestFetcherService } from 'src/app/services/request-fetcher.service';
import { Request } from 'src/app/models/Request';
import { Router } from '@angular/router';
import { SessionStorageService } from 'angular-web-storage';
import {RequestLink} from '../../models/RequestLink';
import {NgForm} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-display-request-page',
  templateUrl: './display-request-page.component.html',
  styleUrls: ['./display-request-page.component.css'],
  providers: [Location]
})
export class DisplayRequestPageComponent implements OnInit {

  // Module Ids to pass to back-end to filter by
  public moduleIDs: number[];

  // Module names added to filter
  public searchedSubjects: string[] = [];

  // Formats that populate filter radio options
  readonly formats: string[] = ["Code", "Document", "Powerpoint"];

  // Selected format
  public selFormat: string[] = ["Code", "Document", "Powerpoint"];

  // Current requests being displayed
  public req: Request[];

  // Title to be filtered by
  public title: string;

  // Selected from module list
  public selectedSubjects: string[] = [];

  public isSearching = false;

  constructor(
      public session: SessionStorageService,
      private router: Router,
      public rs: RequestFetcherService,
      public ms: ModuleStoreService,
      public location: Location,
      private toastr: ToastrService
  ) {
  }

  ngOnInit() {
    this.ms.loadModules();

    let url = window.location.href;
    if (url.indexOf('?') > -1) {
        // remove non-query part of url
        let query = url.substring(url.indexOf('?') + 1);
        // retrieve title param
        let title = query.substring(query.indexOf('=') + 1, query.indexOf('&'));
        // remove title param from query string
        query = query.substring(query.indexOf('&') + 1);
        // retreive the format param
        let format = query.substring(query.indexOf('=') + 1, query.indexOf('&'));
        // create an array of formats
        let formats = format.split(',');
        // remove the format param from the query string
        query = query.substring(query.indexOf('&') + 1);
        // retrieve the modules param
        let modules = query.substring(query.indexOf('=') + 1);
        // convert modules string into an array of numbers
        let moduleIds = modules.split(',');
        let moduleIdNumbers: number[] = new Array;
        if (0 !== modules.length) {
          for (let i=0; i<moduleIds.length; i++) {
             moduleIdNumbers.push(parseInt(moduleIds[i]))
          }
       }

        // populate a filter object with the params we just extracted
        let filter: Filter = new Filter(
          title, formats, moduleIdNumbers
        );

        this.sendSearch(filter);
    } else {

    this.rs.getAllRequests().subscribe((data: Request[]) => {
      this.req = data;
    });
  }
  }

  //Toggles the select format strings
toggleFormat(format : string){


      
  if(this.selFormat.includes(format)){
     if(this.selFormat.length==1){
        this.toastr.info("You must include at least one format type.");
     }else{
        this.selFormat.splice(this.selFormat.indexOf(format), 1);
     }
  }
  else{
     this.selFormat.push(format);
  }
  
}

  // Method for deleting a request
  removeRequest(id: Request['id']): void {
      this.rs.deleteRequestByID(id).subscribe( data => {
   this.ngOnInit();
  });
}

// Submit filter
submit() {
  this.isSearching = true;
  let format: string[] = this.selFormat;

  
  this.getIDsFromSubjects(this.selectedSubjects);
  const filter: Filter = new Filter(
      this.title, format, this.moduleIDs
  );

  this.updateURL(filter);
  this.searchedSubjects = this.selectedSubjects;
  this.sendSearch(filter);
}

  //
  editRequest($event: any) {
    const id: number = $event.target.value;
    this.session.set('request', JSON.stringify(id));
    this.router.navigate(['resolve-request']);
  }

updateURL(filter: Filter) {
  let url = window.location.href;
  if (url.indexOf('?') > -1) {
     url = url.substring(0, url.indexOf('?'));
  }
  let modules: string = JSON.stringify(filter.modules);
  modules = modules.replace('[', '');
  modules = modules.replace(']', '');
  this.location.replaceState('display-request?title=' + filter.title + '&format=' + filter.format + '&modules=' + modules)
}

getIDsFromSubjects(subjects: string[]) {
  this.moduleIDs = [];
  subjects.forEach(
     (subject) => {
        this.moduleIDs.push(this.ms.subjectNameToModule.get(subject).id);
     }, this
  );
}

sendSearch(filter: Filter) {
  this.searchedSubjects = this.selectedSubjects;

  this.rs.filterContent(filter).subscribe(
     (response) => {
       this.isSearching = false;
       if (response != null) {

          // populate the contents array with the response with the parseContentResponse function
          this.req = response;
          if (response.length === 0) {
            this.toastr.error('No Results Found');

          }
      } else {
          this.toastr.error('Response was null');
      }
     }
  );
}

}
