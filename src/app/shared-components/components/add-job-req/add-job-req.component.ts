import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {JobPosting} from "../../../shared/models/job-posting";
import {AngularFirestore} from "@angular/fire/firestore";
import {FirestoreHelperService} from "../../../shared/firestore-helper.service";

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
  private userData: any;
  private userId: string;
  constructor(public fb: FormBuilder, public firestore: AngularFirestore, public dbHelper: FirestoreHelperService) { }

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
      companyWebSite: [''],
      salary: ['']
    });
  }
  initJobsDetailsForm(){
    this.jobDetailsFrom = this.fb.group({
      fullDescription: ['']
    });
  }
  showJobList(){

  }
  addJobListing(){
    this.newJobListing.recNumber = this.addJoblistingFrom.controls.recNumber.value;
    this.newJobListing.jobDescription = this.jobDetailsFrom.controls.fullDescription.value;
    this.newJobListing.jobTitle = this.addJoblistingFrom.controls.jobTittle.value;
    this.newJobListing.addressId = this.addJoblistingFrom.controls.location.value;
    this.newJobListing.companyWebsite = this.addJoblistingFrom.controls.companyWebsite.value;
    this.newJobListing.salary = this.addJoblistingFrom.controls.salary.value;
    this.newJobListing.jobType = this.addJoblistingFrom.controls.jobType.value;
    this.newJobListing.numberOfOpenSlots = this.addJoblistingFrom.controls.numberOfOpenSlots.value;
    this.newJobListing.shortJobDescription = this.addJoblistingFrom.controls.shortDescription.value;
    this.newJobListing.positionExpiration = this.addJoblistingFrom.controls.positionExpiration.value;
    this.dbHelper.set('jobs', this.newJobListing).then(data =>{
      console.log('job added', data);
    });

  }
  selectionChange(event){

  }
}
