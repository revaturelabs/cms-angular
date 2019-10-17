import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { MatProgressSpinnerModule} from '@angular/material';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';
import { ContentFetcherService } from 'src/app/services/content-fetcher.service';
import { ModuleIndexPageComponent } from './module-index-page.component';
import { Module } from 'src/app/models/Module';
import { Content } from 'src/app/models/Content';
import { of, Observable } from 'rxjs';
import { ModuleStoreService } from 'src/app/services/module-store.service';
import { ToastrService } from 'ngx-toastr';
import { Link } from 'src/app/models/Link';

fdescribe('ModuleIndexPageComponent', () => {
  let component: ModuleIndexPageComponent;
  let fixture: ComponentFixture<ModuleIndexPageComponent>;
  let contentFetcherService: ContentFetcherService;
  let toastrService:ToastrService;
  let moduleStoreService: ModuleStoreService;
  let mod1: Module = new Module(1, "", 1, [], [], [], []);
  let con1: Content = new Content(1, "B", "", "", "", []);
  let con2: Content = new Content(2, "A", "", "", "", []);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModuleIndexPageComponent ],
      imports: [
        MatProgressSpinnerModule,
        HttpClientTestingModule,
        ToastrModule.forRoot()
      ]
    })
    .compileComponents().then(()=>{
      fixture = TestBed.createComponent(ModuleIndexPageComponent);
      toastrService = TestBed.get(ToastrService);
      component = fixture.componentInstance;
      contentFetcherService = component.cs;
      moduleStoreService = component.ms;
    });
  }));

  beforeEach(() => {
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have delete content popup', () => {
    expect(document.getElementById('deleteContent')).toBeTruthy();
  });

  it('should have delete module popup', () => {
    expect(document.getElementById('deleteModule')).toBeTruthy();
  });

  it('should have default values for selCon', () =>{
    expect(component.selCon.id).toEqual(0);
  });

  it('should have default values for selModule', () =>{
    expect(component.selModule.id).toEqual(0);
  });

  it('should update selMod with selectedLinkForRemoval()', () => {
    component.selectedLinkForRemoval(con1, mod1);
    expect(component.selModule.id).toEqual(1);
  });

   it('should update selCon with selectedLinkForRemoval()', () => {
    component.selectedLinkForRemoval(con1, mod1);
    expect(component.selCon.id).toEqual(1);
  });

  it('should update selMod with selectedModuleForRemoval()', () => {
    component.selectedModuleForRemoval(mod1);
    expect(component.selModule.id).toEqual(1);
  });

  it('should set moduleContents with parseContentResponse()', () => {
    component.parseContentResponse([], mod1);
    expect(component.moduleContents.has(mod1)).toBeTruthy();
  });

  it('should sort content with parseContentResponse()', () => {
    component.parseContentResponse([con1, con2], mod1);
    expect(component.moduleContents.get(mod1)).toEqual([con2, con1]);
  });

  it('should set Module to visible with listContent()', () => {
    spyOn(contentFetcherService, 'filterContent').and.returnValue(of([con1, con2]));
    component.listContent(mod1);
    expect(component.contentVisible.get(mod1)).toBeTruthy();
  });

  it('should set Module to visible with listContent(), filter content called', () => {
    spyOn(contentFetcherService, 'filterContent').and.returnValue(of([con1, con2]));
    component.listContent(mod1);
    expect(contentFetcherService.filterContent).toHaveBeenCalled();
  });

  it('should set Module to not visible if listContent() is called twice', () => {
    spyOn(contentFetcherService, 'filterContent').and.returnValue(of([con1, con2]));
    component.listContent(mod1);
    component.listContent(mod1);
    expect(component.contentVisible.get(mod1)).toBeFalsy();
  });

  it('should test ngDoCheck, ms.nodes != nodes', () => {
    component.ms.nodes = [{node: "Node"}]
    component.nodes = [{node: "Node1"}, {node: "Node2"}]
    component.ngDoCheck();
    expect(component.nodes).not.toEqual(component.ms.nodes);
  });

  it('should test ngDoCheck, ms.nodes == nodes', () => {
    component.ms.nodes = [{node: "Node"}]
    component.ngDoCheck();
    expect(component.nodes).toEqual(component.ms.nodes);
  });

  it('should test listContent, tostr error 1', () => {
    spyOn(contentFetcherService, 'filterContent').and.returnValue(of(null));
    component.listContent(mod1);
    expect(toastrService.previousToastMessage).toBe('Response was null');
  });

  it('should test listContent, tostr error 2', () => {
    const observable: Observable<Content[]> = new Observable<Content[]>((observer) => {
      observer.error({status: 400, statusText: "Bad Request"});
      observer.complete();
      return {unsubscribe() {console.log("listContent test - unsubscribed")}};
    });
    spyOn(contentFetcherService, 'filterContent').and.returnValue(observable);
    component.listContent(mod1);
    expect(toastrService.previousToastMessage).toBe('Failed to request contents');
  });

  it('should test parseContentResponse', () => {
   let response: Content[]=[con2,con1];
   component.parseContentResponse(response,mod1);
   expect(component.moduleContents.get(mod1)[0]).toBe(con2);
  });

  it('should test removeContentFromModuleIndex', () => {
    component.moduleContents.set(component.selModule, [con1,con2]);
    component.removeContentFromModuleIndex();
  });
  
});
