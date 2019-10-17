import { Pipe, PipeTransform } from '@angular/core';
import { CurrModule } from '../models/curr-module';
import { SortSearchService } from '../services/sort-search.service';

@Pipe({
    name: 'currModulePriority'
})
export class CurrModulePriorityPipe implements PipeTransform {

    constructor(public ss: SortSearchService) {}

    transform(nodes: CurrModule[]): CurrModule[] {

        return nodes.sort(this.ss.sortCurrModulesByPriority);
    }

}
