import { ReqLink } from './ReqLink';
import { Content } from './Content';

/** Content class for reports page */
export class Request {
   /** Number variable for id */
   id: number = 0;
   /** String variable for title */
   title: string = '[no title]';
   /** String variable for format */
   format: string = '[no format]';
   /** String variable for description */
   description: string = '-';
   /** Content object that resolves a Request */
   content: Content = null;
   /** Array of links variable */
   reqLinks: ReqLink[] =[];

   //Default creation/modified date, set in back end
   dateCreated: number = 0;
   lastModified: number = 0;

   /**
     * Constructor for requests
     * @Param id
     * @Param title
     * @Param format
     * @Param description
     * @Param content
     * @Param reqLinks
     */
   constructor(id: number, title: string, format: string, description: string, content: Content, reqLinks: ReqLink[]) {
     if(id != null) this.id = id;
     if(title != null) this.title = title;
     if(format != null) this.format = format;
     if(description != null) this.description = description;
     if(content != null) this.content = content;
     if(reqLinks != null) this.reqLinks = reqLinks;
   }
}
