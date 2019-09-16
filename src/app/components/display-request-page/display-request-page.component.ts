import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestFetcherService } from 'src/app/services/request-fetcher.service';
import { Request } from 'src/app/models/Request';

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
  public format: string;
  public description: string;
  public url: string;
  public req: Request[];

  constructor(
    private rs: RequestFetcherService
  ) { }

  ngOnInit() {
    // On initialization we pull in all the requests so that they can be populated within a table
    this.rs.getAllRequests().subscribe((data: Request[]) => {
      this.req = data ;
      console.log(this.req);
    });
  }

  // Method for deleting a request
  removeRequest(id: Request['id']): void {
    this.rs.deleteRequestById(id);
    // this.rs.deleteRequestById(id).subscribe( data => {
    //   this.req.filter( i => i !== id );
    // });
  }

}
