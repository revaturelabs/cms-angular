import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { ThemechangeService } from '../../services/themechange.service';

/**@ignore */
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Output() public sidenavToggle = new EventEmitter();

  constructor(private ThemechangeService:ThemechangeService) { }

  /**@ignore */
  ngOnInit() {
  }

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }
}
