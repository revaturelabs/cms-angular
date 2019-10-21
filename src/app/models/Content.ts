import { Link } from './Link';

/** Content class for reports page */
export class Content {

    /** Number variable for id */
    id: number = 0;

    /** String variable for title */
    title: string = '[no title]';

    /** String variable for format */
    format: string = '[no format]';

    /** String variable for description */
    description: string = '-';

    /** String variable for url */
    url: string = '[no url]';

    /** Array of links variable */
    links: Link[] = [];

    /**
     * Constructor for creating content
     * @param id 
     * @param title 
     * @param format 
     * @param description 
     * @param url 
     * @param links 
    */
    constructor(id: number, title: string, format: string, description: string, url: string, links: Link[]) {

        if (null != id) this.id = id;
        if (null != title) this.title = title;
        if (null != format) this.format = format;
        if (null != description) this.description = description;
        if (null != url) this.url = url;
        if (null != links) this.links = links;
    }
}
