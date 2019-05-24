import { Module } from './Module';

export class Content {
   private id: number;
   private title: string;
   private format: string;
   private description: string;
   private url: string;
   private modules: Module[];

   constructor(id: number, title: string, format: string, description: string, url: string, modules: Module[]) {
      this.id = id;
      this.title = title;
      this.format = format;
      this.description = description;
      this.url = url;
      this.modules = modules;
   }

   public getId(): number {
      return this.id;
   }

   public getTitle(): string {
      return this.title;
   }

   public getFormat(): string {
      return this.format;
   }

   public getDescription(): string {
      return this.description;
   }

   public getUrl(): string {
      return this.url;
   }

   public getModules(): Module[] {
      return this.modules;
   }

   public setId(id: number) {
      this.id = id;
   }

   public setTitle(title: string) {
      this.title = title;
   }

   public setFormat(format: string) {
      this.format = format;
   }

   public setDescription(description: string) {
      this.description = description;
   }

   public setUrl(url: string) {
      this.url = url;
   }

   public setModules(modules: Module[]) {
      this.modules = modules;
   }
}