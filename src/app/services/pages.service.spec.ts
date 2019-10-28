import { TestBed } from '@angular/core/testing';
import { PagesService } from './pages.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('PagesService', () => {
  let pagesService: PagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports:[BrowserAnimationsModule]});
    pagesService = TestBed.get(PagesService);
  });

  it('should be created', () => {
    expect(pagesService).toBeTruthy();
  });
  
});

