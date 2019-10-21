import { Content } from './Content';
import { Module } from './Module';

/** Links between Content and Modules */
export class Link {

    /** Unique identifier of Link */
    id: number = 0;

    /** Content linked to Module */
    content: Content = null;

    /** Module linked to Content */
    module: Module = null;

    /** Unused */
    affiliation: string = 'relaventTo';

    /** Placement of Content within linked Module */
    priority: number = 0;

    /**
    * Create a new Link between Content and Module
    * @param id Unique identifier of link
    * @param fkContent Content to be linked
    * @param fkModule Module to be linked
    * @param affiliation Unused - Default "relaventTo"
    * @param priority - Placement of Content within the linked Module
    */
    constructor(id: number, content: Content, module: Module, affiliation: string, priority: number) {

        if (id != null) {

            this.id = id;
        }

        if (content != null){

            this.content = content;
        }

        if (module != null) {

            this.module = module;
        }

        if (affiliation != null) {

            this.affiliation = affiliation;
        }

        if (priority != null) {

            this.priority = priority;
        }
    }
}
