import { Content } from './Content';
import { Module } from './Module';

export class ContentModule {
   private id: number = -1;
   private fkContent: number = -1;
   private fkModule: number = -1;
   private affiliation: string = "[undefined affiliation]";
   private content: Content[] = null;
   private modules: Module[] = null;

   constructor(id: number, fkContent: number, affiliation: string, fkModule: number, content: Content[], modules: Module[]) {
      if (null != id) this.id = id;
      if (null != fkContent) this.fkContent = fkContent;
      if (null != fkModule) this.fkModule = fkModule;
      if (null != affiliation) this.affiliation = affiliation;
      if (null != content) this.content = content;
      if (null != modules) this.modules = modules;
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
   public getContent(): Content[] {
      return this.content;
   }
   public setContent(content: Content[]) {
      this.content = content;
   }
   public getModules(): Module[] {
      return this.modules;
   }
   public setModules(modules: Module[]) {
      this.modules = modules;
   }
}