import { Pipe, PipeTransform } from '@angular/core';

import { CurrModule } from '../models/curr-module';
import { Curriculum } from '../models/Curriculum';
import { Module } from '../models/Module';

@Pipe({
    name: 'currModuleFilter'
})
export class CurrModuleFilterPipe implements PipeTransform {

    transform(modules: Module[], node: Curriculum): Module[] {

        if (node.currModules.length === 0) {

            return modules;
        }
        
        return modules.filter(

            (module: Module) => {

                const ret = node.currModules.find(

                    (link: CurrModule) => {

                        return link.module.id === module.id;
                    }
                );
                
                return ret === undefined;
            }
        );
    }
}
