import { Component, OnInit } from '@angular/core';
import { Module } from 'src/app/models/Module';
import { ModuleStoreService } from 'src/app/services/module-store.service';
import { ContentFetcherService } from 'src/app/services/content-fetcher.service';
import { MockNgModuleResolver } from '@angular/compiler/testing';
import { Content } from 'src/app/models/Content';
import { Filter } from 'src/app/models/Filter';

@Component({
  selector: 'app-module-index-page',
  templateUrl: './module-index-page.component.html',
  styleUrls: ['./module-index-page.component.css']
})
export class ModuleIndexPageComponent implements OnInit {

  tablebool: boolean = false;
  contents: Content[] = [];
  moduleContents: Map<Module, Content[]> = new Map<Module, Content[]>();

  constructor(
    private cs: ContentFetcherService,
    private ms: ModuleStoreService
  ) { }

  ngOnInit() {
    this.ms.loadModules();
  }

  listContent(module: Module) {
    this.ms.modulebool.set(module, !this.ms.modulebool.get(module));
    console.log(this.ms.modulebool.get(module));
    let filter: Filter = new Filter(
      null, null, [module.id]
    );
    this.cs.filterContent(filter).subscribe(
      (response) => {
        if (response != null) {
          this.parseContentResponse(response, module);
        }else {
          console.log('Response was null');
        }
      },
      (response)=>{
        console.log("Failed to request contents");
      }
    )
  }

  /**
 * Sorts the content's order and then the content's link's order
 * @param response 
 */
  parseContentResponse(response: Content[], module: Module) {
    /* sort contents by their id */
    this.moduleContents.set(module, response.sort(
      (a, b) => { return a.id - b.id }));
  }

}
