import { Pipe, PipeTransform } from '@angular/core';
import { Link } from '../models/Link';

@Pipe({
    name: 'contentFilter'
})

export class ContentFilterPipe implements PipeTransform {

    formatEnum = {

        code: 0,
        document: 1,
        powerpoint: 2
    };

    transform(links: Link[], opts: boolean[], exp: string): Link[] {

        return links.filter((link: Link) => {
            return opts[this.formatEnum[link.content.format.toLowerCase()]] && (link.content.title.toLowerCase().includes(exp));
        });
    }

}
