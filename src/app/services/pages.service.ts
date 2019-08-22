import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PagesService {

  constructor() { 
  }

  /**
   * Function that refreshes the entire page
   * @param view 
   */
  pageRefresh(){
    window.location.reload();
    
  }

}
