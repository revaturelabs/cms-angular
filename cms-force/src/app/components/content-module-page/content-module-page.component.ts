import { Component, OnInit } from '@angular/core';
import { Content } from 'src/app/models/Content';
import { ContentFetcherService } from 'src/app/services/content-fetcher.service';
import { Link } from 'src/app/models/Link';
import { ModuleStoreService } from 'src/app/services/module-store.service';

@Component({
  selector: 'app-content-module-page',
  templateUrl: './content-module-page.component.html',
  styleUrls: ['./content-module-page.component.css']
})
export class ContentModulePageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
