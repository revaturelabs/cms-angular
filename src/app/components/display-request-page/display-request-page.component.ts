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
  readonly formats: string[] = ["All","Code", "Document", "Powerpoint"];

  // Selected format
  public selFormat: string = "All";

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
    this.rs.getAllRequests().subscribe((data: Request[]) => {
      this.req = data;
    });
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
  let format: string = this.selFormat;

      // if 'all' was selected return all content
  if (format === "All") {
      format = '';
  }
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
    console.log(id);
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
        console.log(this.moduleIDs);
     }, this
  );
}

sendSearch(filter: Filter) {
  this.searchedSubjects = this.selectedSubjects;

  this.rs.filterContent(filter).subscribe(
     (response) => {
       console.log(response);
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
