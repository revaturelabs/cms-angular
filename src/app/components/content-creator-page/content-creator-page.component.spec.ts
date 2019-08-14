import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentCreatorPageComponent } from './content-creator-page.component';

describe('ContentCreatorPageComponent', () => {
  let component: ContentCreatorPageComponent;
  let fixture: ComponentFixture<ContentCreatorPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentCreatorPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentCreatorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
