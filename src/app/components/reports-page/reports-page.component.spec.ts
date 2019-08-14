import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { ReportsTimeGraphComponent } from 'src/app/components/reports-time-graph/reports-time-graph.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';
import { GlobalReports } from 'src/app/providers/GlobalReports';

import { ReportsPageComponent } from './reports-page.component';

describe('ReportsPageComponent', () => {
  let component: ReportsPageComponent;
  let fixture: ComponentFixture<ReportsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportsPageComponent, ReportsTimeGraphComponent],
      imports: [
        NgSelectModule,
        FormsModule,
        NgxChartsModule,
        HttpClientTestingModule,
        ToastrModule.forRoot()
      ],
      providers: [GlobalReports]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
