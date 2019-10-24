import { Pipe, PipeTransform } from '@angular/core';

import { CurriculumModule } from '../models/CurriculumModule';
import { Curriculum } from '../models/Curriculum';
import { Module } from '../models/Module';

@Pipe({
    name: 'currModuleFilter'
})
export class CurriculumModuleFilterPipe implements PipeTransform {

    transform(modules: Module[], node: Curriculum): Module[] {

        if (node.currModules.length === 0) {

            return modules;
        }
        
        return modules.filter(

            (module: Module) => {

                const ret = node.currModules.find(

                    (curriculumModule: CurriculumModule) => {

                        return curriculumModule.module.id === module.id;
                    }
                );
                return ret === undefined;
            }
        );
    }
}
