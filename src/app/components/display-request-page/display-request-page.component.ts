import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestFetcherService } from 'src/app/services/request-fetcher.service';
import { Request } from 'src/app/models/Request';
import { Router } from '@angular/router';
import {NgForm} from '@angular/forms';
import { SessionStorageService } from 'angular-web-storage';

@Component({
  selector: 'app-display-request-page',
  templateUrl: './display-request-page.component.html',
  styleUrls: ['./display-request-page.component.css']
})
export class DisplayRequestPageComponent implements OnInit {

  poptable: Observable<any[]>;
  columns: string[];
  test: string[];

  public id: number;
  public format = '';
  public req: Request[];
  public filter = new Request(1, '', '', '', null, []);

  constructor(
      private rs: RequestFetcherService, public session: SessionStorageService, private router: Router
  ) {
  }

  ngOnInit() {
    // On initialization we pull in all the requests so that they can be populated within a table
    this.rs.getAllRequests().subscribe((data: Request[]) => {
      this.req = data;
      console.log(this.req);
      console.log(data);
    });
  }

  onFilterChange(event: NgForm) {
    this.filter = new Request(1, '', this.format, '', null, []);
  }

  //
  editRequest($event: any) {
    const id: number = $event.target.value;
    console.log(id);
    this.session.set('request', JSON.stringify(id));
    this.router.navigate(['resolve-request']);
  }

  // Method for deleting a request
  removeRequest(id: Request['id']): void {
    this.rs.deleteRequestById(id);
    // this.rs.deleteRequestById(id).subscribe( data => {
    //   this.req.filter( i => i !== id );
    // });
  }

}
