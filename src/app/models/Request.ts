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
}