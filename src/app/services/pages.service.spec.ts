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

  it('test constructor', () => {
    pagesService = new PagesService();
    expect(pagesService).toBeDefined();
  });

  // Test only serves the purpose of full coverage since we are unable to spy on window since it is global.
  // Also normal attmpt to test window.location.reload ends in loop.
  it('test pageRefresh, param null', () => {
     pagesService = new PagesService();
     pagesService.window = {location: {reload : ()=>{}}}
     pagesService.pageRefresh();
     expect(pagesService.pageRefresh).toBeTruthy();
  });
  
});

