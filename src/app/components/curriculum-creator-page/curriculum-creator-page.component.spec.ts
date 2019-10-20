import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CurriculumCreatorPageComponent, NewCurriculumDialog, DeleteCurriculumDialog, AddModuleDialog } from './curriculum-creator-page.component';
import { MatProgressSpinnerModule, MatInputModule} from '@angular/material';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Curriculum } from 'src/app/models/Curriculum';
import { CurriculumModuleFilterPipe } from 'src/app/pipes/curriculum-module-filter.pipe';
import { of, Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { CurriculumModule } from 'src/app/models/CurriculumModule';
import { Module } from 'src/app/models/Module';
import { HttpHeaderResponse } from '@angular/common/http';
import { CurriculumFetcherService } from 'src/app/services/curriculum-fetcher.service';

describe('CurriculumCreatorPageComponent', () => {
  let component: CurriculumCreatorPageComponent;
  let fixture: ComponentFixture<CurriculumCreatorPageComponent>;
  let toastrService:ToastrService;
  let curriculum: Curriculum;
  let curriculumModule:CurriculumModule;
  let curriculumModule2: CurriculumModule;
  let curriculumModules: CurriculumModule[];
  let curriculumFetcherService:CurriculumFetcherService;
  let mockEvent;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [ToastrService, CurriculumFetcherService],
      declarations: [
        CurriculumCreatorPageComponent, CurriculumModuleFilterPipe, NewCurriculumDialog, DeleteCurriculumDialog, AddModuleDialog
      ],

      imports: [

        MatProgressSpinnerModule,
        MatCardModule,
        DragDropModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatIconModule,
        MatToolbarModule,
        MatDialogModule,
        MatGridListModule,
        MatCheckboxModule,
        MatMenuModule,
        FormsModule,
        MatTooltipModule,
        ToastrModule.forRoot(),
        HttpClientTestingModule,
        BrowserAnimationsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurriculumCreatorPageComponent);
    toastrService = TestBed.get(ToastrService);
    curriculumFetcherService = TestBed.get(CurriculumFetcherService);
    component = fixture.componentInstance;
    curriculum = new Curriculum(1,"Java",[]);
    component.activeCurriculum = null;
    curriculumModule = new CurriculumModule(1,1,1,null);
    curriculumModule2 = new CurriculumModule(2,2,2,null);
    curriculumModules = [];
    mockEvent = {currentIndex: 0, previousIndex: 0}
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should test ngOnInit, verify curricula load', () => {
    let spy = spyOn(component.cs,'loadCurricula');
    component.ngOnInit()
    expect(spy).toHaveBeenCalled();
  });

  it('should test openCreateCurriculumDialog, verify dialog open', () => {
    let spy = spyOn(component.dialog,'open');
    component.openCreateCurriculumDialog()
    expect(spy).toHaveBeenCalledWith(NewCurriculumDialog, jasmine.any(Object))
  });

  it('should test openDeleteCurriculumDialog, verify dialog open', () => {
    let spy = spyOn(component.dialog,'open');
    component.openDeleteCurriculumDialog(curriculum);
    expect(spy).toHaveBeenCalledWith(DeleteCurriculumDialog, jasmine.any(Object));
  });

  it('should test openAddModulesDialog, verify dialog open', () => {
    component.activeCurriculum = curriculum;
    let mockMatDialogRef = jasmine.createSpyObj('MatDialogRef',['afterClosed']);
    mockMatDialogRef.afterClosed.and.callFake(()=>{return of(true);})
    let spy = spyOn(component.dialog,'open').and.returnValue(mockMatDialogRef);
    component.openAddModulesDialog();
    expect(spy).toHaveBeenCalledWith(AddModuleDialog, jasmine.any(Object));
  });

  it('should test getCurriculumDetails, loadCurriculumDetails not called', () => {
    component.activeCurriculum = curriculum;
    let spy = spyOn(component.cs, 'loadCurriculumDetails')
    component.getCurriculumDetails(1);
    expect(spy).not.toHaveBeenCalled();
  });

   it('should test getCurriculumDetails, set moduleActive', fakeAsync(() => {
     curriculum.currModules.push(curriculumModule);
    spyOn(component.cs, 'loadCurriculumDetails').and.returnValue(Promise.resolve(curriculum));
    component.getCurriculumDetails(2);
    tick(Infinity);
    expect(component.moduleActive.get(curriculum.id)).toBe(0);
  }));

  it('should test getCurriculumDetails, do not set moduleActive', fakeAsync(() => {
    spyOn(component.cs, 'loadCurriculumDetails').and.returnValue(Promise.resolve(curriculum));
    component.getCurriculumDetails(2);
    tick(Infinity);
    expect(component.moduleActive.get(curriculum.id)).toBe(-1);
  }));

  it('should test getCurriculumDetails, error 1', fakeAsync(() => {
    spyOn(component.cs, 'loadCurriculumDetails').and.returnValue(Promise.resolve(null));
    component.getCurriculumDetails(2);
    tick(Infinity);
    expect(toastrService.previousToastMessage).toBe('Failed to retrieve the Curriculum with that ID');
  }));

  it('should test getCurriculumDetails, error 2', fakeAsync(() => {
    spyOn(component.cs, 'loadCurriculumDetails').and.returnValue(Promise.reject("Failed"));
    component.getCurriculumDetails(2);
    tick(Infinity);
    expect(toastrService.previousToastMessage).toBe('Failed to communicate with the server');
  }));

  it('should test normalizeLinkPriority', () => {
    curriculumModule.priority = 3;
    curriculumModules.push(curriculumModule);
    spyOn(curriculumFetcherService, 'postSetOfCurriculumModules').and.returnValue(of(curriculumModules))
    component.normalizeLinkPriority(curriculumModules);
    expect(toastrService.previousToastMessage).toBe('Reindexed Links');
  });

  it('should test normalizeLinkPriority, postSetOfCurriculumModules not called', () => {
    let spy = spyOn(curriculumFetcherService,'postSetOfCurriculumModules');
    curriculumModule.priority = 0;
    curriculumModules.push(curriculumModule);
    component.normalizeLinkPriority(curriculumModules);
    expect(spy).not.toHaveBeenCalled();
  });

  it('should test normalizeLinkPriority, error 1', () => {
    curriculumModule.priority = 2;
    curriculumModules.push(curriculumModule);
    spyOn(curriculumFetcherService, 'postSetOfCurriculumModules').and.returnValue(of(null))
    component.normalizeLinkPriority(curriculumModules);
    expect(toastrService.previousToastMessage).toBe('Normalization Failed');
  });

  it('should test normalizeLinkPriority, error 2', () => {
    curriculumModule.priority = 2;
    curriculumModules.push(curriculumModule);
    const observable: Observable<CurriculumModule[]> = new Observable<CurriculumModule[]>((observer) => {
      observer.error({status: 400, statusText: "Bad Request"})
      observer.complete();
    });
    spyOn(curriculumFetcherService, 'postSetOfCurriculumModules').and.returnValue(observable)
    component.normalizeLinkPriority(curriculumModules);
    expect(toastrService.previousToastMessage).toBe('Failed to communicate with the server');
  });

  it('should test setEditable', () => {
    let customSpy = jasmine.createSpyObj('HTMLElement',['focus','select']);
    spyOn(document,'getElementById').and.returnValue(customSpy);
    component.editable.set(curriculum.id,false);
    component.setEditable(curriculum);
    expect(component.editable.get(curriculum.id)).toBe(true);
  });

  it('should test setActiveModule', () => {
    component.activeCurriculum = curriculum;
    component.moduleActive.set(curriculum.id, 1);
    component.setActiveModule(2);
    expect(component.moduleActive.get(curriculum.id)).toBe(2);
  });
  
  it('should test removeModule from activeCurriculum', () => {
    let response :HttpHeaderResponse = new HttpHeaderResponse({headers: null, status: 200, statusText:"ok",url: "url"});
    spyOn(curriculumFetcherService, 'deleteCurriculumModuleById').and.returnValue(of(response));
    component.activeCurriculum = curriculum;
    let curriculumModule2: CurriculumModule = new CurriculumModule(3,3,3,null);
    curriculum.currModules.push(curriculumModule);
    curriculum.currModules.push(curriculumModule2);
    component.removeModule(curriculumModule);
    expect(component.activeCurriculum.currModules.includes(curriculumModule)).toBe(false);
  });

  it('should test removeModule, error 1', () => {
    const observable: Observable<HttpHeaderResponse> = new Observable<HttpHeaderResponse>((observer) => {
      observer.error({status: 400, statusText: "Bad Request"})
      observer.complete();
    });
    spyOn(curriculumFetcherService, 'deleteCurriculumModuleById').and.returnValue(observable);
    component.activeCurriculum = curriculum;
    component.removeModule(curriculumModule);
    expect(toastrService.previousToastMessage).toBe('There was an error deleting the link');
  });

  it('should test updateCurriculum, error 1', () => {
    let response :HttpHeaderResponse = new HttpHeaderResponse({headers: null, status: 200, statusText:"ok",url: "url"});
    spyOn(curriculumFetcherService, 'updateCurriculumById').and.returnValue(of(response));
    component.updateCurriculum(curriculum);
    expect(toastrService.previousToastMessage).toBe('Changes saved');
  });

  it('should test updateCurriculum, error 1', () => {
    spyOn(curriculumFetcherService, 'updateCurriculumById').and.returnValue(of(null));
    component.updateCurriculum(curriculum);
    expect(toastrService.previousToastMessage).toBe('Could not update the Curriculum');
  });

  it('should test updateCurriculum, error 2', () => {
    const observable: Observable<HttpHeaderResponse> = new Observable<HttpHeaderResponse>((observer) => {
      observer.error({status: 400, statusText: "Bad Request"})
      observer.complete();
    });
    spyOn(curriculumFetcherService, 'updateCurriculumById').and.returnValue(observable);
    component.updateCurriculum(curriculum);
    expect(toastrService.previousToastMessage).toBe('Failed to communicate to the server');
  });

  it('should test shiftLinkPriority, postSetOfCurriculumModules not invoked by empty currmodules', () => {
    curriculum.currModules = [];
    spyOn(curriculumFetcherService, 'postSetOfCurriculumModules');
    component.shiftLinkPriority(curriculum, 2);
    expect(curriculumFetcherService.postSetOfCurriculumModules).not.toHaveBeenCalled();
  });

  it('should test shiftLinkPriority, postSetOfCurriculumModules not invoked, invalid shift', () => {
    component.moduleActive.set(curriculum.id, 0)
    curriculum.currModules = [curriculumModule];
    spyOn(curriculumFetcherService, 'postSetOfCurriculumModules');
    component.shiftLinkPriority(curriculum, -1);
    expect(curriculumFetcherService.postSetOfCurriculumModules).not.toHaveBeenCalled();
  });
  

  it('should test shiftLinkPriority, error 1', () => {
    spyOn(curriculumFetcherService, 'postSetOfCurriculumModules').and.returnValue(of(null));
    component.moduleActive.set(curriculum.id, 0)
    curriculum.currModules = [curriculumModule, curriculumModule2];
    component.shiftLinkPriority(curriculum, 1);
    expect(toastrService.previousToastMessage).toBe('Failed to communicate with the server');
  });

  it('should test shiftLinkPriority, error 2', () => {
    const observable: Observable<CurriculumModule[]> = new Observable<CurriculumModule[]>((observer) => {
      observer.error({status: 400, statusText: "Bad Request"})
      observer.complete();
    });
    spyOn(curriculumFetcherService, 'postSetOfCurriculumModules').and.returnValue(observable);
    component.moduleActive.set(curriculum.id, 0)
    curriculum.currModules = [curriculumModule, curriculumModule2];
    component.shiftLinkPriority(curriculum, 1);
    expect(toastrService.previousToastMessage).toBe('Failed to communicate with the server');
  });

  it('should test shiftLinkPriority, donothing', () => {
    spyOn(curriculumFetcherService, 'postSetOfCurriculumModules').and.returnValue(of([]));
    component.moduleActive.set(curriculum.id, 0)
    curriculum.currModules = [curriculumModule, curriculumModule2];
    component.shiftLinkPriority(curriculum, 1);
    expect(toastrService.previousToastMessage).toBe(undefined);
  });

  it('should test onDrop, decrease priority', () => {
    curriculum.currModules = [curriculumModule2, curriculumModule];
    mockEvent.currentIndex = 1;
    mockEvent.previousIndex = 0;
    let priority = curriculumModule2.priority;
    spyOn(curriculumFetcherService, 'postSetOfCurriculumModules').and.returnValue(of([]))
    component.onDrop(mockEvent,curriculum);
    expect(curriculumModule2.priority).toBe(priority-1)
  });

  it('should test onDrop,increase priority', () => {
    curriculum.currModules = [curriculumModule2, curriculumModule];
    mockEvent.currentIndex = 0;
    mockEvent.previousIndex = 1;
    let priority = curriculumModule.priority;
    spyOn(curriculumFetcherService, 'postSetOfCurriculumModules').and.returnValue(of([]))
    component.onDrop(mockEvent,curriculum);
    expect(curriculumModule.priority).toBe(priority+1)
  });

   it('should test onDrop, error 1', () => {
    curriculum.currModules = [curriculumModule2, curriculumModule];
    mockEvent.currentIndex = 1;
    mockEvent.previousIndex = 0;
    spyOn(curriculumFetcherService, 'postSetOfCurriculumModules').and.returnValue(of(null))
    component.onDrop(mockEvent,curriculum);
    expect(toastrService.previousToastMessage).toBe('Failed to reorder Modules');
  });

  it('should test onDrop,error 2', () => {
    const observable: Observable<CurriculumModule[]> = new Observable<CurriculumModule[]>((observer) => {
      observer.error({status: 400, statusText: "Bad Request"})
      observer.complete();
    });
    curriculum.currModules = [curriculumModule2, curriculumModule];
    mockEvent.currentIndex = 0;
    mockEvent.previousIndex = 1;
    spyOn(curriculumFetcherService, 'postSetOfCurriculumModules').and.returnValue(observable);
    component.onDrop(mockEvent,curriculum);
    expect(toastrService.previousToastMessage).toBe('Failed to communicate with server');
  });
});

