import { Component, HostBinding } from '@angular/core';
import { ThemechangeService } from './services/themechange.service';
import { OverlayContainer} from '@angular/cdk/overlay';

/** @ignore */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'cms-force';
  theme = this.tsc.theme;
  constructor(private tsc:ThemechangeService, public overlayContainer: OverlayContainer) { }

  @HostBinding('class') componentCssClass;

public onSetTheme(theme) {
    this.overlayContainer.getContainerElement().classList.add(theme);
    this.componentCssClass = theme;
  }
}
