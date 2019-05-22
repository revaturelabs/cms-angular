export class Content {
   id: number;
   title: string;
   format: string;
   description: string;
   url: string;

   constructor(id: number, title: string, format: string, description: string, url: string) {
      this.id = id;
      this.title = title;
      this.format = format;
      this.description = description;
      this.url = url;
   }
}