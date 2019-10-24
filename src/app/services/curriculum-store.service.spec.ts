import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CurriculumStoreService } from './curriculum-store.service';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CurriculumFetcherService } from './curriculum-fetcher.service';
import { Curriculum } from '../models/Curriculum';
import { CurriculumModule } from '../models/CurriculumModule';
import { Observable,of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

describe('CurriculumStoreService', () => {

  let curriculumStoreService:CurriculumStoreService;
  let curriculumFetcherService: CurriculumFetcherService;
  let curriculums: Curriculum[]= [];
  let curriculum: Curriculum;
  let curriculumModule: CurriculumModule;
  let toastrService:ToastrService;

   beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ToastrModule.forRoot(),
        BrowserAnimationsModule
      ],
      providers: [CurriculumStoreService, CurriculumFetcherService, ToastrService]
    });
    curriculumStoreService = TestBed.get(CurriculumStoreService);
    curriculumFetcherService = TestBed.get(CurriculumFetcherService);
    toastrService = TestBed.get(ToastrService);
    curriculumModule = new CurriculumModule(1,1,1,null);
    curriculum = new Curriculum(1,"Java", []);
    curriculums = [];
  });

  it('should be created', () => {
    expect(curriculumStoreService).toBeTruthy();
  });

  it('should test loadCurricula, set nodes', () => {
    curriculum.currModules.push(curriculumModule);
    curriculums.push(curriculum);
    spyOn(curriculumFetcherService, 'getAllCurricula').and.returnValue(of(curriculums));
    curriculumStoreService.loadCurricula();
    expect(curriculumStoreService.nodes).toBe(curriculums);
  });

  it('should test loadCurricula, toastr error 1', () => {
    spyOn(curriculumFetcherService, 'getAllCurricula').and.returnValue(of(null));
    curriculumStoreService.loadCurricula();
    expect(toastrService.previousToastMessage).toBe('Failed to retrieve Curricula');
  });

  it('should test loadCurricula, toastr error 2', () => {
    const observable: Observable<Curriculum[]> = new Observable<Curriculum[]>((observer) => {
      observer.error({status: 400, statusText: "Bad Request"})
      observer.complete();
    });
    spyOn(curriculumFetcherService, 'getAllCurricula').and.returnValue(observable);
    curriculumStoreService.loadCurricula();
    expect(toastrService.previousToastMessage).toBe('Failed to retrieve Curricula');
  });

  it('should test loadCurriculumDetails, set curriculum', () => {
    spyOn(curriculumFetcherService, 'getCurriculumById').and.returnValue(of(curriculum));
    curriculumStoreService.loadCurriculumDetails(curriculum.id);
    expect(curriculumStoreService.curriculum).toBe(curriculum);
  });

  it('should test loadCurriculumDetails, toastr error 1', () => {
    //This should not be set, code needs a proper guard against null pointer, please review loadCurriculumDetails
    curriculumStoreService.curriculum = curriculum;
    spyOn(curriculumFetcherService, 'getCurriculumById').and.returnValue(of(null));
    curriculumStoreService.loadCurriculumDetails(curriculum.id);
    expect(toastrService.previousToastMessage).toBe('Failed to retrieve specified Curriculum');
  });

  it('should test loadCurriculumDetails, toastr error 2', () => {
    //This should not be set, code needs a proper guard against null pointer, please review loadCurriculumDetails
    curriculumStoreService.curriculum = curriculum;
    const observable: Observable<Curriculum> = new Observable<Curriculum>((observer) => {
      observer.error({status: 400, statusText: "Bad Request"})
      observer.complete();
    });
    spyOn(curriculumFetcherService, 'getCurriculumById').and.returnValue(observable);
    curriculumStoreService.loadCurriculumDetails(curriculum.id);
    expect(toastrService.previousToastMessage).toBe('Failed to retrieve specified Curriculum');
  });
});
