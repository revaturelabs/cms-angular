import { Pipe, PipeTransform } from '@angular/core';

import { Curriculum } from '../models/Curriculum';

@Pipe({
    name: 'curriculumFilter'
})

export class CurriculumFilterPipe implements PipeTransform {

    transform(nodes: Curriculum[], constraint: string): Curriculum[] {

        if (constraint === undefined) {

            return nodes;
        }

        return nodes.filter((curriculum: Curriculum) => {

            return curriculum.name.toLowerCase().includes(constraint.toLowerCase());
        });
    }

}
