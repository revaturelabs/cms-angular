import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitRequestPageComponent } from './submit-request-page.component';

describe('SubmitRequestPageComponent', () => {
  let component: SubmitRequestPageComponent;
  let fixture: ComponentFixture<SubmitRequestPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmitRequestPageComponent ]
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
