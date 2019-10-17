import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { MatProgressSpinnerModule} from '@angular/material';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';

import { ModuleFetcherService } from 'src/app/services/module-fetcher.service';
import { ContentFetcherService } from 'src/app/services/content-fetcher.service';
import { ModuleIndexPageComponent } from './module-index-page.component';
import { Module } from 'src/app/models/Module';
import { Content } from 'src/app/models/Content';
import { Link } from 'src/app/models/Link';
import { Observable, of } from 'rxjs';

import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

import { ModuleIndexSearchPipe } from '../../pipes/module-index-search.pipe';

describe('ModuleIndexPageComponent', () => {

    let component: ModuleIndexPageComponent;
    let fixture: ComponentFixture<ModuleIndexPageComponent>;
    let service: ContentFetcherService;
    let service2: ModuleFetcherService;
    let spy: any;

    let mod1: Module;
    let mod2: Module;
    let mod3: Module;

    beforeEach(async(() => {

        TestBed.configureTestingModule({

            declarations: [

                ModuleIndexPageComponent,
                ModuleIndexSearchPipe
            ],

            imports: [

                MatProgressSpinnerModule,
                HttpClientTestingModule,
                ToastrModule.forRoot(),
                MatCardModule,
                MatExpansionModule,
                MatTabsModule,
                MatToolbarModule,
                MatFormFieldModule,
                MatIconModule,
                FormsModule
            ]
        })

        .compileComponents();
    }));

    beforeEach(() => {

        fixture = TestBed.createComponent(ModuleIndexPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        service = component.cs;
        service2 = component.ms.ms;

        mod1 = new Module(1, "A", 1, [], [], [], []);
        mod2 = new Module(4, "B", 1, [], [], [], []);
        mod3 = new Module(2, "C", 1, [], [], [], []);
    });

    it('should create', () => {

        expect(component).toBeTruthy();
    });

    /** tests that popups exist */

    it('should have delete content popup', () => {
        expect(document.getElementById('deleteContent')).toBeTruthy();
    });


    it('should have delete module popup', () => {
        expect(document.getElementById('deleteModule')).toBeTruthy();
    });

    /** tests for setting selCon and selModule */

    it('should update selLink and selMod with selectedLinkForRemoval()', () => {
        let Link1: Link = new Link(1, null, null, '', -1);
        let Mod1: Module = new Module(1, "", 1, [], [], [], []);

        component.selectedLinkForRemoval(Link1, Mod1);
        expect(component.selLink.id).toEqual(1);
        expect(component.activeModule.id).toEqual(1);

        let Link2: Link = new Link(2, null, null, '', -1);
        let Mod2: Module = new Module(2, "", 1, [], [], [], []);

        component.selectedLinkForRemoval(Link2, Mod2);
        expect(component.selLink.id).toEqual(2);
        expect(component.activeModule.id).toEqual(2);
    });

    it('should update selMod with selectedModuleForRemoval()', () => {
        let Mod1: Module = new Module(1, "", 1, [], [], [], []);
        component.selectedModuleForRemoval(Mod1);
        expect(component.activeModule.id).toEqual(1);

        let Mod2: Module = new Module(2, "", 1, [], [], [], []);
        component.selectedModuleForRemoval(Mod2);
        expect(component.activeModule.id).toEqual(2);
    });

    /** tests for listContent() */
    it('should set Module to visible with listContent()', () => {
        let Mod1: Module = new Module(1, "", 1, [], [], [], []);
        let Con1: Content = new Content(1, "B", "", "", "", []);
        let Con2: Content = new Content(2, "A", "", "", "", []);
        expect(component.activeModule).toBeFalsy();
        component.listContent(Mod1);
        expect(component.activeModule).toBeTruthy();
    });

    it('should set Module to not visible if listContent() is called twice', () => {
        let Mod1: Module = new Module(2, "", 1, [], [], [], []);
        let Con1: Content = new Content(1, "B", "", "", "", []);
        let Con2: Content = new Content(2, "A", "", "", "", []);
        expect(component.activeModule).toBeFalsy();
        component.listContent(Mod1);
        component.listContent(Mod1);
        expect(component.activeModule).toBeFalsy();
    });
});
