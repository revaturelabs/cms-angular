import { Link } from './Link';

export class Content {
   id: number = 0;
   title: string = '[no title]';
   format: string = '[no format]';
   description: string = '-';
   url: string = '[no url]';
   links: Link[] =[];

   constructor(id: number, title: string, format: string, description: string, url: string, links: Link[]) {
      if (null != id) this.id = id;
      if (null != title) this.title = title;
      if (null != format) this.format = format;
      if (null != description) this.description = description;
      if (null != url) this.url = url;
      if (null != links) this.links = links;
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

   public getLinks(): Link[] {
      return this.links;
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

   public setLinks(links: Link[]) {
      this.links = links;
   }

}