describe('NewCurriculumDialogComponent', () => {
  let component: NewCurriculumDialog;
  let fixture: ComponentFixture<NewCurriculumDialog>;
  let toastrService:ToastrService;
  let curriculum:Curriculum;
  const mockDialogRef = {
    close: jasmine.createSpy('close')
  }
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewCurriculumDialog ],
      providers:[
        { provide: MAT_DIALOG_DATA, useValue: {name: ''} },
        { provide: MatDialogRef, useValue: mockDialogRef},
        ToastrService
      ],
      imports: [
        MatProgressSpinnerModule,
        MatCardModule,
        DragDropModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatToolbarModule,
        MatDialogModule,
        MatGridListModule,
        MatCheckboxModule,
        MatMenuModule,
        FormsModule,
        MatTooltipModule,
        ToastrModule.forRoot(),
        HttpClientTestingModule,
        BrowserAnimationsModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCurriculumDialog);
    component = fixture.componentInstance;
    toastrService = TestBed.get(ToastrService);
    fixture.detectChanges();
    component.cs.nodes = [];
    component.cs.idToCurriculum = new Map();
    component.data.name = 'Test';
    curriculum = new Curriculum(1,"Java",[]);
  });

  it('Should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('Should test onNoClick', () => {
    component.onNoClick();
    expect(mockDialogRef.close).toHaveBeenCalled();
  });

  it('Should test submit, error 1', () => {
    component.data.name = undefined;
    component.submit();
    expect(toastrService.previousToastMessage).toBe('Please fill in the input field!');
  });

   it('Should test submit, success', () => {
    spyOn(component.cfs, 'createCurriculum').and.returnValue(of(curriculum));
    component.submit();
    expect(toastrService.previousToastMessage).toBe('Curriculum successfully made');
  });

  it('Should test submit, toastr error 2', () => {
    spyOn(component.cfs,'createCurriculum').and.returnValue(of(null))
    component.submit();
    expect(toastrService.previousToastMessage).toBe('There was an error creating the Curriculum');
  });

  it('Should test submit, toastr error 3', () => {
    const observable: Observable<Curriculum> = new Observable<Curriculum>((observer) => {
      observer.error({status: 400, statusText: "Bad Request"})
      observer.complete();
    });
    spyOn(component.cfs,'createCurriculum').and.returnValue(observable);
    component.submit();
    expect(toastrService.previousToastMessage).toBe('Failed to communicate with the server');
  });

});

