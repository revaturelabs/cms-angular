import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-submit-request-page',
  templateUrl: './submit-request-page.component.html',
  styleUrls: ['./submit-request-page.component.css']
})
export class SubmitRequestPageComponent implements OnInit {
  readonly formats: string[] = ["Code", "Document", "Powerpoint"];
  constructor() { }

  ngOnInit() {
  }

}
