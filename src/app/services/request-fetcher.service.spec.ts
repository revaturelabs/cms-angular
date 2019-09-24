import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RequestFetcherService } from './request-fetcher.service';
import { ContentFetcherService } from './content-fetcher.service';
import { ToastrModule } from 'ngx-toastr';

describe('RequestFetcherService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule,
              ToastrModule.forRoot()],
    providers: [ContentFetcherService]
  }));

  it('should be created', () => {
    const service: RequestFetcherService = TestBed.get(RequestFetcherService);
    expect(service).toBeTruthy();
  });
});
