import {Component, Input, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';

import {JobPosting} from '../../../shared/models/job-posting';
import {AngularFirestore} from '@angular/fire/firestore';
import {FirestoreHelperService} from '../../../shared/firestore-helper.service';
import {JobService} from '../../../shared/services/job.service';
import {ModalController} from '@ionic/angular';
import { AlertService } from '../../../shared/services/alert.service';
import { OnboardingService } from '../../../shared/services/onboarding.service';
import {Subject} from 'rxjs';
import {Store} from "../../../shared/models/store";
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
  onboardingPackagesData: any = [];
  onboardingPackageId: string;
  hiringManagerId: string;
  onJobAddedSub: Subject<JobPosting>;
  private userData: any;
  private userId: string;
  constructor(
    public fb: FormBuilder,
    public firestore: AngularFirestore,
    public dbHelper: FirestoreHelperService,
    public jobService: JobService,
    public modalController: ModalController,
    public alertService: AlertService,
    public onboardingService: OnboardingService
    ) { }

  ngOnInit() {
    this.initAddJobForm();
    this.initJobsDetailsForm();
    this.getOnboardingPackages();
    this.userId = JSON.parse(localStorage.getItem('user')).email;
    this.firestore.doc(`users/${this.userId}`).get().subscribe(doc => {
      this.userData = doc.data();
      this.franchiseId = this.userData.franchiseId;
    });
  }
  initAddJobForm(){
    this.addJoblistingFrom = this.fb.group({
      recNumber:['', Validators.required],
      jobTitle:['',Validators.required],
      location: ['', Validators.required],
      jobType: [''],
      onboardingPackage: [''],
      numberOfOpenSlots: ['', Validators.required],
      shortDescription: ['', Validators.required],
      positionExpiration: ['', Validators.required],
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
  getOnboardingPackages() {
    const storeId = this.storeId;
    this.onboardingService.getAllOnboardingPackagesByStoreId(storeId).subscribe((res) => {
      this.onboardingPackagesData = [];
        if (res.docs.length === 0){
          console.log('no docs with that franchise', this.franchiseId);
        } else {
          this.onboardingPackagesData = res.docs.map((data) => {
            console.log('data.id', data.id);
            return data.data();
          });
        }
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
  addJobListing(stepper: MatStepper){
    if (this.addJoblistingFrom.valid && this.jobDetailsFrom.valid) {
      const storeId = this.storeId;
      if (storeId) {
        this.newJobListing.storeId = this.storeId.toString();
      } else {
        const selectedStore = localStorage.getItem('selectedStore');
        this.newJobListing.storeId = selectedStore;
      }
      this.newJobListing.franchiseId = this.franchiseId;
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
      this.newJobListing.onboardingPackageName = this.addJoblistingFrom.controls.onboardingPackage.value;
      this.jobService.addJobRec(this.newJobListing).then((res) => {
        if(res){
          const data = {
            id: res,
            ...this.newJobListing
          };
          this.onJobAddedSub.next({
            ...data
          });
        }
        stepper.next();
      });
    } else {
      this.alertService.showError('Please enter field is required');
    }
  }
  closeModal() {
    this.modalController.dismiss().then();
  }
  selectionChange(event){

  }
}
