import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { MatProgressSpinnerModule} from '@angular/material';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';
import { ContentFetcherService } from 'src/app/services/content-fetcher.service';
import { ModuleIndexPageComponent } from './module-index-page.component';
import { Module } from 'src/app/models/Module';
import { Content } from 'src/app/models/Content';
import { of, Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Link } from 'src/app/models/Link';
import { ModuleFetcherService } from 'src/app/services/module-fetcher.service';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import { HttpHeaderResponse } from '@angular/common/http';

describe('ModuleIndexPageComponent', () => {
  let component: ModuleIndexPageComponent;
  let fixture: ComponentFixture<ModuleIndexPageComponent>;
  let contentFetcherService: ContentFetcherService;
  let moduleFetcherService:ModuleFetcherService;
  let toastrService:ToastrService;
  let attributes;
  let dummyEvent;
  let link: Link = new Link(1, null, null, "affiliation", 1);
  let mod3: Module = new Module(3, "", 3, [], [], [], []);
  let mod1: Module = new Module(1, "", 1, [], [], [], [mod3]);
  let mod2: Module = new Module(2, "", 2, [], [], [], [mod3]);
  let con1: Content = new Content(1, "B", "", "", "", []);
  let con2: Content = new Content(2, "A", "", "", "", []);
  let httpHeaderResponse :HttpHeaderResponse = new HttpHeaderResponse({headers: null, status: 200, statusText:"ok",url: ''});
  let observableError: Observable<HttpHeaderResponse>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ModuleIndexPageComponent
      ],
      providers: [ModuleFetcherService, ToastrService],
      imports: [
        MatProgressSpinnerModule,
        HttpClientTestingModule,
        ToastrModule.forRoot(),
        MatCardModule,
        MatExpansionModule,
        MatTabsModule,
        FormsModule
      ]
    })
    .compileComponents().then(()=>{
      fixture = TestBed.createComponent(ModuleIndexPageComponent);
      toastrService = TestBed.get(ToastrService);
      component = fixture.componentInstance;
      contentFetcherService = component.cs;
      moduleFetcherService = TestBed.get(ModuleFetcherService);
      observableError = new Observable<HttpHeaderResponse>((observer) => {
        observer.error(null);
        observer.complete();
        return {unsubscribe() {console.log("onDrop test - unsubscribed")}};
      });
    });
  }));

  beforeEach(() => {
    attributes = {id: {nodeValue: "node"}}
    dummyEvent = {target: {attributes: attributes}, srcElement: {attributes: attributes}, currentTarget: {attributes: attributes}}
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

  it('should update selMod with selectedModuleForRemoval()', () => {
    component.selectedModuleForRemoval(mod1);
    expect(component.activeModule.id).toEqual(1);
  });

  it('should set Module to visible with listContent()', () => {
    spyOn(contentFetcherService, 'filterContent').and.returnValue(of([con1, con2]));
    component.listContent(mod1);
    expect(component.activeModule).toBeTruthy();
  });

  it('should set Module to not visible if listContent() is called twice', () => {
    spyOn(contentFetcherService, 'filterContent').and.returnValue(of([con1, con2]));
    component.listContent(mod1);
    component.listContent(mod1);
    expect(component.activeModule).toBeFalsy();
  });

  it('should test listContent, childrenVisible false', () => {
    component.childrenVisible.set(mod2,true)
    component.listContent(mod1);
    expect(component.childrenVisible.get(mod2)).toBe(false)
  });

  it('should test listContent, activeModule == param', () => {
    component.activeModule = mod2;
    component.listContent(mod1);
    expect(component.activeModule).toBe(mod1)
  });

  it('should test listContent, module value == 0', () => {
    mod2.links = [link];
    link.content=con2;
    component.contentActive.set(mod2, undefined);
    component.listContent(mod2);
    expect(component.contentActive.get(mod2)).toBe(0)
  });

  it('should test listContent, module value == current', () => {
    mod2.links = [link];
    link.content=con2;
    component.contentActive.set(mod2, 2);
    component.listContent(mod2);
    expect(component.contentActive.get(mod2)).toBe(2)
  });

  it('should test listOrCloseContent, event not null, listContent not called, target', () => {
    component.listOrCloseContent(mod2, dummyEvent);
    spyOn(component, 'listContent')
    expect(component.listContent).not.toHaveBeenCalled();
  });

   it('should test listOrCloseContent, event not null, listContent not called, nodeValue null', () => {
     dummyEvent.target.attributes.id.nodeValue = null;
     spyOn(component, 'listContent')
     component.listOrCloseContent(mod2, dummyEvent);
     expect(component.listContent).toHaveBeenCalled();
  });

  it('should test listOrCloseContent, event not null, listContent not called, srcElement', () => {
    dummyEvent.target = null;
    spyOn(component, 'listContent')
    component.listOrCloseContent(mod2, dummyEvent);
    expect(component.listContent).not.toHaveBeenCalled();
  });

  it('should test listOrCloseContent, event not null, listContent not called, currentTarget', () => {
    dummyEvent.target = null;
    dummyEvent.srcElement = null;
    spyOn(component, 'listContent')
    component.listOrCloseContent(mod2, dummyEvent);
    expect(component.listContent).not.toHaveBeenCalled();
  });

  it('should test listOrCloseContent, activeModule not null, listContent not called', () => {
    spyOn(component, 'listContent');
    component.activeModule = mod2;
    component.listOrCloseContent(mod2, null);
    expect(component.listContent).not.toHaveBeenCalled();
  });

   it('should test listOrCloseContent, activeModule null, listContent called', () => {
    spyOn(component, 'listContent');
    component.activeModule = null;
    component.listOrCloseContent(mod2, null);
    expect(component.listContent).toHaveBeenCalled();
  });

  it('should test listChildren children mod visible false', () => {
    component.ms.subjectIdToModule.set(3,mod3);
    component.childrenVisible.set(mod2,true);
    component.listChildren(mod1);
    expect(component.childrenVisible.get(mod2)).toBe(false);
  });

  it('should test listChildren children set param mod visible false', () => {
    component.ms.subjectIdToModule.set(3,mod3);
    component.childrenVisible.set(mod1,true);
    component.listChildren(mod1);
    expect(component.childrenVisible.get(mod1)).toBe(false);
  });

  it('should test removeContentFromModuleIndex, contentActive -1', () => {
    component.activeModule = mod1;
    component.selLink = link;
    let response :HttpHeaderResponse = new HttpHeaderResponse({headers: null, status: 200, statusText:"ok",url: ''});
    spyOn(component.cs, 'removeLinkFromContent').and.returnValue(of(response));
    component.removeContentFromModuleIndex();
    expect(component.contentActive.get(component.activeModule)).toBe(-1);
  });
  

  it('should test removeContentFromModuleIndex contentActive 0', () => {
    mod1.links = [link, link];
    component.activeModule = mod1;
    component.selLink = link;
    spyOn(component.cs, 'removeLinkFromContent').and.returnValue(of(httpHeaderResponse));
    component.removeContentFromModuleIndex();
    expect(component.contentActive.get(component.activeModule)).toBe(0);
  });

  it('should test selectedLinkForRemoval', () => {
    component.selectedLinkForRemoval(link,mod1);
    expect(component.selLink).toBe(link);
  });

  it('should test removeModule, case 1, deleteModuleByID called', () => {
    component.activeModule = mod1;
    component.selMethod = "1";
    spyOn(moduleFetcherService, 'deleteModuleByID').and.returnValue(of(httpHeaderResponse));;
    component.removeModule();
    expect(moduleFetcherService.deleteModuleByID).toHaveBeenCalled();
  });

  it('should test removeModule, case 1, deleteModuleWithSpecificContent called', () => {
    component.activeModule = mod1;
    component.selMethod = "2";
    spyOn(moduleFetcherService, 'deleteModuleWithSpecificContent').and.returnValue(of(httpHeaderResponse));
    component.removeModule();
    expect(moduleFetcherService.deleteModuleWithSpecificContent).toHaveBeenCalled();
  });

  it('should test removeModule, case 1, deleteModuleWithContent called', () => {
    component.activeModule = mod1;
    component.selMethod = "3";
    spyOn(moduleFetcherService, 'deleteModuleWithContent').and.returnValue(of(httpHeaderResponse));
    component.removeModule();
    expect(moduleFetcherService.deleteModuleWithContent).toHaveBeenCalled();
  });

  it('should test getChildModule, set contentActive', () => {
    component.childActive.set(mod1, 0);
    component.ms.subjectIdToModule.set(3, mod3);
    mod3.links = [link];
    component.getChildModule(mod1);
    expect(component.contentActive.get(mod3)).toBeDefined();
  });

  it('should test getChildModule, not set contentActive', () => {
    component.childActive.set(mod1, 0);
    component.ms.subjectIdToModule.set(3, mod3);
    mod3.links = [];
    component.getChildModule(mod1);
    expect(component.contentActive.get(mod3)).not.toBeDefined();
  });

  it('should test setActiveContent', () => {
    let idx = 0;
    component.setActiveContent(mod1, idx);
    expect(component.contentActive.get(mod1)).toBe(idx)
  });

  it('should test onDrop, increase mod priority', () => {
    let customEvent = {currentIndex: 0, previousIndex: 1}
    let linkHigh: Link = new Link(1, null, null, "affiliation", 5);
    link.priority = 1
    let priority = 2;
    mod1.links = [link,linkHigh];
    component.onDrop(customEvent,mod1);
    expect(mod1.links[customEvent.previousIndex].priority).toBe(priority)
  });

  it('should test onDrop, decrease priority', () => {
    spyOn(moduleFetcherService, 'updateModuleLinks').and.returnValue(of(httpHeaderResponse));
    let customEvent = {currentIndex: 2, previousIndex: 0}
    let linkHigh: Link = new Link(1, null, null, "affiliation", 5);
    let priority = linkHigh.priority;
    mod1.links = [link, link, linkHigh]
    component.onDrop(customEvent,mod1);
    expect(mod1.links[mod1.links.length-1].priority).toBe(priority-1)
  });

  it('should test onDrop, toastr error 1', () => {
    spyOn(moduleFetcherService, 'updateModuleLinks').and.returnValue(of(null));
    let customEvent = {currentIndex: 0, previousIndex: 1}
    mod1.links = [link, link]
    component.onDrop(customEvent,mod1);
    expect(toastrService.previousToastMessage).toBe("Failed to Normalize this Module")
  });

  it('should test onDrop, toastr error 2', () => {
    spyOn(moduleFetcherService, 'updateModuleLinks').and.returnValue(observableError);
    let customEvent = {currentIndex: 0, previousIndex: 1}
    mod1.links = [link, link]
    component.onDrop(customEvent,mod1);
    expect(toastrService.previousToastMessage).toBe("Failed to Normalize this Module")
  });

  it('should test shiftLinkPriority', () => {
    spyOn(moduleFetcherService, 'updateModuleLinks').and.returnValue(of(httpHeaderResponse));
    let linkHigh: Link = new Link(1, null, null, "affiliation", 5);
    mod1.links = [link, linkHigh];
    let priority = (link.priority =0);
    component.contentActive.set(mod1, 0);
    component.shiftLinkPriority(mod1,1);
    expect(mod1.links[1].priority).toBe(priority+1)
  });

  it('should test shiftLinkPriority,  updateModuleLinks not executed', () => {
    spyOn(moduleFetcherService, 'updateModuleLinks')
    mod1.links = [];
    component.contentActive.set(mod1, 0);
    component.shiftLinkPriority(mod1,1);
    expect(moduleFetcherService.updateModuleLinks).not.toHaveBeenCalled();
  });

  it('should test shiftLinkPriority priority not shifted by curlIdx', () => {
    mod1.links = [link];
    let priority = (link.priority =0);
    component.contentActive.set(mod1, 0);
    component.shiftLinkPriority(mod1,-1);
    expect(mod1.links[0].priority).toBe(priority)
  });

  it('should test shiftLinkPriority, toastr error 1', () => {
    spyOn(moduleFetcherService, 'updateModuleLinks').and.returnValue(of(null));
    let linkHigh: Link = new Link(1, null, null, "affiliation", 5);
    mod1.links = [link, linkHigh];
    component.contentActive.set(mod1, 0);
    component.shiftLinkPriority(mod1,1);
    expect(toastrService.previousToastMessage).toBe("Failed to Normalize this Module")
  });

  it('should test shiftLinkPriority, toastr error 2', () => {
    spyOn(moduleFetcherService, 'updateModuleLinks').and.returnValue(observableError);
    let linkHigh: Link = new Link(1, null, null, "affiliation", 5);
    mod1.links = [link, linkHigh];
    component.contentActive.set(mod1, 0);
    component.shiftLinkPriority(mod1,1);
    expect(toastrService.previousToastMessage).toBe("Failed to Normalize this Module")
  });

  it('should test normalizePriority, toastr success', () => {
    spyOn(moduleFetcherService, 'updateModuleLinks').and.returnValue(of(httpHeaderResponse));
    link.priority = 1;
    mod1.links = [link]
    component.normalizePriority(mod1);
    expect(toastrService.previousToastMessage).toBe("Normalized Module Priority")
  });

  it('should test normalizePriority, toatsr error 1', () => {
    spyOn(moduleFetcherService, 'updateModuleLinks').and.returnValue(of(null));
    link.priority = 1;
    mod1.links = [link]
    component.normalizePriority(mod1);
    expect(toastrService.previousToastMessage).toBe("Failed to Normalize this Module")
  });

  it('should test normalizePriority, toatsr error 2', () => {
    spyOn(moduleFetcherService, 'updateModuleLinks').and.returnValue(observableError);
    link.priority = 1;
    mod1.links = [link]
    component.normalizePriority(mod1);
    expect(toastrService.previousToastMessage).toBe("Failed to Normalize this Module");
  });

});