describe('DeleteCurriculumDialog', () => {
  let component: DeleteCurriculumDialog;
  let fixture: ComponentFixture<DeleteCurriculumDialog>;
  let toastrService:ToastrService;
  let curriculum2: Curriculum;
  const mockDialogRef = {
    close: jasmine.createSpy('close')
  }
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteCurriculumDialog ],
      providers:[
        { provide: MAT_DIALOG_DATA, useValue: {node: new Curriculum(1,"Java",[])} },
        { provide: MatDialogRef, useValue: mockDialogRef},
        ToastrService
      ],
      imports: [
        MatProgressSpinnerModule,
        MatCardModule,
        DragDropModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatToolbarModule,
        MatDialogModule,
        MatGridListModule,
        MatCheckboxModule,
        MatMenuModule,
        FormsModule,
        MatTooltipModule,
        ToastrModule.forRoot(),
        HttpClientTestingModule,
        BrowserAnimationsModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteCurriculumDialog);
    component = fixture.componentInstance;
    toastrService = TestBed.get(ToastrService);
    fixture.detectChanges();
    curriculum2 = new Curriculum(2,"C#", []);
  });

  it('Should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('Should test onNoClick', () => {
    component.onNoClick();
    expect(mockDialogRef.close).toHaveBeenCalled();
  });

  it('Should test delete', () => {
    component.cs.nodes = [];
    component.cs.nodes.push(component.data.node);
    component.cs.nodes.push(curriculum2);
    let response :HttpHeaderResponse = new HttpHeaderResponse({headers: null, status: 200, statusText:"ok",url: "url"});
    spyOn(component.cfs, 'deleteCurriculumById').and.returnValue(of(response))
    component.delete();
    expect(toastrService.previousToastMessage).toBe(`${component.data.node.name} deleted`);
  });

  it('Should test delete, error', () => {
    const observable: Observable<HttpHeaderResponse> = new Observable<HttpHeaderResponse>((observer) => {
      observer.error({status: 400, statusText: "Bad Request"})
      observer.complete();
    });
    spyOn(component.cfs, 'deleteCurriculumById').and.returnValue(observable);
    component.delete();
    expect(toastrService.previousToastMessage).toBe('Failed to communicate with the server');
  });

});

