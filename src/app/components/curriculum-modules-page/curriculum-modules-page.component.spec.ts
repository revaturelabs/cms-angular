import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurriculumModulesPageComponent } from './curriculum-modules-page.component';

describe('CurriculumModulesPageComponent', () => {
  let component: CurriculumModulesPageComponent;
  let fixture: ComponentFixture<CurriculumModulesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurriculumModulesPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurriculumModulesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
