import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ApplicantService} from "../../../shared/services/applicant.service";
import {AngularFirestore} from "@angular/fire/firestore";
import {FirestoreHelperService} from "../../../shared/firestore-helper.service";
import {SmsService} from "../../../shared/services/sms.service";
import {ModalController} from "@ionic/angular";

@Component({
  selector: 'app-applicant-table-row',
  templateUrl: './applicant-table-row.component.html',
  styleUrls: ['./applicant-table-row.component.scss'],
})
export class ApplicantTableRowComponent implements OnInit {
  @Input() applicantId: any;
  actionsFrom: FormGroup;
  constructor(public fb: FormBuilder,
              public applicantService: ApplicantService,
              public firestore: AngularFirestore,
              public dbHelper: FirestoreHelperService,
              public smsService: SmsService,
              public modalController: ModalController,) { }

  ngOnInit() {
    console.log('incoming applicant id', this.applicantId);
    this.actionsFrom = this.fb.group({
      actions: ['']
    });
  }
  submitForm(){
    console.log('applicant id', this.applicantId, this.actionsFrom.value);
  }

}
