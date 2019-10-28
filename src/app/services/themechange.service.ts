import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/'

@Injectable({
  providedIn: 'root'
})
export class ThemechangeService {
  private theme1 = new Subject<boolean>();
  theme:string="theme1";
  constructor() { }
}
