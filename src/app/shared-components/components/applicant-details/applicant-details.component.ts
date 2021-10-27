import {Component, Input, OnInit} from '@angular/core';
import {ApplicantService} from "../../../shared/services/applicant.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {FirestoreHelperService} from "../../../shared/firestore-helper.service";

@Component({
  selector: 'app-applicant-details',
  templateUrl: './applicant-details.component.html',
  styleUrls: ['./applicant-details.component.scss'],
})
export class ApplicantDetailsComponent implements OnInit {
  @Input() applicant: any;
  applicantData: any;
  interviewNotes: FormGroup;
  constructor(public applicantService: ApplicantService, public fb: FormBuilder, public dbHelper: FirestoreHelperService) { }

  ngOnInit() {
    const applicant = this.applicant;
    console.log('incoming applicant', applicant)
    this.getApplicantDetailsByID(applicant)
    this.interviewFormInit()
  }
  interviewFormInit(){
    this.interviewNotes = this.fb.group({
      interviewNotes: ['']
    })
  }
  getApplicantDetailsByID(email){
    this.dbHelper.doc$(`applicant/${email}`).subscribe(data =>{
      this.applicantData = data
      console.log('applicant details', this.applicantData)
    })

  }
}
