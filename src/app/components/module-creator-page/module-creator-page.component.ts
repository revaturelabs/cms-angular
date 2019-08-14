import { Component, OnInit } from '@angular/core';
import { Module } from 'src/app/models/Module';
import { ModuleFetcherService } from 'src/app/services/module-fetcher.service';
import { ToastrService } from 'ngx-toastr';

/**
 * Description - Typescript component for module creator page
 */
@Component({
   selector: 'app-module-creator-page',
   templateUrl: './module-creator-page.component.html',
   styleUrls: ['./module-creator-page.component.css']
})
export class ModuleCreatorPageComponent implements OnInit {

   /**
    * Tag name/subject. This will be used for the actual storing of a module.
    */
   subject: string = "";

   /**
    * Checks to see if a spinner is required to be displayed if module submission is in progress.
    * This will be tied directly to the submit() function and triggered as such.
    */
   isSubmitting: boolean = false;

   /**
    * Constructor for Module Crator
    * @param mf; Grabs links/tag, specific to Modules. 
    * @param toastr; Uses the ToastrService, this will be used to indicate whether there was an
    * error in input, or a success.
    */
   constructor(
      private mf: ModuleFetcherService,
      private toastr: ToastrService
   ) { }

   /**@ignore */
   ngOnInit() {
   }

   /**
    * This function makes the observable call by creating a module object with the inputted subject field
    * with HTTP GET from the services ModuleFetcherServce
    */
   submit() {
      // First isSubmitting is made true to start the spinner wheel. 
      this.isSubmitting = true;
      /* 
      To indicate whether or not something was input correctly, one tests whether or not this.subject, 
      the two-way databinded element, is an empty string, null, or undefined; i.e. no valid input was
      given. 
      */
      if (['', null, undefined].includes(this.subject)) {
         this.toastr.error('Please fill in the input field!');
         this.resetVariables();
         return;
      }

      // Next create an instance of a Module  for storing, using the Module model.
      let module: Module = new Module(
         null, this.subject, null, null
      )

      /**
       * This sends the module data to the backend and then stores it if successful.
       */
      this.mf.createNewModule(module).subscribe(
         (response) => {
            if (response != null)
               this.toastr.success('Successfully sent module.');
            else
               this.toastr.error('There was a problem creating a subject');
            this.isSubmitting = false;
         },

         // Also if an empty response is given from valid request, than throws this error. 
         (response) => {
            this.toastr.error('Failed to create subject. Subject may already exist.');
            this.isSubmitting = false;
         },

         // Lastly, reset field.
         () => this.resetVariables()
      )
   }

   /**
    * Resets subject field by simply turning subject back into an empty string and making
    * isSubmitting false.
    */
   private resetVariables() {
      this.subject = "";
      this.isSubmitting = false;
   }
}
