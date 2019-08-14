import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PopulateModulePage } from 'e2e/src/populate/populateModules.po';

import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule} from '@angular/material';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';

import { ModuleCreatorPageComponent } from './module-creator-page.component';

describe('ModuleCreatorPageComponent', () => {
  let component: ModuleCreatorPageComponent;
  let createModules: PopulateModulePage;
  let fixture: ComponentFixture<ModuleCreatorPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModuleCreatorPageComponent ],
      imports: [ 
        FormsModule,
        MatProgressSpinnerModule,
        HttpClientTestingModule,
        ToastrModule.forRoot()
        
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleCreatorPageComponent);
    component = fixture.componentInstance;
    createModules = new PopulateModulePage();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a CSS module', () => {
    createModules.inputTitle('CSS');
    expect(createModules.getTitleValue()).toEqual('CSS');
    createModules.clickSubmitButton();
  });

  it('', () => {
    expect
  });

  it('', () => {
    expect
  });

});
