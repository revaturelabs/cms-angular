import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';
import { ContentCreatorPageComponent } from './components/content-creator-page/content-creator-page.component';
import { ContentFinderPageComponent } from './components/content-finder-page/content-finder-page.component';
import { ModuleCreatorPageComponent } from './components/module-creator-page/module-creator-page.component';
import { ModuleIndexPageComponent } from './components/module-index-page/module-index-page.component';
import { ReportsPageComponent } from './components/reports-page/reports-page.component';

/** @ignore */
const routes: Routes = [
   { path: '', redirectTo: '/content-creator', pathMatch: 'full' },
   { path: 'content-creator', component: ContentCreatorPageComponent, pathMatch: 'full' },
   { path: 'finder', component: ContentFinderPageComponent, pathMatch: 'full' },
   { path: 'module-creator', component: ModuleCreatorPageComponent, pathMatch: 'full' },
   { path: 'module-index', component: ModuleIndexPageComponent, pathMatch: 'full' },
   { path: 'reports', component: ReportsPageComponent},
   { path: '**', redirectTo: '/content-creator', pathMatch: 'full' }
];

/** @ignore */
const extraOptions: ExtraOptions = {
   enableTracing: false,
   scrollPositionRestoration: 'enabled'
};

/** @ignore */
@NgModule({
   imports: [RouterModule.forRoot(routes, extraOptions)],
   exports: [RouterModule]
})
export class AppRoutingModule { }
