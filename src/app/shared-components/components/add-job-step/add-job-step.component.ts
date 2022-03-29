import { Validators } from '@angular/forms';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, Input, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import {Router} from "@angular/router";
import {JobService} from "../../../shared/services/job.service";
import {AngularFirestore} from "@angular/fire/firestore";
import {MatTableDataSource} from "@angular/material/table";
import {JobListing} from "../../../shared/models/job-listing";
import {AddJobReqComponent} from "../add-job-req/add-job-req.component";
import {ModalController} from "@ionic/angular";
import { Subscription, Subject} from "rxjs";
import {FirestoreHelperService} from "../../../shared/firestore-helper.service";
import {StoreService} from "../../../shared/services/store.service";
import { AlertService } from '../../../shared/services/alert.service';

@Component({
  selector: 'app-add-job-step',
  templateUrl: './add-job-step.component.html',
  styleUrls: ['./add-job-step.component.scss'],
})
export class AddJobStepComponent implements OnInit, OnDestroy {
  @Input() franchiseId: string;
  @Input() storeId: string;
  jobs: any = [];
  jobsSub: Subscription = new Subscription();
  jobData: any;
  userData: any;
  positionId: string;
  storeName: string;
  selectedStoreId: string;
  storeData: any;
  dataSource: MatTableDataSource<JobListing>;
  displayColumns = ['jobId', 'title','status', 'location', 'actions'];
  chooseStepForm: FormGroup;
  stepCopy: boolean;
  onJobAddedSub: Subject<any>;
  constructor(
    public jobService: JobService,
    public firestore: AngularFirestore,
    public modalController: ModalController,
    public dbHelper: FirestoreHelperService,
    public storeService: StoreService,
    public route: Router,
    public alertService: AlertService,
    public fb: FormBuilder,
    ) {
  }

  ngOnInit() {
    this.stepCopy = false;
    this.initForm();
    this.userData = JSON.parse(localStorage.getItem('appUserData'));
  }
  ngOnDestroy(): void {
    this.jobsSub.unsubscribe();
  }
  initForm() {
    this.chooseStepForm = this.fb.group({
      chooseStep: ['createNew', Validators.required]
    });
  }
  handledSelect() {
    if (this.chooseStepForm.value.chooseStep === 'createNew') {
      this.stepCopy = false;
      this.addJobRec();
    } else {
      this.stepCopy = true;
      if (this.userData.role === 'hiringManager'){
        this.getJobsByStoreId();
      } else {
        this.getJobsForFranchise(this.storeId);
      }
    }
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
            this.dataSource = new MatTableDataSource<JobListing>(this.jobs);
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
  async addJobRec(){
    const franchiseId = this.franchiseId;
    const storeId = this.storeId;
    const onJobAddedSub = new Subject<JobListing>();
    const addJobRec = await this.modalController.create({
      component: AddJobReqComponent,
      swipeToClose: true,
      componentProps: {
        franchiseId,
        storeId,
        onJobAddedSub
      }
    });

    onJobAddedSub.subscribe((newJob: any) => {
      this.jobs.unshift({id: newJob.id, position: newJob});
      if(this.onJobAddedSub) {
        this.onJobAddedSub.next({id: newJob.id, position: newJob});
      }
    });

    addJobRec.onDidDismiss().then(data => {
      onJobAddedSub.unsubscribe();
      if (data.data) {
        setTimeout(() => {
          this.closeModal();
        }, 500);
      }
    });

    return await addJobRec.present();
  }
  async copyJob(jobData){
    console.log('jobData', jobData);
    const onJobAddedSub = new Subject<JobListing>();
    const modeEdit = true;
    const franchiseId = this.franchiseId;
    const storeId = this.storeId;
    const addJobRec = await this.modalController.create({
      component: AddJobReqComponent,
      swipeToClose: true,
      componentProps: {
        franchiseId,
        storeId,
        jobData,
        modeEdit,
        onJobAddedSub,
      }
    });

    onJobAddedSub.subscribe((newJob: any) => {
      this.jobs.unshift({id: newJob.id, position: newJob});
      if(this.onJobAddedSub) {
        this.onJobAddedSub.next({id: newJob.id, position: newJob});
      }
    });

    addJobRec.onDidDismiss().then(data => {
      onJobAddedSub.unsubscribe();
      if (data.data) {
        setTimeout(() => {
          this.closeModal();
        }, 500);
      }
    });

    return await addJobRec.present();
  }

  closeModal() {
    this.modalController.dismiss();
  }

  updatePosition(id){
    console.log('Update a position rather that is change pay rate rec number available, move applicant manually');
  }
}
