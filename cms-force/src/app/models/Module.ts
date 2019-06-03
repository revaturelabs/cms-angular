import { Link } from './Link';

export class Module {
   id: number = -1;
   subject: string = '[undefined subject]';
   created: number = 0;
   links: Link[] = [];
   color: string;

   constructor(id: number, subject: string, created: number, links: Link[]) {
      if (id != null) this.id = id;
      if (subject != null) this.subject = subject;
      if (created != null) this.created = created;
      if (links != null) this.links = links;
   }

   public getId(): number {
      return this.id;
   }

   public getSubject(): string {
      return this.subject;
   }

   public getCreated(): number {
      return this.created;
   }

   public getLinks(): Link[] {
      return this.links;
   }
   
   public getColor(): string {
     return this.color;
   }

   public setId(id: number) {
      this.id = id;
   }

   public setSubject(subject: string) {
      this.subject = subject;
   }

   public setCreated(created: number) {
      this.created = created;
   }

   public setLinks(links: Link[]) {
      this.links = links;
   }
   
   public setColor(color: string) {
     this.color = color;
   }
}