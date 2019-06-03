import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentModulePageComponent } from './content-module-page.component';

describe('ContentModulePageComponent', () => {
  let component: ContentModulePageComponent;
  let fixture: ComponentFixture<ContentModulePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentModulePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentModulePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
