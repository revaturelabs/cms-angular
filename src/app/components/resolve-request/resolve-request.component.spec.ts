import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResolveRequestComponent } from './resolve-request.component';

describe('ResolveRequestComponent', () => {
  let component: ResolveRequestComponent;
  let fixture: ComponentFixture<ResolveRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResolveRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResolveRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
