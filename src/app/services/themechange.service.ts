import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemechangeService {

  public theme:string ='my-theme';
  constructor() { }
}
