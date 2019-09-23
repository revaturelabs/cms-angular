import { Pipe, PipeTransform } from '@angular/core';
import {Module} from '../models/Module';
import {Request} from '../models/Request';
import {NgForm} from '@angular/forms';

@Pipe({
  name: 'request'
})
export class RequestPipe implements PipeTransform {

  transform(requests: Request[], filter: Request): any {
    console.log(filter);
    if (!requests) {return []; }
    if (!filter || filter.format === '' ) {return requests; }
    let req = requests.filter((request: Request) => this.applyTypeFilter(request, filter));
  }

  applyTypeFilter(request: Request, filter: Request): boolean {
    if (filter.format) {
      return request.format === filter.format;
    }
  }

}
