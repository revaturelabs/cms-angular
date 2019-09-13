import { Link } from 'src/app/models/Link';
import { Content } from 'src/app/models/Content';
export class Request {
    id = 0;
    title = '[no title]';
    format = '[no format]';
    description = '-';
    content: Content = null;
    links: Link[] = [];

    /**
     * Constructor for creating content
     * @param id Unique identifier of Request
     * @param title Title string of the Request
     * @param format Resource format ex: Code, Document or PP
     * @param description Description of Request
     * @param content Url of content already in DB
     * @param links Links (Tags) for this Request
     */
   constructor(id: number, title: string, format: string, description: string, content: Content, links: Link[]) {
    if (null != id) { this.id = id; }
    if (null != title) { this.title = title; }
    if (null != format) { this.format = format; }
    if (null != description) { this.description = description; }
    if (null != content) { this.content = content; }
    if (null != links) { this.links = links; }
 }
    /** Getter method for id */
    public getId(): number {
        return this.id;
    }
    /** Getter method for title */
    public getTitle(): string {
        return this.title;
    }
    /** Getter method for format */
    public getFormat(): string {
        return this.format;
    }
    /** Getter method for description */
    public getDescription(): string {
        return this.description;
    }
    /** Getter method for url */
    public getContent(): Content {
        return this.content;
    }
    /** Getter method for Links */
    public getLinks(): Link[] {
        return this.links;
    }
    /** Setter method for id */
    public setId(id: number) {
        this.id = id;
    }
    /** Setter method for title */
    public setTitle(title: string) {
        this.title = title;
    }
    /** Setter method for format */
    public setFormat(format: string) {
        this.format = format;
    }
    /** Setter method for description */
    public setDescription(description: string) {
        this.description = description;
    }
    /** Setter method for url */
    public setUrl(content: Content) {
        this.content = content;
    }
    /** Setter method for Links */
    public setLinks(links: Link[]) {
        this.links = links;
    }

}
