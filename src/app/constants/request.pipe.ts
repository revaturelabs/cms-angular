import { Pipe, PipeTransform } from '@angular/core';
import {Module} from '../models/Module';
import {Request} from '../models/Request';
import {NgForm} from '@angular/forms';

@Pipe({
  name: 'request'
})
export class RequestPipe implements PipeTransform {

  transform(requests: Request[], filter: Request): any {
    console.log(filter.format);
    if (!requests) {return []; }
    if (!filter || filter.format === '' ) {return requests; }
    return requests.filter((request: Request) => this.applyFilter(request, filter));
  }

  applyFilter(request: Request, filter: Request): boolean {
    if (filter.format) {
      return request.format === filter.format;
    }
  }
}
