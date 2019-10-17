import { CurrModule } from './curr-module';

export class Curriculum{

    /** Unique Integer Id */
    id: number;

    /** Non-Unique Title of Curriculum */
    name: String;

    /** Curriculum-Module Links */
    currModules: CurrModule[];

    constructor(id: number, name: string, currModules: CurrModule[]) {

        if (id != null) {

            this.id = id;
        }

        if (name != null) {

            this.name = name;
        }

        if (currModules != null) {

            this.currModules = currModules;
        }
    }
}