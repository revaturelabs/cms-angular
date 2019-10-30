import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule,
        MatMenuModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatIconModule,
        MatToolbarModule 
      ],
      declarations: [
        AppComponent,
        NavbarComponent
      ],
    })
    .compileComponents();
  }));

  /**
   * Tests for the main AppComponent that other views will be injected into. This just tests that
   * the component is successfully created with a title CMS-Force.
   */
  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;

    expect(app).toBeTruthy();

  });

  it(`should have as title 'cms-force'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    
    expect(app.title).toEqual('cms-force');

  });

});
