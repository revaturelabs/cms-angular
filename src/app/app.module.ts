import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { HttpClientModule } from '@angular/common/http';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { AngularWebStorageModule } from 'angular-web-storage';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContentCreatorPageComponent } from './components/content-creator-page/content-creator-page.component';
import { ContentFinderPageComponent } from './components/content-finder-page/content-finder-page.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ModuleCreatorPageComponent } from './components/module-creator-page/module-creator-page.component';
import { ModuleIndexPageComponent } from './components/module-index-page/module-index-page.component';
import { ReportsPageComponent } from './components/reports-page/reports-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReportsTimeGraphComponent } from './components/reports-time-graph/reports-time-graph.component';
import { CurriculumCreatorPageComponent } from './components/curriculum-creator-page/curriculum-creator-page.component';
import { GlobalReports } from './providers/GlobalReports';
import { CommonModule } from '@angular/common';

import { ToastrModule } from 'ngx-toastr';
import { MatProgressSpinnerModule} from '@angular/material';
import { TreeModule } from 'angular-tree-component';
import { DisplayRequestPageComponent } from './components/display-request-page/display-request-page.component';
import { ResolveRequestPageComponent } from './components/resolve-request-page/resolve-request-page.component';
import { ModuleStoreService } from './services/module-store.service';
import { SubmitRequestPageComponent } from './components/submit-request-page/submit-request-page.component';
import { ModuleIndexSearchPipe } from './pipes/module-index-search.pipe';
import { NewCurriculumDialog, DeleteCurriculumDialog, AddModuleDialog } from './components/curriculum-creator-page/curriculum-creator-page.component';

/** Angular Material Modules */
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTabsModule } from '@angular/material/tabs';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { CurriculumFilterPipe } from './pipes/curriculum-filter.pipe';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CurriculumModuleFilterPipe } from './pipes/curriculum-module-filter.pipe';

/** @ignore */
@NgModule({

    entryComponents: [

        NewCurriculumDialog,
        DeleteCurriculumDialog,
        AddModuleDialog
    ],

    declarations: [
        AppComponent,
        ContentCreatorPageComponent,
        ContentFinderPageComponent,
        NavbarComponent,
        ModuleCreatorPageComponent,
        ModuleIndexPageComponent,
        ReportsPageComponent,
        ReportsTimeGraphComponent,
        DisplayRequestPageComponent,
        ResolveRequestPageComponent,
        SubmitRequestPageComponent,
        ModuleIndexSearchPipe,
        CurriculumCreatorPageComponent,
        CurriculumFilterPipe,
        NewCurriculumDialog,
        DeleteCurriculumDialog,
        AddModuleDialog,
        CurriculumModuleFilterPipe
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        NgSelectModule,
        FormsModule,
        NgxChartsModule,
        BrowserAnimationsModule,
        CommonModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot(),
        MatProgressSpinnerModule,
        TreeModule.forRoot(),
        BrowserModule,
        AngularWebStorageModule,
        DragDropModule,
        MatCardModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatTabsModule,
        MatAutocompleteModule,
        ReactiveFormsModule,
        MatMenuModule,
        MatIconModule,
        MatButtonModule,
        MatInputModule,
        MatToolbarModule,
        MatButtonToggleModule,
        MatTooltipModule,
        MatDialogModule,
        MatGridListModule,
        MatRadioModule,
        MatCheckboxModule
    ],

    providers: [
        GlobalReports,
         ModuleStoreService
    ],

    bootstrap: [AppComponent]
})
export class AppModule { }
