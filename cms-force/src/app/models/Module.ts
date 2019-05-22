export class Module {
   id: number;
   subject: string;
   created: number;

   constructor(id: number, subject: string, created: number) {
      this.id = id;
      this.subject = subject;
      this.created = created;
   }
}