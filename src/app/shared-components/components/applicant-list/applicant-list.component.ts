import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Applicant} from '../../../shared/models/applicant';
import {ApplicantService} from '../../../shared/services/applicant.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {ApplicantStatus} from '../../../shared/models/applicant-status';
import {FirestoreHelperService} from "../../../shared/firestore-helper.service";
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {SmsService} from "../../../shared/services/sms.service";
import {ModalController} from "@ionic/angular";
import {AddNewHireComponent} from "../../../store/add-new-hire/add-new-hire.component";
import {ApplicantDetailsComponent} from "../applicant-details/applicant-details.component";
import {AlertService} from "../../../shared/services/alert.service";



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
  isSubmitted: boolean;
  touchedRows: any;
  applicantId: string;
  applicantRetrieved: boolean;
  control: FormArray;
  displayColumns = ['applicantName', 'position','status', 'phoneNumber', 'actions'];
  constructor(public fb: FormBuilder,
              public applicantService: ApplicantService,
              public firestore: AngularFirestore,
              public dbHelper: FirestoreHelperService,
              public smsService: SmsService,
              public modalController: ModalController,
              public alertService: AlertService
  ) { }

  ngOnInit() {
    this.touchedRows = [];
    this.actionsFrom = this.fb.group({
      tableRows: this.fb.array([])
    });

    console.log('incoming positionId', this.positionId);
    this.getApplicantsByJobId(this.positionId);
    this.isSubmitted = false;
    this.actionsFrom = this.fb.group({
      actions: [''],
    });
    this.applicantRetrieved = false;
  }
  ngAfterOnInit(){
    this.control = this.actionsFrom.get('tableRows') as FormArray;
  }


  submitForm(applicant) {
    const action = this.actionsFrom.controls.actions.value;
    console.log(action);
    console.log(applicant, action);
     if (action === 'scheduleInterview'){
        this.getApplicantAndSendCalendarLink(applicant, action);
      }
    if(action === 'interviewApplicant'){
      // route to a notes/ applicant details
      console.log('Interviewing applicant', applicant);
      this.getApplicantAndBringUpInterviewNotesModal(applicant, action);
      }
    if(action === 'hireApplicant') {
      this.getApplicantAndSendOnboardingLinks(applicant, action);
    }

   // this.submitActionsToApplicants(this.touchedRows)*/
    //this.applicantService.updateApplicant(applicantId, {status: action} );
  }

  getApplicantAndSendOnboardingLinks(applicant, action){
    this.addNewHire(applicant).then(data =>{
      console.log('display onboarding modal');

    });
  }
  getApplicantAndBringUpInterviewNotesModal(applicant, action){
      // route hiring manger to new hire page
      const email = applicant.email;
      console.log('Hire Applicant', applicant);
      this.applicantDetails(applicant).then(data =>{
        console.log('display new hire modal');
      });

  }
    getApplicantAndSendCalendarLink(applicant, action){
      console.log('applicant data ', applicant);
      const email = applicant.applicant.email;
      const applicantName = applicant.applicant.name;
      const phoneNumber = applicant.applicant.phoneNumber;
      const positionId = this.positionId;
      const calendarLink = JSON.parse(localStorage.getItem('appUserData')).calendarLink;
      this.smsService.requestInterview(applicantName, positionId, phoneNumber, calendarLink).subscribe((data: any) =>{
        console.log('sent request to lambda', data);
        if(data.errorType === 'Error'){
          const options = {
            autoClose: false,
            keepAfterRouteChange: false
          };
          console.log('trigger alert', data.errorType);
          this.applicantService.updateApplicant(email, {status: 'Last Message Failed'} );
          this.alertService.onAlert('default-alert').subscribe(m =>{
            console.log('where is my alert?', m, data.errorMessage);
          });
        } else {
          this.applicantService.updateApplicant(email, {status: action} );
        }
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

  async applicantDetails(applicant){
    const applicantDetails = await this.modalController.create({
      component: ApplicantDetailsComponent,
      swipeToClose: true,
      componentProps: {
        applicant
      }
    });
    return await applicantDetails.present();
  }
  async addNewHire(applicant){
    // add onboarding packages
    console.log('applicant', applicant);
    const addNewHireModal = await this.modalController.create({
      component: AddNewHireComponent,
      swipeToClose: true,
      componentProps: {
        applicant
      }
    });
    return await addNewHireModal.present();
  }
  sendMessageGoBackToJobsList(){
    this.messageEvent.emit(false);
  }
  declineApplicant(id){
    const status = 'applicantDeclined';
    // todo send message from Lambda
    this.applicantService.updateApplicant(id, status);
  }
}
