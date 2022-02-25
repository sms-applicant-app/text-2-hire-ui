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
import {StoreService} from "../../../shared/services/store.service";
@Component({
  selector: 'app-add-job-req',
  templateUrl: './add-job-req.component.html',
  styleUrls: ['./add-job-req.component.scss'],
})
export class AddJobReqComponent implements OnInit {
  @Input() storeId: string;
  @Input() franchiseId: string;
  // franchiseId: string;
  newJobListing: JobPosting = new JobPosting();
  addJoblistingFrom: FormGroup;
  jobDetailsFrom: FormGroup;
  jobsData: any = [];
  onboardingPackagesData: any[] = [];
  onboardingPackageId: string;
  hiringManagerId: string;
  //storeData: any;
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
    public storeService: StoreService,
    public onboardingService: OnboardingService
    ) { }

  ngOnInit() {
    console.log('incoming store data and store id', this.storeData, this.storeId);
    this.initAddJobForm();
    this.initJobsDetailsForm();
    this.getOnboardingPackages(this.storeId);
    this.franchiseId = JSON.parse(localStorage.getItem('appUserData')).franchiseId;
    this.userId = JSON.parse(localStorage.getItem('user')).email;
    this.storeService.getStoreByGeneratedStoreId(this.storeId).subscribe((data: any)=>{
      console.log('store', data);
      this.storeData = data;
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
      fullDescription: ['',  Validators.required],
      benefits: [''],
      specialNotes: [''],
      qualifications: ['']
    });
  }
  getOnboardingPackages(storeId) {

    this.onboardingService.getAllOnboardingPackagesByStoreId(storeId).subscribe((res) => {
      this.onboardingPackagesData = [];
        if (res.docs.length === 0){
          console.log('no onboarding packages for store',storeId);
        } else {
          this.onboardingPackagesData = res.docs.map((doc) => {
            const data = doc.data();
            return {
              id: doc.id,
              ...data
            };
          });
          this.addJoblistingFrom.patchValue({ onboardingPackage: this.onboardingPackagesData[0].id });
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
      // this if statement is for if a Franchise owner adds a position
      console.log('storeData', this.storeData);
      this.newJobListing.hiringManagerId = this.storeData.storeHiringManager;
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
      this.newJobListing.onboardingPackageId = this.addJoblistingFrom.controls.onboardingPackage.value;
      if (this.newJobListing.onboardingPackageId) {
        let packageData = this.onboardingPackagesData.find(c=> c.id == this.newJobListing.onboardingPackageId) as any;
        if(packageData) {
          this.newJobListing.onboardingPackageName = packageData.name || '';
        }
      }
      console.log('this.newJobListing',this.newJobListing);
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
