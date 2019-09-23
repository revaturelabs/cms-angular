import { Component, OnInit } from '@angular/core';
import { SessionStorageService } from 'angular-web-storage';
import { Request } from 'src/app/models/Request';
import { Content } from '../../models/Content';
// import { Module } from '../../models/Module';
import { Filter } from '../../models/Filter';
import { Link } from '../../models/Link';
import { ModuleStoreService } from '../../services/module-store.service';
import { ToastrService } from 'ngx-toastr';
import { RequestFetcherService } from 'src/app/services/request-fetcher.service';
import { ContentFetcherService } from '../../services/content-fetcher.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-resolve-request-page',
  templateUrl: './resolve-request-page.component.html',
  styleUrls: ['./resolve-request-page.component.css']
})
export class ResolveRequestPageComponent implements OnInit {

  public reqArr: Request[];
  public request: Request;
  public url: string;
  readonly formats: string[] = ["Code", "Document", "Powerpoint", "Flagged", "All"];
  selectedSubjects: string[] = [];
  searchedSubjects: string[] = [];
  tablebool = false;
  selFormat = 'All';
  contents: Content[];
  moduleIDs: number[];
  isSearching = false;
  title = '';
  public toggle = false;

  constructor(
    private rs: RequestFetcherService, public session: SessionStorageService,
    private cs: ContentFetcherService, public ms: ModuleStoreService,
    public toastr: ToastrService, private location: Location
  ) { }

  ngOnInit() {
    // retrieving the session of previously chosen request that needs to be modified
    console.log(JSON.parse(this.session.get('request')));
    const id = JSON.parse(this.session.get('request'));
    console.log(id);
    this.toggle = true;

    this.rs.getRequestById(id).subscribe((data: Request) => {
      this.request = data;
      console.log(data);
    });

    this.cs.getAllContent().subscribe((data: Content[]) => {
      this.contents = data;
    });
  }

  addurl() {
    this.add = !this.add;
    if (this.add) {

    }
  }

  sendSearch(filter: Filter) {
    this.cs.filterContent(filter).subscribe(
      (response) => {
        if (response != null) {

          // populate the contents array with the response with the parseContentResponse function
          this.parseContentResponse(response);
          if (this.notEmpty()) { } else {
            this.toastr.error('No Results Found');
          }
        } else {
          this.toastr.error('Response was null');
        }
      },
      (response) => {
        this.toastr.error('Failed to send filter');
        this.isSearching = false;
      }
    );
  }

  parseContentResponse(response: Content[]) {
    this.isSearching = false;
    /* Sorts contents by their id */
    this.contents = response.sort(
      (a, b) => a.id - b.id);

    /* Sorts each content's list of links by
    * subject/module name via lookup Map */
    this.contents.forEach(
      (content) => {
        content.links = content.links.sort(
          (a, b) => {
            const sortedIndexA: number = this.ms.subjectIdToSortedIndex.get(a.moduleId);
            const sortedIndexB: number = this.ms.subjectIdToSortedIndex.get(b.moduleId);
            return sortedIndexA - sortedIndexB;
          }
        );
      }, this
    );
  }

  notEmpty(): boolean {
    if (this.contents.length != 0) {
      this.tablebool = true;
      return true;
    } else {
      this.tablebool = false;
      return false;
    }
  }

  getIDsFromSubjects(subjects: string[]) {
    this.moduleIDs = [];
    subjects.forEach(
       (subject) => {
          this.moduleIDs.push(this.ms.subjectNameToModule.get(subject).id);
       }, this
    );
 }

 updateURL(filter: Filter) {
  let url = window.location.href;
  if (url.indexOf('?') > -1) {
     url = url.substring(0, url.indexOf('?'));
  }
  let modules: string = JSON.stringify(filter.modules);
  modules = modules.replace('[', '');
  modules = modules.replace(']', '');
  this.location.replaceState('finder?title=' + filter.title + '&format=' + filter.format + '&modules=' + modules);
}

  submit() {
    this.isSearching = true;
    let format: string = this.selFormat;

    // if 'all' or 'flagged' was selected return all content
    if (format === 'All' || format === 'Flagged') {
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

}
