import { Request } from './Request';
import { Module } from './Module';

/** ReqLinks between Request and Modules */
export class ReqLink {
    /** Unique identifier of Link */
    id: number = 0;
    /** Content linked to Module */
    request: Request = null;
    /** Module linked to Content */
    module: Module = null;
    /** Unused */
    affiliation: string = "relaventTo";
 }