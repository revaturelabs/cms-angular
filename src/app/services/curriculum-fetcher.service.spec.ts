import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CurriculumFetcherService } from './curriculum-fetcher.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Curriculum } from '../models/Curriculum';
import { CurriculumModule } from '../models/CurriculumModule';
import { environment } from '../../environments/environment'

describe('CurriculumFetcherService', () => {

    let httpTestingController;
    let curriculumFetcherService:CurriculumFetcherService;
    let curriculum:Curriculum;
    let curriculumModules: CurriculumModule[] = [];
    let baseURL = environment.cms_url;
    let curriculumModule: CurriculumModule;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, BrowserAnimationsModule],
      providers: [CurriculumFetcherService]
    });
    
    httpTestingController = TestBed.get(HttpTestingController);
    curriculumFetcherService = TestBed.get(CurriculumFetcherService);
    curriculum = new Curriculum(1,"Java",[]);
    curriculumModule = new CurriculumModule(1,1,1,null);
  });

  it('should be created', () => {
    expect(curriculumFetcherService).toBeTruthy();
  });

  it('should test getAllCurricula', () => {
    curriculumFetcherService.getAllCurricula().subscribe();
    const req = httpTestingController.expectOne(baseURL + '/curricula');
    expect(req.request.method).toEqual("GET");
    req.flush([]);
  });

  it('should test createCurriculum', () => {
    curriculumFetcherService.createCurriculum(curriculum).subscribe();
    const req = httpTestingController.expectOne(baseURL + '/curricula');
    expect(req.request.method).toEqual("POST");
  });

  it('should test getCurriculumById', () => {
    curriculumFetcherService.getCurriculumById(1).subscribe();
    const req = httpTestingController.expectOne(baseURL + '/curricula/1');
    expect(req.request.method).toEqual("GET");
  });

  it('should test updateCurriculumById', () => {
    curriculumFetcherService.updateCurriculumById(curriculum).subscribe();
    const req = httpTestingController.expectOne(baseURL + '/curricula/1');
    expect(req.request.method).toEqual("PUT");
  });

  it('should test deleteCurriculumById', () => {
    curriculumFetcherService.deleteCurriculumById(curriculum).subscribe();
    const req = httpTestingController.expectOne(baseURL + '/curricula/1');
    expect(req.request.method).toEqual("DELETE");
  });

  it('should test postSetOfCurriculumModules', () => {
    curriculumModules.push(curriculumModule)
    curriculumFetcherService.postSetOfCurriculumModules(curriculumModules).subscribe();
    const req = httpTestingController.expectOne(baseURL + '/curriculum-modules/curriculum/1');
    expect(req.request.method).toEqual("PUT");
  });

  it('should test deleteCurriculumModuleById', () => {
    curriculumFetcherService.deleteCurriculumModuleById(curriculumModule).subscribe();
    const req = httpTestingController.expectOne(baseURL + '/curriculum-modules/1');
    expect(req.request.method).toEqual("DELETE");
  });
  
});
