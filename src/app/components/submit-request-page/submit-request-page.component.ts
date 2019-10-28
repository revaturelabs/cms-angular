import { Component, OnInit, Input } from '@angular/core';
import { ModuleStoreService } from '../../services/module-store.service';
import { Module } from 'src/app/models/Module';
import { ToastrService } from 'ngx-toastr';
import { ReqLink } from '../../models/ReqLink';
import { Request } from '../../models/Request';
import { SubmitRequestService } from '../../services/submit-request.service';

@Component({
  selector: 'app-submit-request-page',
  templateUrl: './submit-request-page.component.html',
  styleUrls: ['./submit-request-page.component.css']
})
export class SubmitRequestPageComponent implements OnInit {
  //Document format types 
  readonly formats: string[] = ["Code", "Document", "Powerpoint"];

  /** Description - boolean to display a spinner for submitting in progress */
  isSubmitting = false;

  //Selected from subject list
  selectedSubjects: string[] = [];

  //Holds modules of subjects
  modules: Module[];

  //Title of request
  title: string;

  //Format of the request
  selFormat: string = "Code";

  //Request description
  description: string;

  //Holds request links for a request
  rl: ReqLink[];

  constructor(
    public ms: ModuleStoreService,
    private srs: SubmitRequestService,
    private toastr: ToastrService
  ) { }

  //Load Modules on-page-load for dropdown menu
  ngOnInit() {
    this.ms.loadModules();
  }

  /** Check if the input fields are all valid - i.e. all fields are filled in */
  validInput(): boolean {
    const cantBeNull = [this.title, this.selFormat, this.description, this.selectedSubjects];

    if (cantBeNull.includes(null) || cantBeNull.includes(undefined)) { 
      return false; 
    }
    return true;
  }

  submit() {
    this.isSubmitting = true;

    this.rl = [];

    // if the input was not valid display a toastr message and return
    if (!this.validInput()) {
      this.toastr.error('Please fill in all input fields!');
      this.isSubmitting = false;
      return;
    }

    this.getModulesFromSubjects(this.selectedSubjects);

    this.modules.forEach(
      (module) => {
        this.rl.push(new ReqLink(null, null, module, null));
      }, this
    )

    const request: Request = new Request(null, this.title, this.selFormat, this.description, null, this.rl);

    this.srs.createNewRequest(request).subscribe(
      (response) => {
        if(response != null) {
          // on success, display a toastr message and reset the variables on this page
          this.toastr.success('Successfully sent content.');
          this.resetVariables();
        } else {
          this.toastr.error('Response was null.');
        }
      },
      (response) => {
        this.toastr.error('Failed to send Request.');
      }
    );
  }

  /** Clears the input fields after successful content submit */
   resetVariables() {
      this.title = null;
      this.selFormat = null;
      this.description = null;
      this.selectedSubjects = [];
      this.isSubmitting = false;
   }

  /**
    * Description - Gets the string array of selected subjects and populates
    * the module array of subject modules (or model or tag or whatever the team never really settled on the name like it was tag at first then prerequisite then modules then affiliation then subjects then back to modules like come on)
    * @param subjects - array of subjects
    */
  getModulesFromSubjects(subjects: string[]) {
      this.modules = [];
      subjects.forEach(
         (subject) => {
            this.modules.push(this.ms.subjectNameToModule.get(subject));
         }, this
      )
  }
}