describe('AddModuleDialog', () => {
  let component: AddModuleDialog;
  let fixture: ComponentFixture<AddModuleDialog>;
  let toastrService:ToastrService;
  let curriculumModule: CurriculumModule;
  let curriculums: CurriculumModule[];
  const mockDialogRef = {
    close: jasmine.createSpy('close')
  }
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddModuleDialog,CurriculumModuleFilterPipe ],
      providers:[
        { provide: MAT_DIALOG_DATA, useValue: {node: new Curriculum(1,"Java",[])} },
        { provide: MatDialogRef, useValue: mockDialogRef},
        ToastrService
      ],
      imports: [
        MatProgressSpinnerModule,
        MatCardModule,
        DragDropModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatToolbarModule,
        MatDialogModule,
        MatGridListModule,
        MatCheckboxModule,
        MatMenuModule,
        FormsModule,
        MatTooltipModule,
        ToastrModule.forRoot(),
        HttpClientTestingModule,
        BrowserAnimationsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddModuleDialog);
    component = fixture.componentInstance;
    toastrService = TestBed.get(ToastrService);
    fixture.detectChanges();

    curriculumModule = new CurriculumModule(1, 1, 1, null);
    curriculums = [curriculumModule];
  });

  it('Should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('Should test onNoClick', () => {
    component.onNoClick();
    expect(mockDialogRef.close).toHaveBeenCalled();
  });

  it('Should test addModules, postSetOfCurriculumModules not called', () => {
    component.checked.set(1,false);
    let spy = spyOn(component.cfs,'postSetOfCurriculumModules')
    component.addModules();
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should test addModules, toastr, single module', () => {
    component.checked.set(1,true);
    spyOn(component.cfs,'postSetOfCurriculumModules').and.returnValue(of([]))
    component.addModules();
    expect(toastrService.previousToastMessage).toBe(`Added 1 module to ${component.data.node.name}`);
  });

  it('Should test addModules, toastr, multiple module', () => {
    component.checked.set(1,true);
    component.checked.set(2,true);
    spyOn(component.cfs,'postSetOfCurriculumModules').and.returnValue(of(curriculums))
    component.addModules();
    expect(toastrService.previousToastMessage).toBe(`Added 2 modules to ${component.data.node.name}`);
  });

  it('Should test addModules, toastr error 1', () => {
    component.checked.set(1,true);
    spyOn(component.cfs,'postSetOfCurriculumModules').and.returnValue(of(null))
    component.addModules();
    expect(toastrService.previousToastMessage).toBe('Failed to communicate with the server');
  });

  it('Should test addModules, toastr error 2', () => {
    component.checked.set(1,true);
    const observable: Observable<CurriculumModule[]> = new Observable<CurriculumModule[]>((observer) => {
      observer.error({status: 400, statusText: "Bad Request"})
      observer.complete();
    });
    spyOn(component.cfs,'postSetOfCurriculumModules').and.returnValue(observable);
    component.addModules();
    expect(toastrService.previousToastMessage).toBe('Failed to communicate with the server');
  });

  it('Should test check, add {node,false} to checked', () => {
    component.checked.set(1,true);
    let node:Module = new Module(1,"Java", 12345, [], [], [], []);
    let event = {preventDefault: ()=>{}}
    component.check(node, event);
    expect(component.checked.get(node.id)).toBe(false);
  });

   it('Should test check, add {node,true} to checked', () => {
    let node:Module = new Module(1,"Java", 12345, [], [], [], []);
    let event = {preventDefault: ()=>{}}
    component.check(node, event);
    expect(component.checked.get(node.id)).toBe(true);
  });

});
