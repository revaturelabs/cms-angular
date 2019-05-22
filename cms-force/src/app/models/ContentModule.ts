export class ContentModule {
   id: number;
   fkContent: number;
   affiliation: string;
   fkModule: number;

   constructor(id: number, fkContent: number, affiliation: string, fkModule: number) {
      this.id = id;
      this.fkContent = fkContent;
      this.affiliation = affiliation;
      this.fkModule = fkModule;
   }
}