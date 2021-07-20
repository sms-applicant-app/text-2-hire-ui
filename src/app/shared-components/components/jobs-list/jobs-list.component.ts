import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FileUploadService} from "../../../shared/services/file-upload.service";
import {map} from "rxjs/operators";
import {JobService} from "../../../shared/services/job.service";
import {AngularFirestore} from "@angular/fire/firestore";
import {MatTableDataSource} from "@angular/material/table";
import {Store} from "../../../shared/models/store";
import {JobListing} from "../../../shared/models/job-listing";
import {AddJobReqComponent} from "../add-job-req/add-job-req.component";
import {ModalController} from "@ionic/angular";

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
  dataSource: MatTableDataSource<JobListing>;
  displayColumns = ['jobId', 'storeOrigin', 'title', 'hiringManager', 'location', 'actions'];
  //todo action see applicant status update position, schedule interview
  constructor(private uploadService: FileUploadService, public jobService: JobService,
              public firestore: AngularFirestore,
              public modalController: ModalController) {
  }

  ngOnInit() {
    this.uploadService.getFiles(6).snapshotChanges().pipe(
      map(changes =>
        // store the key
        changes.map(c => ({key: c.payload.key, ...c.payload.val()}))
      )
    ).subscribe(fileUploads => {
      this.fileUploads = fileUploads;
    });
   this.getJobsByFranchiseId();
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
            const j = data.data();
            this.jobs.push(j);
            this.dataSource = new MatTableDataSource<JobListing>(this.jobs)
          });
        }
      });
  }
  getJobsByStoreId(){
    this.firestore.collection('jobs', ref => ref.where('storeId', '==', this.storeId)).get()
      .subscribe(jobs =>{
        this.jobs= [];
        if(jobs.docs.length === 0){
          console.log('no docs with that store', this.franchiseId);
        } else {
          jobs.forEach(data =>{
            const j = data.data();
            this.jobs.push(j);
            this.dataSource = new MatTableDataSource<JobListing>(this.jobs);
          });
        }
      });
  }
  async addJobRecToStore(storeId){

    const franchiseId = this.franchiseId;
    console.log('display add job model');
    const addJobModel = await this.modalController.create({
      component: AddJobReqComponent,
      swipeToClose: true,
      componentProps: {
        // may need franchise id
        franchiseId,
        storeId
      }
    });
    return await addJobModel.present();
  }
  sendJobsFranchiseIdMessage(){
    this.messageEvent.emit(this.franchiseId);
  }
  seeApplicantStatuses(id){
    console.log('get applicants for the position and see what the pipeline looks like');
  }
  updatePosition(id){
    console.log('Update a position rather that is change pay rate rec number available, move applicant manually');
  }
  scheduleInterview(id){
    console.log('bring list of applicants for that position and select which applicant to schedule interview');
  }
}
