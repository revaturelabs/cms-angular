import { Component, OnInit } from '@angular/core';
import { Module } from 'src/app/models/Module';
import { ModuleStoreService } from 'src/app/services/module-store.service';

@Component({
  selector: 'app-module-index-page',
  templateUrl: './module-index-page.component.html',
  styleUrls: ['./module-index-page.component.css']
})
export class ModuleIndexPageComponent implements OnInit {

  modules: Module[] = [];

  constructor(
    private ms: ModuleStoreService
  ) { }

  ngOnInit() {
    console.log('Ngoninit');
    // this.ms.loadModules();
    // console.log(this.ms.response);
    // this.modules = this.ms.response;
    // console.log(this.modules);
  }

  listContent(module: Module){
    
  }

}
