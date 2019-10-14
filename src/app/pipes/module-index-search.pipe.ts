import { Pipe, PipeTransform } from '@angular/core';

import { Module } from '../models/Module';

@Pipe({
    name: 'moduleIndexSearch'
})
export class ModuleIndexSearchPipe implements PipeTransform {

    transform(modules: Module[], constraint: string): Module[] {

        if (constraint === undefined) return modules;

        return modules.filter((module: Module) => {

            return module.subject.toLowerCase().includes(constraint.toLowerCase());
        });
    }

}
