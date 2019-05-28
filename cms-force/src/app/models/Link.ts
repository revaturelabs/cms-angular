export class Link {
   private id: number = 0;
   private fkContent: number = 0;
   private fkModule: number = -1;
   private affiliation: string = "relaventTo";

   constructor(id: number, fkContent: number, fkModule: number, affiliation: string) {
      if (null != id) this.id = id;
      if (null != fkContent) this.fkContent = fkContent;
      if (null != fkModule) this.fkModule = fkModule;
      if (null != affiliation) this.affiliation = affiliation;
   }

   public getId(): number {
      return this.id;
   }
   public setId(id: number) {
      this.id = id;
   }
   public getFkContent(): number {
      return this.fkContent;
   }
   public setFkContent(fkContent: number) {
      this.fkContent = fkContent;
   }
   public getFkModule(): number {
      return this.fkModule;
   }
   public setFkModule(fkModule: number) {
      this.fkModule = fkModule;
   }
   public getAffiliation(): string {
      return this.affiliation;
   }
   public setAffiliation(affiliation: string) {
      this.affiliation = affiliation;
   }
}