import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Address} from "../../shared/models/address";
import {Applicant} from "../../shared/models/applicant";
import {FormBuilder, FormGroup} from "@angular/forms";
import {AngularFirestore} from "@angular/fire/firestore";

@Component({
  selector: 'app-create-job-req',
  templateUrl: './create-job-req.page.html',
  styleUrls: ['./create-job-req.page.scss'],
})
export class CreateJobReqPage implements OnInit {
  @Input() storeId: string;
  @Output() messageEvent = new EventEmitter<Applicant>();
  applicantAdded: boolean;
  applicantCaptureForm: FormGroup;
  newApplicant: Applicant = new Applicant();
  franchiseId: string;
  private userId: string;
  private userData: any;
  constructor(public fb: FormBuilder,
              public firestore: AngularFirestore) { }

  ngOnInit() {
    this.userId = JSON.parse(localStorage.getItem('user')).email;
    this.firestore.doc(`users/${this.userId}`).get().subscribe(doc => {
      this.userData = doc.data();
      console.log('franchiseId in query', this.userData.franchiseId);
      this.franchiseId = this.userData.franchiseId;
    });
  }
  sendApplicantMessage(){
    this.messageEvent.emit(this.newApplicant);
  }
}
