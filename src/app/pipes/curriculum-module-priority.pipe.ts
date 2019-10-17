import { Pipe, PipeTransform } from '@angular/core';
import { CurriculumModule } from '../models/CurriculumModule';
import { SortSearchService } from '../services/sort-search.service';

@Pipe({
    name: 'currModulePriority'
})
export class CurriculumModulePriorityPipe implements PipeTransform {

    constructor(public ss: SortSearchService) {}

    transform(nodes: CurriculumModule[]): CurriculumModule[] {

        return nodes.sort(this.ss.sortCurriculumModulesByPriority);
    }

}
