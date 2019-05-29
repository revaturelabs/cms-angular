export class Module {
   id: number = -1;
   subject: string = '[undefined subject]';
   created: number = 0;


   constructor(id: number, subject: string, created: number) {
      if (id != null) this.id = id;
      if (subject != null) this.subject = subject;
      if (created != null) this.created = created;
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

   public setId(id: number) {
      this.id = id;
   }

   public setSubject(subject: string) {
      this.subject = subject;
   }

   public setCreated(created: number) {
      this.created = created;
   }
}