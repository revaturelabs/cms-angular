import { Link } from './Link';

/**
 * Angular model for Content information.
 */
export class Content {
   /** Unique Identifier */
   id: number = 0;
   /** Title of Content */
   title: string = '[no title]';
   /** Content Format */
   format: string = '[no format]';
   /** Content Description */
   description: string = '-';
   /** Content URL Location */
   url: string = '[no url]';
   /** Content Module Links */
   links: Link[] =[];

   /**
 * Angular model for Content information.
 * @param id - Unique Identifier (number)
 * @param title - Title of content (string)
 * @param format - What the content is (string)
 * @param description - What the content contains (string)
 * @param url - Where the content is found (string)
 * @param links - Tags linking Modules with content (Link[])
 */
   constructor(id: number, title: string, format: string, description: string, url: string, links: Link[]) {
      if (null != id) this.id = id;
      if (null != title) this.title = title;
      if (null != format) this.format = format;
      if (null != description) this.description = description;
      if (null != url) this.url = url;
      if (null != links) this.links = links;
   }

   /**
    * Get unique identifier
    * @returns id: number
    */
   public getId(): number {
      return this.id;
   }

   /**
    * Get Content Title
    * @returns title: string
    */
   public getTitle(): string {
      return this.title;
   }

   /**
    * Get Format of Content
    * @returns format: string
    */
   public getFormat(): string {
      return this.format;
   }

   /**
    * Get Description of Content
    * @returns description: string
    */
   public getDescription(): string {
      return this.description;
   }

   /**
    * Get URL link of Content
    * @returns url: string
    */
   public getUrl(): string {
      return this.url;
   }

   /**
    * Get List of Links of Content
    * @returns links: Link[]
    */
   public getLinks(): Link[] {
      return this.links;
   }

   /**
    * Set Unique Identifier
    * @param id - New Identifier (number)
    */
   public setId(id: number) {
      this.id = id;
   }

   /**
    * Set Content Title
    * @param title - New Title (string)
    */
   public setTitle(title: string) {
      this.title = title;
   }

   /**
    * Set Content Format
    * @param format - New Format (string)
    */
   public setFormat(format: string) {
      this.format = format;
   }

   /**
    * Set Content Description
    * @param description - New Description (string)
    */
   public setDescription(description: string) {
      this.description = description;
   }

   /**
    * Set Content URL
    * @param url - New URL (string)
    */
   public setUrl(url: string) {
      this.url = url;
   }

   /**
    * Set Content Links
    * @param links New Link Array (Link[])
    */
   public setLinks(links: Link[]) {
      this.links = links;
   }

}