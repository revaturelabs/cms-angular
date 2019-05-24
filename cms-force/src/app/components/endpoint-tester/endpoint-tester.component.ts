import { Component, OnInit } from '@angular/core';
import { EndpointsService } from 'src/app/constants/endpoints.service';
import { forEach } from '@angular/router/src/utils/collection';
import { stringify } from '@angular/compiler/src/util';

@Component({
   selector: 'app-endpoint-tester',
   templateUrl: './endpoint-tester.component.html',
   styleUrls: ['./endpoint-tester.component.css']
})
export class EndpointTesterComponent implements OnInit {

   constructor(private endpoints: EndpointsService) { }

   ngOnInit() {
      this.printEndpoints();
      this.interpolateEndpoints(43);
      this.interpolateEndpoints(2);
   }

   printEndpoints() {
      this.endpoints.getAllEndpoints().forEach(endpoint => {
         console.log(endpoint);
      });
   }

   interpolateEndpoints(id: number) {
      this.endpoints.getAllEndpoints().forEach(endpoint => {
         console.log(endpoint.replace('${id}', id.toString()));   // .replace() since can't interpolate string variable
      })
   }
}
