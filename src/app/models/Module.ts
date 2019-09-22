import { Link } from './Link';

/** Common Tags to describe and sort Content */
export class Module {
   /** Unique Identifier */
   id: number = -1;
   /** Display string to describe Content */
   subject: string = '[undefined subject]';
   /** Date Module was created */
   created: number = 0;
   /** Links to Content */
   links: Link[] = [];
   /** Display background color in HEX */
   color: string;
   // Array containing the IDs of parent modules
      //parentModules: Array<number>;
   parents: Module[];
   // Array containing the IDs of child modules
   childrenModules: Array<number>;
   children: Module[];
   module: Module;

   /**
    * Create a new Module to describe and sort Content
    * @param id Unique Identifier
    * @param subject Display string 
    * @param created Date created
    * @param links Links to Content
    */
   constructor(id: number, subject: string, created: number, links: Link[], parents: Module[]) {
      if (id != null) this.id = id;
      if (subject != null) this.subject = subject;
      if (created != null) this.created = created;
      if (links != null) this.links = links;
      //this.children = [];
      this.parents = parents;

   }
}