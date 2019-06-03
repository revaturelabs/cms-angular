import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EndpointTesterComponent } from './endpoint-tester.component';

describe('EndpointTesterComponent', () => {
  let component: EndpointTesterComponent;
  let fixture: ComponentFixture<EndpointTesterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EndpointTesterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EndpointTesterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
