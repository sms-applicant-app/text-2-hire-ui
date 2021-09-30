import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Applicant} from '../../../shared/models/applicant';
import {ApplicantService} from '../../../shared/services/applicant.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {ApplicantStatus} from '../../../shared/models/applicant-status';
import {FirestoreHelperService} from "../../../shared/firestore-helper.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {SmsService} from "../../../shared/services/sms.service";



@Component({
  selector: 'app-applicant-list',
  templateUrl: './applicant-list.component.html',
  styleUrls: ['./applicant-list.component.scss'],
})
export class ApplicantListComponent implements OnInit {
  @Input() positionId: string;
  @Output() messageEvent = new EventEmitter<any>();
  applicantStatus: ApplicantStatus;
  applicants: any = [];
  dataSource: MatTableDataSource<Applicant>;
  actionsFrom: FormGroup;
  applicantData: any;
  displayColumns = ['applicantName', 'position','status', 'phoneNumber', 'actions'];
  constructor(public fb: FormBuilder,
              public applicantService: ApplicantService,
              public firestore: AngularFirestore,
              public dbHelper: FirestoreHelperService,
              public smsService: SmsService
  ) { }

  ngOnInit() {
    console.log('incoming positionId', this.positionId);
    this.getApplicantsByJobId(this.positionId);
    this.actionsFrom = this.fb.group({
      phoneNumber: [''],
      actions: [''],
      name:[''],

    });
  }
  // get applicants by job
  getApplicantsByJobId(positionId){
      this.firestore.collection('applicant', ref => ref.where('positionId', '==', `${positionId}`)).get()
        .subscribe( applicant =>{
          this.applicants = [];
          if (applicant.docs.length === 0){
            console.log('no applicants for that position');
          } else {
            applicant.forEach( a =>{
              const app = a.data();
              const id = a.id;
              this.applicants.push({id, applicant: app });
              this.dataSource = new MatTableDataSource<Applicant>(this.applicants);
            });
            console.log(this.applicants);
          }
        });

  }
  submitActionsToApplicants(id){
      this.dbHelper.doc$(`applicant/${id}`).subscribe(data =>{
        this.applicantData = data;
        const applicant = this.applicantData.name;
        const phoneNumber = this.applicantData.phoneNumber;
        const positionId = this.positionId;
        const calendarLink = JSON.parse(localStorage.getItem('appUserData')).calendarLink;
        this.smsService.requestInterview(applicant, positionId, phoneNumber, calendarLink).subscribe(resp =>{
          console.log('sent request to lambda', resp);
        });
      });
      this.applicantService.updateApplicant(id, {status: 'interviewRequested'} );
  }
  moveApplicantToNextStatus(id){
    console.log('applicant to update status', id);
    this.dbHelper.doc$(`applicant/${id}`).subscribe(data =>{
      console.log('applicant data', data);
    });
  }
  sendMessageGoBackToJobsList(){
    this.messageEvent.emit(false);
  }
  declineApplicant(id){
    const status = 'applicantDeclined';

    this.applicantService.updateApplicant(id, status);
  }
}
