import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-content-finder-page',
  templateUrl: './content-finder-page.component.html',
  styleUrls: ['./content-finder-page.component.css']
})
export class ContentFinderPageComponent implements OnInit {

  title: string;
  format: string;
  modules: string[];


  constructor() { }

  ngOnInit() {
  }

}
