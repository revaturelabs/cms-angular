import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs/'

@Injectable({
  providedIn: 'root'
})
export class ThemechangeService {
  isTheme1: Observable<boolean>;

  constructor() { }

  private theme1 = new Subject<boolean>();
  theme:string="theme1";
}
