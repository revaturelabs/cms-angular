import { Link } from './Link';
import { ReqLink } from './ReqLink';

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
   /** ReqLinks to Request */
   reqLinks: ReqLink[] = [];
   /** Display background color in HEX */
   color: string;
   // Array containing the IDs of parent modules
   parents: Module[];
   // Array containing the IDs of child modules
   children: Module[];

   /**
    * Create a new Module to describe and sort Content
    * @param id Unique Identifier
    * @param subject Display string 
    * @param created Date created
    * @param links Links to Content
    */
   constructor(id: number, subject: string, created: number, links: Link[], reqLinks: ReqLink[], 
               parents: Module[], children: Module[]) {
      if (id != null) {
         this.id = id;
      } 
      if (subject != null) {
         this.subject = subject;
      } 
      if (created != null) {
         this.created = created;
      }
      if (links != null) {
         this.links = links;
      }
      if (reqLinks != null) {
         this.reqLinks = reqLinks;
      }
      if (parents != null) {
         this.parents = parents;
      } else {
         this.parents = [];
      }
      if (children != null) {
         this.children = children;
      } else {
         this.children = [];
      }
   }

}