import { Content } from './Content';
import { Module } from './Module';

export class ContentWrapper {
   private contentToAdd: Content;
   private modulesToAdd: Module[];

   public ContentWrapper(contentToAdd: Content, modulesToAdd: Module[]) {
      if (null != contentToAdd) this.contentToAdd = contentToAdd;
      if (null != modulesToAdd) this.modulesToAdd = modulesToAdd;
   }

   public getContent(): Content {
      return this.contentToAdd;
   }
   public setContent(contentToAdd: Content) {
      this.contentToAdd = contentToAdd;
   }
   public getModules(): Module[] {
      return this.modulesToAdd;
   }
   public setModules(modulesToAdd: Module[]) {
      this.modulesToAdd = modulesToAdd;
   }
}