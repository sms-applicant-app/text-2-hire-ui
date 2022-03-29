import { Component, EventEmitter, Input, OnInit, Output, OnDestroy } from '@angular/core';
import {Router} from "@angular/router";
import {FileUploadService} from "../../../shared/services/file-upload.service";
import {JobService} from "../../../shared/services/job.service";
import {AngularFirestore} from "@angular/fire/firestore";
import {MatTableDataSource} from "@angular/material/table";
import {JobListing} from "../../../shared/models/job-listing";
import {AddJobReqComponent} from "../add-job-req/add-job-req.component";
import {ModalController} from "@ionic/angular";
import { Subscription, Subject} from "rxjs";
import {ApplicantService} from "../../../shared/services/applicant.service";
import {FirestoreHelperService} from "../../../shared/firestore-helper.service";
import {AddOnBoardPacketComponent} from "../add-on-board-packet/add-on-board-packet.component";
import {StoreService} from "../../../shared/services/store.service";
import { AlertService } from './../../../shared/services/alert.service';
import { Role } from './../../../shared/models/role';
import { AddApplicantComponent } from '../add-applicant/add-applicant.component';
import { AddJobStepComponent } from './../add-job-step/add-job-step.component';

@Component({
  selector: 'app-store-detail',
  templateUrl: './store-detail.component.html',
  styleUrls: ['./store-detail.component.scss'],
})
export class StoreDetailComponent implements OnInit, OnDestroy {
  @Input() franchiseId: string;
  @Input() storeId: string;
  @Output() messageEvent = new EventEmitter<any>();
  fileUploads?: any[];
  jobs: any = [];
  jobsSub: Subscription = new Subscription();
  jobData: any;
  userData: any;
  userRole: string;
  subscription: any;
  positionId: string;
  applicants: any = [];
  applicantsByStore: any = [];
  storeName: string;
  selectedStoreId: string;
  viewApplicants: boolean;
  storeData: any;
  dataSource: MatTableDataSource<JobListing>;
  displayColumns = ['jobId', 'title','status', 'location', 'actions'];
  //todo action see applicant status update position, schedule interview
  constructor(private uploadService: FileUploadService, public jobService: JobService,
              public firestore: AngularFirestore,
              public modalController: ModalController,
              public applicantService: ApplicantService,
              public dbHelper: FirestoreHelperService,
              public storeService: StoreService,
              public route: Router,
              public alertService: AlertService
              ) {
  }

  ngOnInit() {
    this.viewApplicants = false;
    this.userData = JSON.parse(localStorage.getItem('appUserData'));
   // if user role is hiring manager get jobs by storeId
    this.userRole = JSON.parse(localStorage.getItem('appUserData')).role;
    if (this.userRole === 'hiringManager'){
      this.getJobsByStoreId();
    } else {
      this.getJobsForFranchise(this.storeId);
      this.getApplicantsByStoreId(this.storeId);
    }
    this.sendJobsFranchiseIdMessage();
  }
  ngOnDestroy(): void {
    this.jobsSub.unsubscribe();
  }

  getJobsByFranchiseId(){
    this.firestore.collection('jobs', ref => ref.where('franchiseId', '==', this.franchiseId)).get()
      .subscribe(jobs =>{
        this.jobs= [];
        if(jobs.docs.length === 0){
          console.log('no docs with that franchise', this.franchiseId);
        } else {
          jobs.forEach(data =>{
            this.positionId = data.id;
            const j = data.data();
            this.jobs.push(j);
            this.dataSource = new MatTableDataSource<JobListing>(this.jobs);
          });
        }
      });
  }
  getJobsForFranchise(storeId){
   this.jobsSub = this.firestore.collection('jobs', ref => ref.where('storeId', '==', `${storeId}`)).get()
      .subscribe(jobs =>{
        this.jobs = [];
        if(jobs.docs.length === 0){
          console.log('no jobs with that store', this.storeId);
        } else {
          jobs.forEach(job =>{
            this.jobData = job.data();
            const positionId = job.id;
            this.jobs.push({id: positionId, position: this.jobData});
          });
        }
      });
  }
  getJobsByStoreId(){
    this.jobService.currentData.subscribe(storeId => {
      if (storeId) {
        this.storeId = storeId;
        this.storeService.getStoreByGeneratedStoreId(storeId).subscribe((store: any) =>{
            this.storeName = store[0].storeName;
            this.selectedStoreId = store[0].storeId;
            this.storeData = store[0];
        });
        this.firestore.collection('jobs', ref => ref.where('storeId', '==', storeId)).get()
          .subscribe(jobs =>{
            this.jobs = [];
            if(jobs.docs.length === 0){
              console.log('no jobs with that store', this.storeId);
            } else {
              this.jobs = jobs.docs.map(doc => {
                const data = doc.data();
                return {
                  id: doc.id,
                  position: data
                };
              });
              this.dataSource = new MatTableDataSource<JobListing>(this.jobs);
            }
          });
        }
    });
  }

