import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResolveRequestPageComponent } from './resolve-request-page.component';

describe('ResolveRequestPageComponent', () => {
  let component: ResolveRequestPageComponent;
  let fixture: ComponentFixture<ResolveRequestPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResolveRequestPageComponent ]
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
