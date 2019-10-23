import { CurriculumModuleFilterPipe } from './curriculum-module-filter.pipe';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Module } from '../models/Module';
import { Curriculum } from '../models/Curriculum';
import { CurriculumModule } from '../models/CurriculumModule';
describe('CurriculumModuleFilterPipe', () => {

  let curriculumModuleFilterPipe: CurriculumModuleFilterPipe;
  let modules: Module[] = [];
  let curriculum: Curriculum;
  let module: Module;
  let curriculumModule: CurriculumModule;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, BrowserAnimationsModule],
      providers: [CurriculumModuleFilterPipe]
    });
    curriculumModuleFilterPipe = TestBed.get(CurriculumModuleFilterPipe);
    modules = [];
    curriculum = new Curriculum(1, "Java", []);
    module = new Module(1, "Java", 12345,null,null, null, null);
    curriculumModule = new CurriculumModule(1, 1, 1, module);
  });

  it('create an instance', () => {
    expect(curriculumModuleFilterPipe).toBeTruthy();
  });

  it('should test transform empty', () => {
    expect(curriculumModuleFilterPipe.transform(modules,curriculum).length).toBe(0);
  });

  it('should test transform find match', () => {
    modules.push(module)
    curriculum.currModules.push(curriculumModule);
    expect(curriculumModuleFilterPipe.transform(modules,curriculum).length).toBe(0);
  });

  it('should test transform, find no match', () => {
    modules.push(module)
    let module2 = new Module(2, "C#", 12345,null,null, null, null);
    curriculumModule.module = module2;
    curriculum.currModules.push(curriculumModule);
    expect(curriculumModuleFilterPipe.transform(modules,curriculum).length).not.toBe(0);
  });

});
