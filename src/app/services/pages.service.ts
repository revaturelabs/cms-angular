import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PagesService {
  window:any = window;
  constructor() { 
  }

  /**
   * Function that refreshes the entire page
   * @param view 
   * redundant setup, serves only the purpose of full coverage
   */
  pageRefresh(){
  this.window.location.reload() 
  }

}
