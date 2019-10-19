import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CurriculumStoreService } from './curriculum-store.service';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('CurriculumStoreService', () => {
   beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ToastrModule.forRoot(),
        BrowserAnimationsModule
      ],
      providers: [CurriculumStoreService]
    });
    });

  it('should be created', () => {
    const service: CurriculumStoreService = TestBed.get(CurriculumStoreService);
    expect(service).toBeTruthy();
  });
});
