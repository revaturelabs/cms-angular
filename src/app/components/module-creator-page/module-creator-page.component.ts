import { Component, OnInit } from '@angular/core';
import { Module } from 'src/app/models/Module';
import { ModuleFetcherService } from 'src/app/services/module-fetcher.service';
import { ToastrService } from 'ngx-toastr';

@Component({
   selector: 'app-module-creator-page',
   templateUrl: './module-creator-page.component.html',
   styleUrls: ['./module-creator-page.component.css']
})
export class ModuleCreatorPageComponent implements OnInit {

   subject: string = "";

   constructor(
      private mf: ModuleFetcherService,
      private toastr: ToastrService
   ) { }

   ngOnInit() {
   }

   /**
    * Makes the observable call by creating a module object with the inputted subject field
    * with HTTP GET from the services
    */
   submit() {

      /* If input field is null alert the user */
      if (['', null, undefined].includes(this.subject)) {
         this.toastr.error('Please fill in the input field!');
         this.resetVariables();
         return;
      }

      let module: Module = new Module(
         null, this.subject, null, null
      )

      this.mf.createNewModule(module).subscribe(
         /* On Success */
         (response) => {
            if (response != null)
               this.toastr.success('Successfully sent module.');
            else
               this.toastr.error('There was a problem creating a subject');
         },

         /* On Failure */
         (response) => {
            this.toastr.error('Failed to create subject. Subject may already exist.');
         },

         /* After success */
         () => this.resetVariables()
      )
   }

   private resetVariables() {
      this.subject = "";
   }
}
