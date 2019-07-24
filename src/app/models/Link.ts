/** Links between Content and Modules */
export class Link {
   /** Unique identifier of Link */
   id: number = 0;
   /** Content linked to Module */
   contentId: number = 0;
   /** Module linked to Content */
   moduleId: number = -1;
   /** Unused */
   affiliation: string = "relaventTo";

   /**
    * Create a new Link between Content and Module
    * @param id Unique identifier of link
    * @param fkContent Content to be linked
    * @param fkModule Module to be linked
    * @param affiliation Unused - Default "relaventTo"
    */
   constructor(id: number, fkContent: number, fkModule: number, affiliation: string) {
      if (null != id) this.id = id;
      if (null != fkContent) this.contentId = fkContent;
      if (null != fkModule) this.moduleId = fkModule;
      if (null != affiliation) this.affiliation = affiliation;
   }

   /**
    * Get link's unique identifier
    */
   public getId(): number {
      return this.id;
   }
   /**
    * Set link's unique identifier
    * @param id New Unique Identifier
    */
   public setId(id: number) {
      this.id = id;
   }
   /**
    * Get linked Content id
    */
   public getFkContent(): number {
      return this.contentId;
   }
   /**
    * Set linked Content id
    * @param fkContent Unique ID of content
    */
   public setFkContent(fkContent: number) {
      this.contentId = fkContent;
   }
   /**
    * Get linked Module id
    */
   public getFkModule(): number {
      return this.moduleId;
   }
   /**
    * Set linked Module id
    * @param fkModule Unique ID of module
    */
   public setFkModule(fkModule: number) {
      this.moduleId = fkModule;
   }
   /** Unused - Will return "relaventTo" */
   public getAffiliation(): string {
      return this.affiliation;
   }
   /** 
    * Unused - Can change affiliation string
    * @param affiliation What to set affiliation string to
    */
   public setAffiliation(affiliation: string) {
      this.affiliation = affiliation;
   }
}