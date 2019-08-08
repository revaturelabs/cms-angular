import { Link } from './Link';

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
   /** Array of links variable */
   links: Link[] =[];

   /**
    * Constructor for creating content
    * @param id 
    * @param title 
    * @param format 
    * @param description 
    * @param url 
    * @param links 
    */
   constructor(id: number, title: string, format: string, description: string, url: string, links: Link[]) {
      if (null != id) this.id = id;
      if (null != title) this.title = title;
      if (null != format) this.format = format;
      if (null != description) this.description = description;
      if (null != url) this.url = url;
      if (null != links) this.links = links;
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
   /** Getter method for Links */
   public getLinks(): Link[] {
      return this.links;
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
   /** Setter method for Links */
   public setLinks(links: Link[]) {
      this.links = links;
   }

}