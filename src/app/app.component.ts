import { Component } from '@angular/core';
import { ThemechangeService } from './services/themechange.service';


/** @ignore */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cms-force';

  constructor(private tsc:ThemechangeService) { }
  theme = this.tsc.theme;

}
