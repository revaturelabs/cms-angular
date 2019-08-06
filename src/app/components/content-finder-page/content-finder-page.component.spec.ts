import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentFinderPageComponent } from './content-finder-page.component';

describe('ContentFinderPageComponent', () => {
  let component: ContentFinderPageComponent;
  let fixture: ComponentFixture<ContentFinderPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentFinderPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentFinderPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
