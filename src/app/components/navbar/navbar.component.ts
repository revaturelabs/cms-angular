import { Component, OnInit, Output, EventEmitter, HostBinding} from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { ThemechangeService } from '../../services/themechange.service';
import { AppComponent } from 'src/app/app.component';

/**@ignore */
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  

  theme = this.tsc.theme;
  constructor(private tsc:ThemechangeService,private overlayContainer:OverlayContainer, 
    private ac:AppComponent) { }

  @HostBinding('class') componentCssClass;

  onSetTheme(theme) {
    this.overlayContainer.getContainerElement().classList.add(theme);
    this.componentCssClass = theme;
    this.ac.onSetTheme(theme);
  }
  
  ngOnInit() {
  }

  changetheme(theme:string){
    this.tsc.theme=theme;
  }


}
