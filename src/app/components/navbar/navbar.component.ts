import { Component, OnInit, Output, EventEmitter, HostBinding} from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { ThemechangeService } from '../../services/themechange.service';

/**@ignore */
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Output() public sidenavToggle = new EventEmitter();

  constructor(private tsc:ThemechangeService,private overlayerContainer:OverlayContainer) { }
  /**@ignore */
  ngOnInit() {
  }

  changetheme(theme:string){
    this.tsc.theme=theme;
  }
  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }
}
