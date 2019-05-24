import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-content-creator-page',
  templateUrl: './content-creator-page.component.html',
  styleUrls: ['./content-creator-page.component.css']
})
export class ContentCreatorPageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  tags:Array<any> = ["BTC","XRP","ETH","BCH","ADA","XEM","LTC","BTC","XRP","ETH","BCH","ADA","XEM","LTC","BTC","XRP","ETH","BCH","ADA","XEM","LTC"];
  selectedTags:Array<any> = [];
  prerequisites:Array<any> = [];
  
  show(){
    console.log(this.selectedTags);
  }

}
