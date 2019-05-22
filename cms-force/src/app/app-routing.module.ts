import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContentCreatorPageComponent } from './components/content-creator-page/content-creator-page.component';
import { ContentFinderPageComponent } from './components/content-finder-page/content-finder-page.component';

const routes: Routes = [
   { path: '', redirectTo: '/creator', pathMatch: 'full' },
   { path: 'creator', component: ContentCreatorPageComponent },
   { path: 'finder', component: ContentFinderPageComponent }
];

@NgModule({
   imports: [RouterModule.forRoot(routes)],
   exports: [RouterModule]
})
export class AppRoutingModule { }
