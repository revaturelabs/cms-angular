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
   parentModules: Array<number>;
   parentModulesObject: Module[];
   // Array containing the IDs of child modules
   childrenModules: Array<number>;
   childrenModulesObject: Module[];
   module: Module;

   /**
    * Create a new Module to describe and sort Content
    * @param id Unique Identifier
    * @param subject Display string 
    * @param created Date created
    * @param links Links to Content
    */
   constructor(id: number, subject: string, created: number, links: Link[], parentModules: Array<number>, childrenModules: Array<number>) {
      if (id != null) this.id = id;
      if (subject != null) this.subject = subject;
      if (created != null) this.created = created;
      if (links != null) this.links = links;
      if (parentModules != null) this.parentModules = parentModules;
      if (childrenModules != null) this.childrenModules = childrenModules;
      this.childrenModulesObject = [];
      this.parentModulesObject = [];

   }

   /**
    * Get unique identifier
    */
   public getId(): number {
      return this.id;
   }

   /**
    * Get string description of Module
    */
   public getSubject(): string {
      return this.subject;
   }

   // Get parentModules array
   public getParents(): Array<number>{
      return this.parentModules;
   }

   // Get childrenModules array
   public getChildren(): Array<number>{
      return this.childrenModules;
   }

   /**
    * Get date Module was created
    */
   public getCreated(): number {
      return this.created;
   }

   /**
    * Get array of links connected to Module
    */
   public getLinks(): Link[] {
      return this.links;
   }
   
   /**
    * Get display color of Module
    */
   public getColor(): string {
     return this.color;
   }

   /**
    * Set unique identifier
    * @param id New unique identifier
    */
   public setId(id: number) {
      this.id = id;
   }

   /**
    * Set new tag name
    * @param subject New tag name
    */
   public setSubject(subject: string) {
      this.subject = subject;
   }

   /**
    * Set created date
    * @param created Module creation date
    */
   public setCreated(created: number) {
      this.created = created;
   }

   /**
    * Set links connected to Module
    * @param links New array of links
    */
   public setLinks(links: Link[]) {
      this.links = links;
   }

   // set parentModules array for module
   public setParents(parentModules: Array<number>){
      this.parentModules = parentModules;
   }
   public setParentsObjects(parentModulesObject: Module[]){
      this.parentModulesObject = parentModulesObject;
   }

   // set childrenModules array for module
   public setChildren(childrenModules: Array<number>){
      this.childrenModules = childrenModules;
   }
   public setChildrenObjects(childrenModulesObject: Module[]){
      this.childrenModulesObject = childrenModulesObject;
   }
   
   /**
    * Set background color of Module
    * @param color New BG color
    */
   public setColor(color: string) {
     this.color = color;
   }
}