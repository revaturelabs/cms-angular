import { Component, OnInit } from '@angular/core';
import {SessionStorageService} from 'angular-web-storage';
import { Request } from 'src/app/models/Request';
import { RequestFetcherService } from 'src/app/services/request-fetcher.service';

@Component({
  selector: 'app-resolve-request-page',
  templateUrl: './resolve-request-page.component.html',
  styleUrls: ['./resolve-request-page.component.css']
})
export class ResolveRequestPageComponent implements OnInit {

  constructor(
    private rs: RequestFetcherService, public session: SessionStorageService
  ) { }

  ngOnInit() {
    console.log(JSON.parse(this.session.get('request')));
  }

}
