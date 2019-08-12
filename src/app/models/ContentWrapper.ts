import { Content } from './Content';

/**
 * Depreciated
 */
export class ContentWrapper{
    /** Content linked to Modules */
    content: Content;
    /** Modules Content is linked to */
    subject: string[];

    /** 
     * Depreciated
     * @param content - Content being wrapped
     * @param subject - Replaced by Links[] in Content
     */
    constructor(content: Content, subject: string[]){
        this.content = content;
        this.subject = subject;
    }

}