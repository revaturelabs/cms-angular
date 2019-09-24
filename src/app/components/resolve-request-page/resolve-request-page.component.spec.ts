import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import {  NgSelectModule } from '@ng-select/ng-select';
import { MatProgressSpinnerModule } from '@angular/material';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';
import { ResolveRequestPageComponent } from './resolve-request-page.component';
import { RouterTestingModule } from '@angular/router/testing';
import { TreeModule } from 'angular-tree-component';
import { ContentCreatorPageComponent } from '../content-creator-page/content-creator-page.component';

describe('ResolveRequestPageComponent', () => {
  let component: ResolveRequestPageComponent;
  let fixture: ComponentFixture<ResolveRequestPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule,
        NgSelectModule,
        MatProgressSpinnerModule,
        HttpClientTestingModule,
        ToastrModule.forRoot(),
        TreeModule.forRoot(),
        RouterTestingModule
      ],
      declarations: [ ResolveRequestPageComponent, ContentCreatorPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResolveRequestPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
