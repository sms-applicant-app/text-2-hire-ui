import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Applicant} from "../../../shared/models/applicant";
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthService} from "../../../shared/services/auth.service";
import {ApplicantService} from "../../../shared/services/applicant.service";

@Component({
  selector: 'app-register-applicant',
  templateUrl: './register-applicant.component.html',
  styleUrls: ['./register-applicant.component.scss'],
})
export class RegisterApplicantComponent implements OnInit {
  @Input() franchiseId: string;
  @Input() storeId: string;
  @Output() messageEvent = new EventEmitter<Applicant>();
  applicantDetailsForm: FormGroup;
  newApplicant: Applicant = new Applicant();
  userAdded: boolean;
  constructor(public fb: FormBuilder, public authService: AuthService, public applicantService: ApplicantService) { }

  ngOnInit() {}
  initApplicantDetailsForm(){
    this.applicantDetailsForm = this.fb.group({
      applicationName: [''],
      phoneNumber: [''],
    });
  }
  registerApplicant(email, password){
    this.authService.RegisterUser(email, password).then(data =>{
      this.newApplicant.email = email;
      console.log('user registered', data);
    });
  }
  addApplicantDetails(){
    this.newApplicant.name = this.applicantDetailsForm.controls.applicantName.value;
    this.newApplicant.phoneNumber = this.applicantDetailsForm.controls.applicantPhone.value;
    this.newApplicant.franchiseId = this.franchiseId;
    this.newApplicant.storeId = this.storeId;
    this.applicantService.createApplicant(this.newApplicant).then(data =>{
      console.log('new applicant added', data);
      this.sendApplicantMessage();
    });
  }
  sendApplicantMessage(){
    this.messageEvent.emit(this.newApplicant);
  }
}
