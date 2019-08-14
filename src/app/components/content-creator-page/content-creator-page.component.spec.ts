import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatProgressSpinnerModule} from '@angular/material';
import { ToastrModule } from 'ngx-toastr';

import { Content } from 'src/app/models/Content';
import { Link } from 'src/app/models/Link';

import { ContentCreatorPageComponent } from './content-creator-page.component';

describe('ContentCreatorPageComponent', () => {
  let component: ContentCreatorPageComponent;
  let fixture: ComponentFixture<ContentCreatorPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentCreatorPageComponent ],
      imports: [
        CommonModule,
        FormsModule,
        NgSelectModule, 
        MatProgressSpinnerModule,
        HttpClientTestingModule,
        ToastrModule.forRoot(),
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentCreatorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
