import { Role } from './../../../shared/models/role';
import { Component, EventEmitter, Input, OnInit, Output, OnDestroy } from '@angular/core';
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
import { UserService } from './../../../shared/services/user.service';
import { FranchiseService } from './../../../shared/services/franchise.service';
import { Subscription } from 'rxjs/internal/Subscription';
@Component({
  selector: 'app-applicant-list',
  templateUrl: './applicant-list.component.html',
  styleUrls: ['./applicant-list.component.scss'],

})
export class ApplicantListComponent implements OnInit, OnDestroy {
  @Input() positionId: string;
  @Input() positionData: any;
  @Output() messageEvent = new EventEmitter<any>();
  @Input() store: any;
  applicants: any = [];
  dataSource: MatTableDataSource<Applicant>;
  actionsFrom: FormGroup;
  applicantData: any;
  storeData: any;
  isSubmitted: boolean;
  touchedRows: any;
  applicantId: string;
  applicantRetrieved: boolean;
  control: FormArray;
  hiringMangerData: any;
  franchiseDataSub: Subscription = new Subscription();
  franchiseData: any;
  franchiseName: string;
  selectedStore: any;
  displayColumns = ['applicantName', 'position','status', 'phoneNumber', 'actions'];
  applicantStatus = ApplicantStatus;
  constructor(
    public fb: FormBuilder,
    public applicantService: ApplicantService,
    public firestore: AngularFirestore,
    public dbHelper: FirestoreHelperService,
    public smsService: SmsService,
    public modalController: ModalController,
    public alertService: AlertService,
    public jobService: JobService,
    public userService: UserService,
    public franchiseService: FranchiseService
  ) { }

  ngOnInit() {
    this.touchedRows = [];
    this.actionsFrom = this.fb.group({
      tableRows: this.fb.array([])
    });
    this.storeData = this.store;
    this.selectedStore = JSON.parse(localStorage.getItem('selectedStoreData'));
    this.getHiringManager();
    this.getApplicantsByJobId(this.positionId);
    this.getFranchiseeByApplicant(this.selectedStore.franchiseId);
    this.isSubmitted = false;
    this.actionsFrom = this.fb.group({
      actions: ['', [Validators.required]],
    });
    this.applicantRetrieved = false;
  }
  ngAfterOnInit(){
    this.control = this.actionsFrom.get('tableRows') as FormArray;
  }
  ngOnDestroy(): void {
    this.franchiseDataSub.unsubscribe();
  }

  submitForm(applicant) {
    if (this.actionsFrom.valid) {
      const action = this.actionsFrom.controls.actions.value;
      console.log(applicant, action);
      if (action === 'scheduleInterview'){
          this.getApplicantAndSendCalendarLink(applicant, this.selectedStore, action);
        }
      if(action === 'interviewApplicant'){
        // route to a notes/ applicant details
        console.log('Interviewing applicant', applicant);
        this.getApplicantAndBringUpInterviewNotesModal(applicant, action);
        }
      if(action === 'hireApplicant') {
        this.getApplicantAndSendOnboardingLinks(applicant, this.selectedStore);
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
      const email = applicant.applicant.email;
      console.log('Hire Applicant', applicant);
      this.applicantDetails(applicant).then(data =>{
        console.log('display new hire modal');
      });
      this.applicantService.updateApplicant(email, {status: action} );
  }

  getUserDetail(franchiseId) {
    this.userService.getFranchiseUserByFranchiseId(franchiseId).subscribe(res => {
      if (res) {
        res.docs.forEach(doc => {
          const userData = doc.data() as any;
          this.franchiseName = userData.fullName || userData.firstName;
        });
      }
    });
  }

  getFranchiseeByApplicant(franchiseId) {
    this.franchiseDataSub = this.franchiseService.getFranchiseById(franchiseId).subscribe((res: any) => {
       if (res) {
          this.franchiseName = res.businessLegalName;
       } else {
         this.getUserDetail(franchiseId);
       }
     });
  }
  getHiringManager(){
    return this.firestore.collection('users', ref => ref.where('email', '==', this.positionData.hiringManagerId )
    .where('role', '==', Role.hiringManager))
    .get()
    .subscribe(ss => {
      if (ss.docs.length === 0) {
        console.log('Document not found! Try again!');
      } else {
        ss.docs.forEach(doc => {
          this.hiringMangerData = doc.data();
        });
      }
      return;
    });
  }
  getApplicantAndSendCalendarLink(applicant, store, action){
    console.log('applicant data ', applicant, 'store data',store);
    const email = applicant.applicant.email;
    const applicantName = applicant.applicant.name;
    const phoneNumber = applicant.applicant.phoneNumber;
    const jobTitle = this.positionData.jobTitle;
    const hiringManagerName = this.positionData.hiringManagersName;
    let calendarLink;
    if (this.hiringMangerData) {
      calendarLink = this.hiringMangerData.calendarLink;
    }
    const storeName = store.storeName;
    this.smsService.requestInterview(applicantName, storeName, this.franchiseName, hiringManagerName, jobTitle, phoneNumber, calendarLink)
      .subscribe((data: any) =>{
        console.log('sent request to lambda', data);
        if(data.errorType === 'Error'){
          const options = {
            autoClose: false,
            keepAfterRouteChange: false
          };
          console.log('trigger alert', data.errorMessage);
          this.applicantService.updateApplicant(email, {status: 'Last Message Failed'} );
          this.alertService.onAlert('default-alert').subscribe(m =>{
            console.log('where is my alert?', m, data.errorMessage);
          });
        } else {
          this.applicantService.updateApplicant(email, {status: action} );
          this.alertService.showSuccess(`Updated applicant ${applicantName} with status ${action}`);
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
    console.log('data pass addNewHire', applicant, storeData, this.hiringMangerData);
    const hiringMangerData = this.hiringMangerData;
    const addNewHireModal = await this.modalController.create({
      component: AddNewHireComponent,
      swipeToClose: true,
      componentProps: {
        applicant,
        storeData,
        hiringMangerData
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
