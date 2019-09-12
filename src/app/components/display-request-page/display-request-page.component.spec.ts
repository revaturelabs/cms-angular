import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayRequestPageComponent } from './display-request-page.component';

describe('DisplayRequestPageComponent', () => {
  let component: DisplayRequestPageComponent;
  let fixture: ComponentFixture<DisplayRequestPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
