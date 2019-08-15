import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PagesService {

  constructor(private view?:Window) { 
  }

  /**
   * Function that refreshes the entire page
   * @param view 
   */
  pageRefresh(view:Window){
    view.location.reload;
  }

}
