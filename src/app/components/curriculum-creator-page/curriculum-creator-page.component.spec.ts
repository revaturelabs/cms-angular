import { async, ComponentFixture, TestBed } from '@angular/core/testing';
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

fdescribe('CurriculumCreatorPageComponent', () => {
  let component: CurriculumCreatorPageComponent;
  let fixture: ComponentFixture<CurriculumCreatorPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CurriculumCreatorPageComponent
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
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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
