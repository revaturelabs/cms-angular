import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsTimeGraphComponent } from './reports-time-graph.component';

describe('ReportsTimeGraphComponent', () => {
  let component: ReportsTimeGraphComponent;
  let fixture: ComponentFixture<ReportsTimeGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportsTimeGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsTimeGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
