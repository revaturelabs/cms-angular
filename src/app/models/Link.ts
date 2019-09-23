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
   affiliation: string = "relaventTo";

   /**
    * Create a new Link between Content and Module
    * @param id Unique identifier of link
    * @param fkContent Content to be linked
    * @param fkModule Module to be linked
    * @param affiliation Unused - Default "relaventTo"
    */
   constructor(id: number, content: Content, module: Module, affiliation: string) {
      if (null != id) this.id = id;
      if (null != content) this.content = content;
      if (null != module) this.module = module;
      if (null != affiliation) this.affiliation = affiliation;
   }

}