import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurriculumCreatorPageComponent } from './curriculum-creator-page.component';

describe('CurriculumCreatorPageComponent', () => {
  let component: CurriculumCreatorPageComponent;
  let fixture: ComponentFixture<CurriculumCreatorPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurriculumCreatorPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurriculumCreatorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
