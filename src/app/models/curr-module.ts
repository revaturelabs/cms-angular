import { Curriculum } from './Curriculum';
import { Module } from './Module';

export class CurrModule {

    /** Unique Integer ID */
    id: number;

    /** How the relavent module is ordered in the curriculum */
    priority: number;

    /** Relavent Curriculum: Will be null after retrieval from backend to avoid infinite object nesting */
    curriculum: Curriculum;

    /** Relavent Module: Should never be null since we are retrieving these either from their own end point of curriculum */
    module: Module;

    constructor(id: number, priority: number, curriculum: Curriculum, module: Module) {

        if (id != null) {

            this.id = id;
        }

        if (priority != null) {

            this.priority = priority;
        }

        if (curriculum != null) {

            this.curriculum = curriculum;
        }

        if (module != null) {

            this.module = module;
        }
    }
}
