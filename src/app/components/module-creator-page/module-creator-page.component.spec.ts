import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleCreatorPageComponent } from './module-creator-page.component';

describe('ModuleCreatorPageComponent', () => {
  let component: ModuleCreatorPageComponent;
  let fixture: ComponentFixture<ModuleCreatorPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModuleCreatorPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleCreatorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
