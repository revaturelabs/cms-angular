import { Pipe, PipeTransform } from '@angular/core';
import { CurrModule } from '../models/curr-module';
import { UtilService } from '../services/util.service';

@Pipe({
    name: 'currModulePriority'
})
export class CurrModulePriorityPipe implements PipeTransform {

    constructor(public util: UtilService) {}

    transform(nodes: CurrModule[]): CurrModule[] {

        return nodes.sort(this.util.sortCurrModulesByPriority);
    }

}
