import { TestBed } from '@angular/core/testing';

import { ModuleStoreService } from './module-store.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';

describe('ModuleStoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
      ToastrModule.forRoot()
    ]
  }));

  it('should be created', () => {
    const service: ModuleStoreService = TestBed.get(ModuleStoreService);
    expect(service).toBeTruthy();
  });

  it('should do something', () => {
    // let service = new ModuleStoreService();
  });

  it('', () => {

  });

});
