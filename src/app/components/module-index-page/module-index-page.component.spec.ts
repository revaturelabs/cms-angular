import { async, ComponentFixture, TestBed } from '@angular/core/testing';


import { MatProgressSpinnerModule} from '@angular/material';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';

import { ModuleIndexPageComponent } from './module-index-page.component';
import { Module } from 'src/app/models/Module';
import { Content } from 'src/app/models/Content';
import { Link } from 'src/app/models/Link';

describe('ModuleIndexPageComponent', () => {
  let component: ModuleIndexPageComponent;
  let fixture: ComponentFixture<ModuleIndexPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModuleIndexPageComponent ],
      imports: [
        MatProgressSpinnerModule,
        HttpClientTestingModule,
        ToastrModule.forRoot()
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleIndexPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

// tests that popups exist
  it('should have delete content popup', () => {
    expect(document.getElementById('deleteContent')).toBeTruthy();
  });


  it('should have delete module popup', () => {
    expect(document.getElementById('deleteModule')).toBeTruthy();
  });


// test that the table populates
  it('should populate table based on Modules Service Response', () => {

    let Mod1: Module = new Module(1, '', 1, [], [], []);
    let Mod2: Module = new Module(2, '', 1, [], [], []);

    component.ms.response = [Mod1, Mod2];

    expect(document.getElementById('1')).toBeTruthy();
    expect(document.getElementById('2')).toBeTruthy();
    expect(document.getElementById('3')).toBeFalsy();
  });

// tests that flags show when expected
  it('should show flag on modules with no links', () => {
    let Mod1: Module = new Module(1, '', 1, [], [], []);

    component.ms.response = [Mod1];
    expect(document.getElementById('flag-1')).toBeTruthy();
  });

  it('should not show flag on modules with links', () => {
    let Link1: Link = new Link(1, 0, 0, '');
    let Mod1: Module = new Module(1, '', 1, [Link1], [], []);

    component.ms.response = [Mod1];
    expect(document.getElementById('flag-1')).toBeFalsy();
  });

// tests for setting selCon and selModule
  it('should have default values for selCon and selModule', () =>{
    expect(component.selCon.id).toEqual(0);
    expect(component.selModule.id).toEqual(0);
  });


  it('should update selCon and selMod with selectedLinkForRemoval()', () => {
    let Con1: Content = new Content(1, "", "", "", "", []);
    let Mod1: Module = new Module(1, "", 1, [], [], []);

    component.selectedLinkForRemoval(Con1, Mod1);
    expect(component.selCon.id).toEqual(1);
    expect(component.selModule.id).toEqual(1);

    let Con2: Content = new Content(2, "", "", "", "", []);
    let Mod2: Module = new Module(2, "", 1, [], [], []);

    component.selectedLinkForRemoval(Con2, Mod2);
    expect(component.selCon.id).toEqual(2);
    expect(component.selModule.id).toEqual(2);
  });

  it('should update selMod with selectedModuleForRemoval()', () => {
    let Mod1: Module = new Module(1, "", 1, [], [], []);
    component.selectedModuleForRemoval(Mod1);
    expect(component.selModule.id).toEqual(1);

    let Mod2: Module = new Module(2, "", 1, [], [], []);
    component.selectedModuleForRemoval(Mod2);
    expect(component.selModule.id).toEqual(2);
  });

// tests for parseContentResponse()
  it('should set moduleContents with parseContentResponse()', () => {
    let Mod1: Module = new Module(1, "", 1, [], [], []);
    let Mod2: Module = new Module(2, "", 1, [], [], []);

    component.parseContentResponse([], Mod1);

    expect(component.moduleContents.has(Mod1)).toBeTruthy();
    expect(component.moduleContents.has(Mod2)).toBeFalsy();
  });


  it('should sort content with parseContentResponse()', () => {
    let Mod1: Module = new Module(1, "", 1, [], [], []);
    let Con1: Content = new Content(1, "B", "", "", "", []);
    let Con2: Content = new Content(2, "A", "", "", "", []);

    component.parseContentResponse([Con1, Con2], Mod1);

    expect(component.moduleContents.get(Mod1)).toEqual([Con2, Con1]);
  });

// tests for listContent()
  it('should set Module to visible with listContent()', () => {
    let Mod1: Module = new Module(1, "", 1, [], [], []);
    expect(component.contentVisible.get(Mod1)).toBeFalsy();

    component.listContent(Mod1);
    expect(component.contentVisible.get(Mod1)).toBeTruthy();
  });

  it('should set Module to not visible if listContent() is called twice', () => {
    let Mod1: Module = new Module(1, "", 1, [], [], []);
    expect(component.contentVisible.get(Mod1)).toBeFalsy();

    component.listContent(Mod1);
    component.listContent(Mod1);
    expect(component.contentVisible.get(Mod1)).toBeFalsy();
  });

});
