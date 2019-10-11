import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { DisplayRequestPageComponent } from './display-request-page.component';
import { MatProgressSpinnerModule} from '@angular/material';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';
import { RouterTestingModule } from '@angular/router/testing';

import { MatCardModule } from '@angular/material/card';

describe('DisplayRequestPageComponent', () => {
  let component: DisplayRequestPageComponent;
  let fixture: ComponentFixture<DisplayRequestPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule,
                 NgSelectModule,
                 MatProgressSpinnerModule,
                 HttpClientTestingModule,
                 ToastrModule.forRoot(),
                 RouterTestingModule,
                 MatCardModule
                 ],
      declarations: [ DisplayRequestPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayRequestPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
