import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatProgressSpinnerModule } from '@angular/material';
import { ToastrModule } from 'ngx-toastr';

import { SubmitRequestPageComponent } from './submit-request-page.component';
import { MatCardModule } from '@angular/material/card';

describe('SubmitRequestPageComponent', () => {
  let component: SubmitRequestPageComponent;
  let fixture: ComponentFixture<SubmitRequestPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmitRequestPageComponent ],
      imports: [ CommonModule,
        	 FormsModule,
        	 NgSelectModule,
        	 MatProgressSpinnerModule,
		 HttpClientTestingModule,
        	 ToastrModule.forRoot(),
           MatCardModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitRequestPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
