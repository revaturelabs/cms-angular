import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';
import { ContentCreatorPageComponent } from './components/content-creator-page/content-creator-page.component';
import { ContentFinderPageComponent } from './components/content-finder-page/content-finder-page.component';
import { ModuleCreatorPageComponent } from './components/module-creator-page/module-creator-page.component';
import { ModuleIndexPageComponent } from './components/module-index-page/module-index-page.component';

const routes: Routes = [
   { path: '', redirectTo: '/content-creator', pathMatch: 'full' },   // home page
   { path: 'content-creator', component: ContentCreatorPageComponent, pathMatch: 'full' },
   { path: 'finder', component: ContentFinderPageComponent, pathMatch: 'full' },
   { path: 'module-creator', component: ModuleCreatorPageComponent, pathMatch: 'full' },
   { path: 'module-index', component: ModuleIndexPageComponent, pathMatch: 'full' },
   { path: '**', redirectTo: '/content-creator', pathMatch: 'full' }   // when invalid url entered
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
