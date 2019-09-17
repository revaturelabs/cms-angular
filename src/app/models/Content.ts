import { Module } from './Module';

/** Content class for reports page */
export class Content {
   /** Number variable for id */
   id: number = 0;
   /** String variable for title */
   title: string = '[no title]';
   /** String variable for format */
   format: string = '[no format]';
   /** String variable for description */
   description: string = '-';
   /** String variable for url */
   url: string = '[no url]';
   /** Array of modules variable */
   modules: Module[] = [];

   /**
    * Constructor for creating content
    * @param id 
    * @param title 
    * @param format 
    * @param description 
    * @param url 
    * @param modules 
    */
   constructor(id: number, title: string, format: string, description: string, url: string, modules: Module[]) {
      if (null != id) this.id = id;
      if (null != title) this.title = title;
      if (null != format) this.format = format;
      if (null != description) this.description = description;
      if (null != url) this.url = url;
      if (null != modules) this.modules = modules;
   }

   public pushModule(module: Module){
      this.modules.push(module);
   }

   /** Getter method for id */
   public getId(): number {
      return this.id;
   }
   /** Getter method for title */
   public getTitle(): string {
      return this.title;
   }
   /** Getter method for format */
   public getFormat(): string {
      return this.format;
   }
   /** Getter method for description */
   public getDescription(): string {
      return this.description;
   }
   /** Getter method for url */
   public getUrl(): string {
      return this.url;
   }
   /** Getter method for modules */
   public getmodules(): Module[] {
      return this.modules;
   }
   /** Setter method for id */
   public setId(id: number) {
      this.id = id;
   }
   /** Setter method for title */
   public setTitle(title: string) {
      this.title = title;
   }
   /** Setter method for format */
   public setFormat(format: string) {
      this.format = format;
   }
   /** Setter method for description */
   public setDescription(description: string) {
      this.description = description;
   }
   /** Setter method for url */
   public setUrl(url: string) {
      this.url = url;
   }
   /** Setter method for modules */
   public setmodules(modules: Module[]) {
      this.modules = modules;
   }

}