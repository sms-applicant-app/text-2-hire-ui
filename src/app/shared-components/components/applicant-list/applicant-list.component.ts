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
import {Router, RouterModule} from "@angular/router";
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
  applicantsSub: Subscription = new Subscription();
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
  constructor(public fb: FormBuilder,
              public applicantService: ApplicantService,
              public firestore: AngularFirestore,
              public dbHelper: FirestoreHelperService,
              public smsService: SmsService,
              public modalController: ModalController,
              public alertService: AlertService,
              public jobService: JobService,
              public useService: UserService,
              public router: Router,
              public franchiseService: FranchiseService
  ) { }

  ngOnInit() {
    this.touchedRows = [];

    this.selectedStore = JSON.parse(localStorage.getItem('selectedStoreData'));
    if (this.selectedStore.storeHiringManager) {
      this.getHiringManager();
    }
    this.getApplicantsByJobId(this.positionId);
    this.getFranchiseeByApplicant(this.selectedStore.franchiseId);
    this.isSubmitted = false;
    this.applicantRetrieved = false;
  }
  ngAfterOnInit(){
  }
  ngOnDestroy(): void {
    this.franchiseDataSub.unsubscribe();
    this.applicantsSub.unsubscribe();
  }

  submitForm(applicant) {
    if (applicant.actionStatus) {
      const action = applicant.actionStatus;
      if (action === 'scheduleInterview'){
          this.getApplicantAndSendCalendarLink(applicant, this.selectedStore);
        }
      if(action === 'interviewApplicant'){
        // route to a notes/ applicant details
        this.getApplicantAndBringUpInterviewNotesModal(applicant);
        }
      if(action === 'hireApplicant') {
        console.log('Selected store to send on boarding links', this.selectedStore);
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
  // getApplicantAndBringUpInterviewNotesModal(applicant){
  //     const email = applicant.applicant.email;
  //     this.applicantDetails(applicant).then(data =>{
  //       console.log('display new hire modal');
  //     });
  //     this.applicantService.updateApplicant(email, {status: ApplicantStatus.interviewRequested} );
  // }
  getApplicantAndBringUpInterviewNotesModal(applicant, action) {
      console.log('appliacant at interview', applicant);
      this.closeModal();
      this.router.navigateByUrl(`store/store-interview/${applicant.id}`).catch(err => {
          console.log(err);
      });
      this.applicantService.updateApplicant(email, {status: ApplicantStatus.interviewRequested});
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
    console.log('get hiring manager ', this.selectedStore.storeHiringManager);
    return this.firestore.collection('users', ref => ref.where('email', '==', this.selectedStore.storeHiringManager).where('role', '==', 'hiringManager')).get()
      .subscribe(ss => {
        if (ss.docs.length === 0) {
          console.log('Document not found! Try again!');
        } else {
          ss.docs.forEach(doc => {
            this.hiringMangerData = doc.data();
            console.log('retrieved hiring manager',this.hiringMangerData);
          });
        }
      });
  }
    getApplicantAndSendCalendarLink(applicant, store){
      console.log('applicant data ', applicant, 'store data',store);
      const email = applicant.applicant.email;
      const applicantName = applicant.applicant.name;
      const phoneNumber = applicant.applicant.phoneNumber;
      const hiringManagerName = store.hiringManagersName;
      const storeName = store.storeName;
      //TODO the franchise sign up flow needs to be added so we can grab the legal business name
        let calendarLink;
        if (this.hiringMangerData) {
            calendarLink = this.hiringMangerData.calendarLink;
        }
      //    applicantName,
      //       storeName,
      //       franchiseName,
      //       hiringManagerName,
      //       jobTitle,
      //       calendarLink
      this.smsService.requestInterview(applicantName,storeName, this.franchiseName, hiringManagerName,this.positionData.jobTitle, phoneNumber, calendarLink).subscribe((data: any) =>{
        console.log('sent request to lambda', data);
        if(data.errorType === 'Error'){
          const options = {
            autoClose: false,
            keepAfterRouteChange: false
          };
          console.log('trigger alert', data.errorMessage);
          this.applicantService.updateApplicant(email, {status: 'Last Message Failed'} );
          this.alertService.showError(data.errorMessage);
        } else {
          this.applicantService.updateApplicant(email, {status: ApplicantStatus.interviewScheduled} );
          this.alertService.showSuccess(`Updated applicant ${applicantName} with status ${ApplicantStatus.interviewScheduled}`);
        }
    });
  }
  // get applicants by job
  getApplicantsByJobId(positionId){
    this.applicantsSub = this.firestore.collection('applicant', ref => ref.where('positionId', '==', `${positionId}`)).get()
      .subscribe( applicant =>{
        this.applicants = [];
        if (applicant.docs.length === 0){
          console.log('no applicants for that position');
        } else {
          applicant.forEach( a =>{
            const app = a.data() as any;
            const id = a.id;
            this.applicants.push({id, applicant: app, actionStatus: this.getActionStatus(app.status)});
            console.log('this.applicants', this.applicants);
          });
        }
      });
  }

  async applicantDetails(applicant){
    //TODO change to route interviewer to store/store-interview page
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
   const store = this.selectedStore;
   const hiringManager = this.hiringMangerData;
    console.log('applicant', applicant, store, hiringManager);
    const addNewHireModal = await this.modalController.create({
      component: AddNewHireComponent,
      swipeToClose: true,
      componentProps: {
        applicant,
        store,
        hiringManager
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

  getActionStatus(status: ApplicantStatus){
    switch (status) {
      case ApplicantStatus.interviewScheduled:
        return 'scheduleInterview';
        case ApplicantStatus.interviewRequested:
          return 'interviewApplicant';
        case ApplicantStatus.pendingOnboarding:
          return 'hireApplicant';
      default:
      return '';
    }
  }
}
