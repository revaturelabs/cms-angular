import { Pipe, PipeTransform } from '@angular/core';

import { Content } from '../models/Content';
import { Module } from '../models/Module';
import { Link } from '../models/Link';

import { UtilService } from '../services/util.service';

@Pipe({
    name: 'contentOrder'
})
export class ContentOrderPipe implements PipeTransform {

    constructor(private util: UtilService) {}

    transform(links: Link[], host: Module, sortOption: number): Link[] {

        switch (sortOption) {

            case 1: return links.sort(this.util.sortLinksByPriority);

            default: return links;
        }
    }
}
