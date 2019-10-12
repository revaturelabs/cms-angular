import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurriculumIndexComponent } from './curriculum-index.component';

describe('CurriculumIndexComponent', () => {
  let component: CurriculumIndexComponent;
  let fixture: ComponentFixture<CurriculumIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurriculumIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurriculumIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
