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

    /**
    * Constructor for creating a new request link
    * @param id 
    * @param request 
    * @param module 
    * @param affiliation 
    */
   constructor(id: number, request: Request, module: Module, affiliation: string) {
      if (null != id) this.id = id;
      if (null != request) this.request = request;
      if (null != module) this.module = module;
      if (null != affiliation) this.affiliation = affiliation;
   }
 }