  receiveNavigationMessage($event){
    this.viewApplicants = $event;
  }
  sendJobsFranchiseIdMessage(){
    this.messageEvent.emit(this.franchiseId);
  }
  async addJobStep(){
    let franchiseId;
    if (this.userRole === Role.hiringManager) {
      franchiseId = JSON.parse(localStorage.getItem('appUserData')).franchiseId;
    } else {
      franchiseId = JSON.parse(localStorage.getItem('selectedStoreData')).franchiseId;
    }
    const storeId = this.storeId;
    const onJobAddedSub = new Subject<JobListing>();
    const addJobRec = await this.modalController.create({
      component: AddJobStepComponent,
      swipeToClose: true,
      componentProps: {
        franchiseId,
        storeId,
        onJobAddedSub
      }
    });

    onJobAddedSub.subscribe((newJob: any) => {
      this.jobs.unshift(newJob);
    });
    
    addJobRec.onDidDismiss().then(data => {
      onJobAddedSub.unsubscribe();
    });
    return await addJobRec.present();
  }
  newOnboardPage(){
    this.route.navigate(['store/onboarding']);
  }
  async createOnboardingPacket(){
    const franchiseId = this.franchiseId;
    const storeId = this.storeId;
    const createOnboardPackage = await this.modalController.create({
      component: AddOnBoardPacketComponent,
      swipeToClose: true,
      componentProps: {
        franchiseId,
        storeId
      }
    });
    return await createOnboardPackage.present();
  }
  getApplicants(positionId: string, jobData: any) {
    this.jobData = jobData;
    this.viewApplicants = true;
    this.positionId = positionId;
    this.firestore.collection('applicant', ref => ref.where('positionId', '==', positionId)).get()
      .subscribe(ss =>{
        this.applicants = [];
        if (ss.docs.length === 0){
          console.log('no applicants for position', this.positionId);
        } else {
         ss.forEach( applicant =>{
           const a = applicant.data();
           const id = applicant.id;
           this.applicants.push({ id, applicant: a});
         });
        }
      });
  }

  getApplicantsByStoreId(storeId){
    this.firestore.collection('applicant', ref => ref.where('storeId', '==', `${storeId}`)).valueChanges()
    .subscribe(applicant =>{
      if(applicant && applicant.length > 0) {
        applicant.forEach( a =>{
          this.applicantsByStore = applicant;
        });
      }
    });
  }

  async addApplicant(job) {
    const applicantsByStoreSub = new Subject<any>();
    const createAddApplicant = await this.modalController.create({
      component: AddApplicantComponent,
      swipeToClose: true,
      componentProps: {
        job,
        applicantsByStoreSub
      }
    });
    applicantsByStoreSub.subscribe((newApplicant: any) => {
      console.log('newApplicant', newApplicant);
      this.applicantsByStore.unshift({id: newApplicant.id, applicant: newApplicant});
    });

    createAddApplicant.onDidDismiss().then(data => {
      applicantsByStoreSub.unsubscribe();
    });

    return await createAddApplicant.present();
  }

  deletePosition(jobDelete){
    this.alertService.alertConfirm('position').then((data) => {
      if (data) {
        this.jobService.deleteJob(jobDelete.id).then(() => {
          const index = this.jobs.findIndex(store => store.id === jobDelete.id);
          this.jobs.splice(index, 1);
          this.alertService.showSuccess(`Delete Success ${jobDelete.position.jobTitle}`);
        })
        .catch((err) => {
          this.alertService.showError('Delete Failed');
        });
      }
    });
  }

  closeModal() {
    this.modalController
        .dismiss()
        .then();
  }

  updatePosition(id){
    console.log('Update a position rather that is change pay rate rec number available, move applicant manually');
  }
  scheduleInterview(id){
    console.log('bring list of applicants for that position and select which applicant to schedule interview');
  }
}
