import { Content } from './Content';

export class ContentWrapper{
    content: Content;
    subject: string[];

    constructor(content: Content, subject: string[]){
        this.content = content;
        this.subject = subject;
    }

}