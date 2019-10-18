import { Injectable } from '@angular/core';

import { Link } from '../models/Link';
import { Module } from '../models/Module';
import { Content } from '../models/Content';

@Injectable({
    providedIn: 'root'
})

export class SortSearchService {

    constructor() { }

    findLinkByModuleId(id: number, links: Link[]): Link {

        return this.findLinkByModuleIdHelper(id, 0, links.length - 1, links);
    }

    findLinkByModuleIdHelper(id: number, min: number, max: number, links: Link[]): Link {

        const idx = Math.floor((max + min) / 2);

        if (min > max) {

            return null;
        }
        
        if (links[idx].module.id === id) {

            return links[idx];

        } else if (links[idx].module.id > id) {

            return this.findLinkByModuleIdHelper(id, min, idx - 1, links);

        } else {

            return this.findLinkByModuleIdHelper(id, idx + 1, max, links);
        }
    }

    findLinkByLinkId(id: number, links: Link[]): Link {

        for (const link of links) {

            if (link.id === id) {

                return link;
            }
        }
    }

    findLinkIdxByModuleId(id: number, links: Link[]): number {

        return this.findLinkIdxByModuleIdHelper(id, 0, links.length - 1, links);
    }

    findLinkIdxByModuleIdHelper(id: number, min: number, max: number, links: Link[]): number {

        const idx = Math.floor((max + min) / 2);

        if (min > max) {

            return -1;
        }

        if (links[idx].module.id === id) {

            return idx;

        } else if (links[idx].module.id > id) {

            return this.findLinkIdxByModuleIdHelper(id, min, idx - 1, links);

        } else {

            return this.findLinkIdxByModuleIdHelper(id, idx + 1, max, links);
        }
    }

    findModuleById(id: number, modules: Module[]): Module {

        return this.findModuleByIdHelper(id, 0, modules.length - 1, modules);
    }

    findModuleByIdHelper(id: number, min: number, max: number, modules: Module[]): Module {

        const idx = Math.floor((max + min) / 2);

        if (min > max) {

            return null;
        }

        if (modules[idx].id === id) {

            return modules[idx];

        } else if (modules[idx].id > id) {

            return this.findModuleByIdHelper(id, min, idx - 1, modules);

        } else {

            return this.findModuleByIdHelper(id, idx + 1, max, modules);
        }
    }

    findModuleIdxById(id: number, modules: Module[]): number {

        return this.findModuleIdxByIdHelper(id, 0, modules.length - 1, modules);
    }

    findModuleIdxByIdHelper(id: number, min: number, max: number, modules: Module[]): number {

        const idx = Math.floor((max + min) / 2);

        if (min > max) {

            return null;
        }

        if (modules[idx].id === id) {

            return idx;

        } else if (modules[idx].id > id) {

            return this.findModuleIdxByIdHelper(id, min, idx - 1, modules);

        } else {

            return this.findModuleIdxByIdHelper(id, idx + 1, max, modules);
        }
    }

    sortLinksByModuleId(l1: Link, l2: Link): number {

        if (l1.module.id > l2.module.id) {

            return 1;
        }

        if (l1.module.id < l2.module.id) {

            return -1;
        }

        return 0;
    }

    sortContentLinksByPriority(c1: Content, c2: Content, host: Module): number {

        const l1: Link = this.findLinkByModuleId(host.id, c1.links.sort(this.sortLinksByModuleId));
        const l2: Link = this.findLinkByModuleId(host.id, c2.links.sort(this.sortLinksByModuleId));

        return this.sortLinksByPriority(l1, l2);
    }

    sortLinksByPriority(l1: Link, l2: Link): number {

        if (l1.priority === l2.priority) {

            return 0;
        }

        if (l1.priority === -1) {

            return 1;
        }

        if (l2.priority === -1) {

            return -1
        }

        if (l1.priority > l2.priority) {

            return 1;
        }

        if (l1.priority < l2.priority) {

            return -1;
        }

        if (l1.id > l2.id) {

            return 1;
        }

        if (l1.id < l2.id) {

            return -1;
        }
    }

    sortModulesById(m1: Module, m2: Module): number {

        if (m1.id > m2.id) {

            return 1;
        }

        if (m1.id < m2.id) {

            return -1;
        }

        return 0;
    }
}
