import { Component, OnInit } from '@angular/core';
import { CurriculumFetcherService } from 'src/app/services/curriculum-fetcher.service';
import { Curriculum } from 'src/app/models/Curriculum';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-curriculum-creator-page',
  templateUrl: './curriculum-creator-page.component.html',
  styleUrls: ['./curriculum-creator-page.component.css']
})
export class CurriculumCreatorPageComponent implements OnInit {

  //Objects
  curricula:Curriculum[] = []
  curriculum:Curriculum = {id:null, name:null};
  curriculumName:string;
  isSubmitting: boolean;

  constructor(private router:Router,
              private cfs:CurriculumFetcherService,
              private toastr: ToastrService) { }

  ngOnInit() {
    //List all curricula
    this.cfs.getCurricula()
    .subscribe(res=>{
      this.curricula = res;
    });
  }

  submit(){

    // First isSubmitting is made true to start the spinner wheel. 
    this.isSubmitting = true;
    
    /* 
    To indicate whether or not something was input correctly, one tests whether or not this.subject, 
    the two-way databinded element, is an empty string, null, or undefined; i.e. no valid input was
    given. 
    */

    if (['', null, undefined].includes(this.curriculumName)) {
      this.toastr.error('Please fill in the input field!');
      this.resetVariables();
      return;
    }

    //Assign textbox to JSON
    this.curriculum.name = this.curriculumName;

    //Execute service and persist object
    this.cfs.createCurriculum(this.curriculum).subscribe(res=>{
      if (res != null) {
        this.toastr.success('Creation Success.');
        this.isSubmitting = false;
        this.cfs.getCurricula()
        .subscribe(res=>{
          this.curricula = res;
        });
        this.resetVariables();
      }
    });
  }

  //Set variables back to original value
  resetVariables() {
    this.curriculumName = "";
    this.isSubmitting = false;
  }
}
