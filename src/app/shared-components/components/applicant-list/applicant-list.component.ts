import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Applicant} from '../../../shared/models/applicant';
import {ApplicantService} from '../../../shared/services/applicant.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {ApplicantStatus} from '../../../shared/models/applicant-status';
import {FirestoreHelperService} from '../../../shared/firestore-helper.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {SmsService} from '../../../shared/services/sms.service';
import {ModalController} from '@ionic/angular';
import {AddNewHireComponent} from '../../../store/add-new-hire/add-new-hire.component';
import {ApplicantDetailsComponent} from '../applicant-details/applicant-details.component';
import {AlertService} from '../../../shared/services/alert.service';
import { JobService } from './../../../shared/services/job.service';


@Component({
  selector: 'app-applicant-list',
  templateUrl: './applicant-list.component.html',
  styleUrls: ['./applicant-list.component.scss'],

})
export class ApplicantListComponent implements OnInit {
  @Input() positionId: string;
  @Output() messageEvent = new EventEmitter<any>();
  @Input() store: any;
  applicantStatus: ApplicantStatus;
  applicants: any = [];
  dataSource: MatTableDataSource<Applicant>;
  actionsFrom: FormGroup;
  applicantData: any;
  storeData: any;
  isSubmitted: boolean;
  touchedRows: any;
  applicantId: string;
  applicantRetrieved: boolean;
  positionDetails: any;
  control: FormArray;
  displayColumns = ['applicantName', 'position','status', 'phoneNumber', 'actions'];
  constructor(public fb: FormBuilder,
              public applicantService: ApplicantService,
              public firestore: AngularFirestore,
              public dbHelper: FirestoreHelperService,
              public smsService: SmsService,
              public modalController: ModalController,
              public alertService: AlertService,
              public jobService: JobService
  ) { }

  ngOnInit() {
    this.touchedRows = [];
    this.actionsFrom = this.fb.group({
      tableRows: this.fb.array([])
    });
    //TODO Bugfix store object not passed in to component @powergate delete this todo when completed
    this.storeData = this.store;
    console.log('incoming positionId', this.positionId, 'and store', this.store);
    this.getApplicantsByJobId(this.positionId);
    this.getPositionDetail();
    this.isSubmitted = false;
    this.actionsFrom = this.fb.group({
      actions: ['', [Validators.required]],
    });
    this.applicantRetrieved = false;
  }
  ngAfterOnInit(){
    this.control = this.actionsFrom.get('tableRows') as FormArray;
  }

  getPositionDetail() {
    this.jobService.getJobDetails(this.positionId).subscribe((data: any) => {
      if (data) {
        this.positionDetails = data;
      }
    });
  }

  submitForm(applicant) {
    if (this.actionsFrom.valid) {
      const action = this.actionsFrom.controls.actions.value;
      console.log(applicant, action);
      if (action === 'scheduleInterview'){
          this.getApplicantAndSendCalendarLink(applicant, this.store, action);
        }
      if(action === 'interviewApplicant'){
        // route to a notes/ applicant details
        console.log('Interviewing applicant', applicant);
        this.getApplicantAndBringUpInterviewNotesModal(applicant, action);
        }
      if(action === 'hireApplicant') {
        this.getApplicantAndSendOnboardingLinks(applicant, this.storeData);
      }
    } else {
      this.alertService.showError('Please choose Action');
    }
  }

  getApplicantAndSendOnboardingLinks(applicant, storeData){
    this.addNewHire(applicant, storeData).then(data =>{
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
    getApplicantAndSendCalendarLink(applicant, store, action){
      console.log('applicant data ', applicant);
      const email = applicant.applicant.email;
      const applicantName = applicant.applicant.name;
      const phoneNumber = applicant.applicant.phoneNumber;
      const positionId = this.positionId;
      const jobTitle = this.positionDetails.jobTitle;
      const hiringManagerName = store.hiringManagerName;
      const storeName = store.name;
      //TODO get franchise name from userAppData @powergate delete this todo when completed
      const franchiseName = 'ACME';
      const calendarLink = JSON.parse(localStorage.getItem('appUserData')).calendarLink;

      //    applicantName,
      //       storeName,
      //       franchiseName,
      //       hiringManagerName,
      //       jobTitle,
      //       calendarLink
      this.smsService.requestInterview(applicantName,storeName, franchiseName, hiringManagerName,phoneNumber, jobTitle, calendarLink).subscribe((data: any) =>{
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
  async addNewHire(applicant, storeData){
    // add onboarding packages
    console.log('applicant', applicant, storeData);
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
    closeModal() {
        this.modalController
            .dismiss()
            .then();
    }

}
