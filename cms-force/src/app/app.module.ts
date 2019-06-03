import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContentCreatorPageComponent } from './components/content-creator-page/content-creator-page.component';
import { ContentFinderPageComponent } from './components/content-finder-page/content-finder-page.component';
import { ContentModulePageComponent } from './components/content-module-page/content-module-page.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { EndpointTesterComponent } from './components/endpoint-tester/endpoint-tester.component';
import { ModuleCreaterPageComponent } from './module-creater-page/module-creater-page.component';
import { ModuleCreatorPageComponent } from './components/module-creator-page/module-creator-page.component';


@NgModule({
   declarations: [
      AppComponent,
      ContentCreatorPageComponent,
      ContentFinderPageComponent,
      ContentModulePageComponent,
      NavbarComponent,
      EndpointTesterComponent,
      ModuleCreaterPageComponent,
      ModuleCreatorPageComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      NgSelectModule,
      FormsModule
   ],
   providers: [],
   bootstrap: [AppComponent]
})
export class AppModule { }
