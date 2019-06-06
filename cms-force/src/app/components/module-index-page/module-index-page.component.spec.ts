import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleIndexPageComponent } from './module-index-page.component';

describe('ModuleIndexPageComponent', () => {
  let component: ModuleIndexPageComponent;
  let fixture: ComponentFixture<ModuleIndexPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModuleIndexPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleIndexPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
