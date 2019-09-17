import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestFetcherService } from 'src/app/services/request-fetcher.service';
import { Request } from 'src/app/models/Request';
import {NgForm} from '@angular/forms';

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
  public title: string;
  public format = '';
  public description: string;
  public url: string;
  public req: Request[];
  public filter = new Request(1, '', '', '', null, []);

  constructor(
      private rs: RequestFetcherService
  ) {
  }

  ngOnInit() {
    // On initialization we pull in all the requests so that they can be populated within a table
    this.rs.getAllRequests().subscribe((data: Request[]) => {
      this.req = data;
      console.log(this.req);
    });
  }

  onFilterChange(event: NgForm) {
    this.filter = new Request(1, '', this.format, '', null, []);
  }

  // Method for deleting a request

  removeRequest(id: Request['id']): void {
    this.rs.deleteRequestById(id);
    // this.rs.deleteRequestById(id).subscribe( data => {
    //   this.req.filter( i => i !== id );
    // });
  }

}
