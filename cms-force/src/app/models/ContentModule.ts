import { Content } from '@angular/compiler/src/render3/r3_ast';

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

   getId(): number {
      return this.id;
   }
   setId(id: number) {
      this.id = id;
   }
   getFkContent(): number {
      return this.fkContent;
   }
   setFkContent(fkContent: number) {
      this.fkContent = fkContent;
   }
   getFkModule(): number {
      return this.fkModule;
   }
   setFkModule(fkModule: number) {
      this.fkModule = fkModule;
   }
   getAffiliation(): string {
      return this.affiliation;
   }
   setAffiliation(affiliation: string) {
      this.affiliation = affiliation;
   }
   getContent(): Content[] {
      return this.content;
   }
   setContent(content: Content[]) {
      this.content = content;
   }
   getModules(): Module[] {
      return this.modules;
   }
   setModules(modules: Module[]) {
      this.modules = modules;
   }
}