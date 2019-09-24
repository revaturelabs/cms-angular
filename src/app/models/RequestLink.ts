import {Module} from './Module';
import {Request} from './Request';
import construct = Reflect.construct;

export class RequestLink {

    request: Request;
    tags: {affiliation: string,
            module: Module}[];
    constructor() {
    }
}
