import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {JobPosting} from "../../../shared/models/job-posting";
import {AngularFirestore} from "@angular/fire/firestore";
import {FirestoreHelperService} from "../../../shared/firestore-helper.service";
import {JobService} from "../../../shared/services/job.service";

@Component({
  selector: 'app-add-job-req',
  templateUrl: './add-job-req.component.html',
  styleUrls: ['./add-job-req.component.scss'],
})
export class AddJobReqComponent implements OnInit {
  @Input() storeId: string;
  franchiseId: string;
  newJobListing: JobPosting = new JobPosting();
  addJoblistingFrom: FormGroup;
  jobDetailsFrom: FormGroup;
  jobsData: any = [];
  hiringManagerId: string;
  private userData: any;
  private userId: string;
  constructor(public fb: FormBuilder, public firestore: AngularFirestore, public dbHelper: FirestoreHelperService, public jobService: JobService) { }

  ngOnInit() {
    console.log('incoming store Id', this.storeId);
    this.initAddJobForm();
    this.initJobsDetailsForm();
    this.userId = JSON.parse(localStorage.getItem('user')).email;
    this.firestore.doc(`users/${this.userId}`).get().subscribe(doc => {
      this.userData = doc.data();
      console.log('franchiseId in query', this.userData.franchiseId);
      this.franchiseId = this.userData.franchiseId;
    });
  }
  initAddJobForm(){
    this.addJoblistingFrom = this.fb.group({
      recNumber:[''],
      jobTitle:[''],
      location: [''],
      jobType: [''],
      numberOfOpenSlots: [''],
      shortDescription: [''],
      positionExpiration: [''],
      companyWebsite: [''],
      salary: ['']
    });
  }
  initJobsDetailsForm(){
    this.jobDetailsFrom = this.fb.group({
      fullDescription: [''],
      benefits: [''],
      specialNotes: [''],
      qualifications: ['']
    });
  }
  showJobList(){
    this.newJobListing.storeId = JSON.parse(localStorage.getItem('appUserData')).storeIds;
    this.jobsData = this.jobService.getJobsByStore(this.storeId);
    this.jobsData.forEach(job =>{
      console.log('returned jobs', job);
    });
  }
  refreshPage(){
    //TODO clear form controls and go back to step one

  }
  addJobListing(){
    this.newJobListing.recNumber = this.addJoblistingFrom.controls.recNumber.value;
    this.newJobListing.jobDescription = this.jobDetailsFrom.controls.fullDescription.value;
    this.newJobListing.jobTitle = this.addJoblistingFrom.controls.jobTitle.value;
    this.newJobListing.addressId = this.addJoblistingFrom.controls.location.value;
    this.newJobListing.companyWebsite = this.addJoblistingFrom.controls.companyWebsite.value;
    this.newJobListing.salary = this.addJoblistingFrom.controls.salary.value;
    this.newJobListing.jobType = this.addJoblistingFrom.controls.jobType.value;
    this.newJobListing.positionOpen = true;
    this.newJobListing.hiringManagerId = JSON.parse(localStorage.getItem('user')).email;
    this.newJobListing.benefits = this.jobDetailsFrom.controls.benefits.value;
    this.newJobListing.specialNotes = this.jobDetailsFrom.controls.specialNotes.value;
    this.newJobListing.qualifications = this.jobDetailsFrom.controls.qualifications.value;
    this.newJobListing.numberOfOpenSlots = this.addJoblistingFrom.controls.numberOfOpenSlots.value;
    this.newJobListing.shortJobDescription = this.addJoblistingFrom.controls.shortDescription.value;
    this.newJobListing.positionExpiration = this.addJoblistingFrom.controls.positionExpiration.value;
    this.newJobListing.storeId = JSON.parse(localStorage.getItem('appUserData')).storeIds;
    this.newJobListing.franchiseId = JSON.parse(localStorage.getItem('appUserData')).franchiseId;
    this.jobService.addJobRec(this.newJobListing).then(data=>{
      console.log('added job listing', data);
    });
  }
  selectionChange(event){

  }
}
