export class Link {
   id: number = 0;
   contentId: number = 0;
   moduleId: number = -1;
   affiliation: string = "relaventTo";

   constructor(id: number, fkContent: number, fkModule: number, affiliation: string) {
      if (null != id) this.id = id;
      if (null != fkContent) this.contentId = fkContent;
      if (null != fkModule) this.moduleId = fkModule;
      if (null != affiliation) this.affiliation = affiliation;
   }

   public getId(): number {
      return this.id;
   }
   public setId(id: number) {
      this.id = id;
   }
   public getFkContent(): number {
      return this.contentId;
   }
   public setFkContent(fkContent: number) {
      this.contentId = fkContent;
   }
   public getFkModule(): number {
      return this.moduleId;
   }
   public setFkModule(fkModule: number) {
      this.moduleId = fkModule;
   }
   public getAffiliation(): string {
      return this.affiliation;
   }
   public setAffiliation(affiliation: string) {
      this.affiliation = affiliation;
   }
}