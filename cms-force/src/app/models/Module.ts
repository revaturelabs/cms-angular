export class Module {
   private id: number = -1;
   private subject: string = '[undefined subject]';
   private created: number = 0;


   constructor(id: number, subject: string, created: number) {
      if (id != null) this.id = id;
      if (id != null) this.subject = subject;
      if (id != null) this.created = created;
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