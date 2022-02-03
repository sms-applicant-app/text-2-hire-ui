import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FileUploadService} from "../../../shared/services/file-upload.service";
import {map, take} from "rxjs/operators";
import {JobService} from "../../../shared/services/job.service";
import {AngularFirestore} from "@angular/fire/firestore";
import {MatTableDataSource} from "@angular/material/table";
import {Store} from "../../../shared/models/store";
import {JobListing} from "../../../shared/models/job-listing";
import {AddJobReqComponent} from "../add-job-req/add-job-req.component";
import {ModalController} from "@ionic/angular";
import {BehaviorSubject, Observable, pipe} from "rxjs";
import {ApplicantService} from "../../../shared/services/applicant.service";
import {FirestoreHelperService} from "../../../shared/firestore-helper.service";
import {CreateNewHirePackageComponent} from "../create-new-hire-package/create-new-hire-package.component";
import {AddOnBoardPacketComponent} from "../add-on-board-packet/add-on-board-packet.component";
import {Router} from "@angular/router";
import {StoreService} from "../../../shared/services/store.service";

@Component({
  selector: 'app-jobs-list',
  templateUrl: './jobs-list.component.html',
  styleUrls: ['./jobs-list.component.scss'],
})
export class JobsListComponent implements OnInit {
  @Input() franchiseId: string;
  @Input() storeId: string;
  @Output() messageEvent = new EventEmitter<any>();
  fileUploads?: any[];
  jobs: any = [];
  userData: any;
  userRole: string;
  subscription: any;
  positionId: string;
  applicants: any = [];
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
              public route: Router) {
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
    }
   this.sendJobsFranchiseIdMessage();
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
    this.firestore.collection('jobs', ref => ref.where('storeId', '==', storeId)).get()
      .subscribe(jobs =>{
        this.jobs = [];
        if(jobs.docs.length === 0){
          console.log('no jobs with that store', this.storeId);
        } else {
          jobs.forEach(job =>{
            const j = job.data();
            const positionId = job.id;
            this.jobs.push({id: positionId, position:j});
            this.dataSource = new MatTableDataSource<JobListing>(this.jobs);
          });
        }
      });
  }
  getJobsByStoreId(){

    this.jobService.currentData.subscribe(data =>{
      const storeId = data;
      if (storeId){
        this.storeService.getStoreByGeneratedStoreId(storeId).subscribe((store: any) =>{
          this.storeName = store[0].storeName;
          this.selectedStoreId = store[0].storeId;
          this.storeData = store[0];
          console.log('Store selected',store[0]);
        });
      }

      console.log('storeId from service', storeId);
      // TODO @Powergate re verify this function. For some reason the brackets around storeId causing firebase error but commented this out for testing
    /*  if((typeof storeId !== 'string' && typeof storeId !== 'number') || !storeId){
        return 'missing store id';
      }*/
      this.storeId = data;
      this.firestore.collection('jobs', ref => ref.where('storeId', '==', storeId)).get()
        .subscribe(jobs =>{
          this.jobs = [];
          if(jobs.docs.length === 0){
            console.log('no jobs with that store', this.storeId);
          } else {
            jobs.forEach(job =>{
              const j = job.data();
              const positionId = job.id;
              this.jobs.push({id: positionId, position:j});
              console.log(this.jobs, 'id', positionId);
              this.dataSource = new MatTableDataSource<JobListing>(this.jobs);
            });
          }
        });
      });
  }

  receiveNavigationMessage($event){
    this.viewApplicants = $event;
  }
  sendJobsFranchiseIdMessage(){
    this.messageEvent.emit(this.franchiseId);
  }
  async addJobRec(){
    const franchiseId = JSON.parse(localStorage.getItem('appUserData')).franchiseId;
    const storeId = this.storeId;
    const addJobRec = await this.modalController.create({
      component: AddJobReqComponent,
      swipeToClose: true,
      componentProps: {
        franchiseId,
        storeId
      }
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
  getApplicants(positionId){
    this.viewApplicants = true;
    this.positionId = positionId;
  /*  this.firestore.collection('applicant', ref => ref.where('positionId', '==', `${positionId}`)).get()
      .subscribe(ss =>{
        this.applicants = [];
        if (ss.docs.length === 0){
          console.log('no applicants for position');
        } else {
         ss.forEach( applicant =>{
           const a = applicant.data();
           const id = applicant.id;
           this.applicants.push({ id, applicant: a});
           console.log('applicants applied', this.applicants);
         });
        }
      });*/
  }

  updatePosition(id){
    console.log('Update a position rather that is change pay rate rec number available, move applicant manually');
  }
  scheduleInterview(id){
    console.log('bring list of applicants for that position and select which applicant to schedule interview');
  }
}
