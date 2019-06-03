import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions, RunGuardsAndResolvers } from '@angular/router';
import { ContentCreatorPageComponent } from './components/content-creator-page/content-creator-page.component';
import { ContentFinderPageComponent } from './components/content-finder-page/content-finder-page.component';
import { EndpointTesterComponent } from './components/endpoint-tester/endpoint-tester.component';
import { from } from 'rxjs';
import { ModuleCreatorPageComponent } from './components/module-creator-page/module-creator-page.component';

const routes: Routes = [
   { path: '', redirectTo: '/creator', pathMatch: 'full' },   // home page
   { path: 'creator', component: ContentCreatorPageComponent, pathMatch: 'full' },
   { path: 'finder', component: ContentFinderPageComponent, pathMatch: 'full' },
   { path: 'module', component: ModuleCreatorPageComponent, pathMatch: 'full' },
   { path: 'endpoint_tester', component: EndpointTesterComponent, pathMatch: 'full' },
   { path: '**', redirectTo: '/creator', pathMatch: 'full' }    // when invalid url entered
];

const extraOptions: ExtraOptions = {
   enableTracing: false,
   scrollPositionRestoration: 'enabled'
};

@NgModule({
   imports: [RouterModule.forRoot(routes, extraOptions)],
   exports: [RouterModule]
})
export class AppRoutingModule { }
