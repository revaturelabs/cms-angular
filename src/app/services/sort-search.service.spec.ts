import { TestBed } from '@angular/core/testing';
import { SortSearchService } from './sort-search.service';
import { Link } from '../models/Link';
import { Module } from '../models/Module';
import { Content } from '../models/Content';

describe('SortsService', () => {
  
  let service: SortSearchService;
  let module1: Module;
  let module2: Module;
  let link1: Link;
  let link2: Link;

  beforeEach(() => {
      TestBed.configureTestingModule({})
      service = TestBed.get(SortSearchService);
      module1 = new Module(1,null,null,[],null,null,null);
      module2 = new Module(2,null,null,[],null,null,null);
      link1 = new Link(1,null,null,null,1);
      link2 = new Link(2,null,null,null,1);
    }
  );

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should test findLinkByModuleId', () => {
    link1.module = module1;
    let links:Link[] = [link1];
    expect(service.findLinkByModuleId(1, links)).toBe(link1);
  });

  it('should test findLinkByModuleIdHelper, return null', () => {
   expect(service.findLinkByModuleIdHelper(1,2,1,[])).toBe(null);
  });

  it('should test findLinkByModuleIdHelper, search Upper', () => {
    link1.module = module1;
    link2.module = module1;
    let links:Link[] = [link1, link2];
   service.findLinkByModuleIdHelper(2,0,1,links);
  });

  it('should test findLinkByModuleIdHelper, search Lower', () => {
    link1.module = module2;
    link2.module = module2;
    let links:Link[] = [link2, link1];
   service.findLinkByModuleIdHelper(1,0,1,links);
  });

  it('should test findLinkByLinkId exists', () => {
    let links:Link[] = [link2, link1];
    expect(service.findLinkByLinkId(1,links)).toBe(link1);
  });

  it('should test findLinkByLinkId not found', () => {
    let links:Link[] = [link2];
    expect(service.findLinkByLinkId(1,links)).toBe(undefined);
  });

   it('should test findLinkIdxByModuleId', () => {
    link1.module = module1;
    link2.module = module2;
    let links:Link[] = [link1, link2];
    expect(service.findLinkIdxByModuleId(2,links)).toBe(1);
  });

  it('should test findLinkIdxByModuleIdHelper, invalid min/max', () => {
    expect(service.findLinkIdxByModuleIdHelper(0,4,2,[])).toBe(-1);
  });

  it('should test findLinkIdxByModuleIdHelper, lower Search', () => {
    link1.module = module1;
    link2.module = module2;
    let links:Link[] = [link1, link2];
    expect(service.findLinkIdxByModuleIdHelper(1,0,2,links)).toBe(0);
  });

  it('should test findModuleById', () => {
    let modules: Module[] = [module1, module2];
    expect(service.findModuleById(1,modules)).toBe(module1);
  });

  it('should test findModuleByIdHelper, invalid min/max', () => {
    expect(service.findModuleByIdHelper(1,4,2,[])).toBe(null);
  });

  it('should test findModuleByIdHelper, Upper Search', () => {
    let modules: Module[] = [module1, module2];
    expect(service.findModuleByIdHelper(2,0,1,modules)).toBe(module2);
  });

   it('should test findModuleByIdHelper, Lower Search', () => {
    let modules: Module[] = [module1, module2];
    expect(service.findModuleByIdHelper(1,0,2,modules)).toBe(module1);
  });

  it('should test findModuleIdxById', () => {
    //  let module1: Module = new Module(1,null,null,[],null,null,null);
    let modules: Module[] = [module1];
    expect(service.findModuleIdxById(1,modules)).toBe(0);
  });
  it('should test findModuleIdxByIdHelper, Upper Search', () => {
    let modules: Module[] = [module1, module2];
    expect(service.findModuleIdxByIdHelper(2,0,1,modules)).toBe(1);
  });

   it('should test findModuleIdxByIdHelper, Lower Search', () => {
    let modules: Module[] = [module1, module2];
    expect(service.findModuleIdxByIdHelper(1,0,2,modules)).toBe(0);
  });

  it('should test findModuleIdxByIdHelper, invalid min/max', () => {
    expect(service.findModuleIdxByIdHelper(1,4,2,[])).toBe(null);
  });

  it('should test sortLinksByModuleId Greater than return 1', () => {
    // let link1: Link = new Link(1,null,null,null,1);
    // let link2: Link = new Link(2,null,null,null,1);
    link1.module = module1;
    link2.module = module2;
    expect(service.sortLinksByModuleId(link2,link1)).toBe(1);
  });

  it('should test sortLinksByModuleId Less Than return -1', () => {
    // let link1: Link = new Link(1,null,null,null,1);
    // let link2: Link = new Link(2,null,null,null,1);
    link1.module = module1;
    link2.module = module2;
    expect(service.sortLinksByModuleId(link1,link2)).toBe(-1);
  });

  it('should test sortLinksByModuleId Equal return 0', () => {
   // let link1: Link = new Link(1,null,null,null,1);
    // let link2: Link = new Link(2,null,null,null,1);
    link1.module = module1;
    link2.module = module1;
    expect(service.sortLinksByModuleId(link2,link1)).toBe(0);
  });

  it('should test sortContentLinksByPriority', () => {
    link1.module = module1;
    link2.module = module1;
    link2.priority = 2;
    let content1:Content = new Content(1,null,null,null,null,[link1]);
    let content2:Content = new Content(2,null,null,null,null,[link2]);
    expect(service.sortContentLinksByPriority(content1,content2, module1)).toBe(-1);
  });

  it('should test sortLinksByPriority, same priority 0', () => {
    expect(service.sortLinksByPriority(link1,link2)).toBe(0);
  });

  it('should test sortLinksByPriority, link1 negative priority 1', () => {
     link1.priority = -1;
    expect(service.sortLinksByPriority(link1,link2)).toBe(1);
  });

  it('should test sortLinksByPriority, link2 negative priority -1', () => {
     link2.priority = -1;
    expect(service.sortLinksByPriority(link1,link2)).toBe(-1);
  });

   it('should test sortLinksByPriority, link1 greater priority 1', () => {
     link1.priority = 2;
    expect(service.sortLinksByPriority(link1,link2)).toBe(1);
  });

  it('should test sortLinksByPriority, link2 greater priority 1', () => {
     link2.priority = 2;
    expect(service.sortLinksByPriority(link1,link2)).toBe(-1);
  });

  it('should test sortLinksByPriority, link1 greater id 1', () => {
     link1.id = 3;
     link1.priority =  null;
     link2.priority = NaN;
    expect(service.sortLinksByPriority(link1,link2)).toBe(1);
  });

  it('should test sortLinksByPriority, link2 greater id 1', () => {
     link2.id = 3;
     link1.priority =  null;
     link2.priority = NaN;
    expect(service.sortLinksByPriority(link1,link2)).toBe(-1);
  });

  it('should test sortLinksByPriority, all equal', () => {
     link1.id = 3;
     link2.id = 3;
     link1.priority =  null;
     link2.priority = NaN;
    expect(service.sortLinksByPriority(link1,link2)).toBe(undefined);
  });

  it('should test sortModulesById module 1 greater id', () => {
    module1.id = 6;
    expect(service.sortModulesById(module1,module2)).toBe(1);
  });

  it('should test sortModulesById, module 2 greater id', () => {
    expect(service.sortModulesById(module1,module2)).toBe(-1);
  });
  
  it('should test sortModulesById, same id', () => {
    module1.id = 2;
    expect(service.sortModulesById(module1,module2)).toBe(0);
  });
});
