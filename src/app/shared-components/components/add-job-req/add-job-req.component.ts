import { StoreService } from './../../../shared/services/store.service';
import {Component, Input, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { DatePipe } from '@angular/common';

import {JobPosting} from '../../../shared/models/job-posting';
import {AngularFirestore} from '@angular/fire/firestore';
import {FirestoreHelperService} from '../../../shared/firestore-helper.service';
import {JobService} from '../../../shared/services/job.service';
import {ModalController} from '@ionic/angular';
import { AlertService } from '../../../shared/services/alert.service';
import { OnboardingService } from '../../../shared/services/onboarding.service';
import {Subject} from 'rxjs';
import { UserService } from '../../../shared/services/user.service';
import { AuthService } from '../../../shared/services/auth.service';
@Component({
  selector: 'app-add-job-req',
  templateUrl: './add-job-req.component.html',
  styleUrls: ['./add-job-req.component.scss'],
})
export class AddJobReqComponent implements OnInit {
  @Input() storeId: string;
  @Input() franchiseId: string;
  @Input() jobData: any;
  // franchiseId: string;
  newJobListing: JobPosting = new JobPosting();
  addJoblistingFrom: FormGroup;
  jobDetailsFrom: FormGroup;
  jobsData: any = [];
  onboardingPackagesData: any[] = [];
  onboardingPackageId: string;
  hiringManagerId: string;
  onJobAddedSub: Subject<JobPosting>;
  minDate = new Date();
  private userData: any;
  private userId: string;
  private storeData: any;
  constructor(
    public fb: FormBuilder,
    public firestore: AngularFirestore,
    public dbHelper: FirestoreHelperService,
    public jobService: JobService,
    public modalController: ModalController,
    public alertService: AlertService,
    public onboardingService: OnboardingService,
    public userService: UserService,
    public authService: AuthService,
    public datepipe: DatePipe,
    public storeService: StoreService
    ) { }

  ngOnInit() {
    this.initAddJobForm();
    this.initJobsDetailsForm();
    this.getOnboardingPackages();
    this.userId = JSON.parse(localStorage.getItem('user')).email;
    if (this.jobData) {
      if(this.jobData.position.positionExpiration && typeof this.jobData.position.positionExpiration != 'string') {
        this.jobData.position.positionExpiration = this.jobData.position.positionExpiration.toDate();
      }
      this.addJoblistingFrom.patchValue({
        recNumber: this.jobData.position.recNumber,
        jobTitle: this.jobData.position.jobTitle,
        location: this.jobData.position.addressId,
        jobType: this.jobData.position.jobType,
        onboardingPackage: this.jobData.position.onboardingPackageId,
        numberOfOpenSlots: this.jobData.position.numberOfOpenSlots,
        shortJobDescription: this.jobData.position.shortJobDescription,
        positionExpiration: this.jobData.position.positionExpiration,
        companyWebsite: this.jobData.position.companyWebsite,
        salary: this.jobData.position.salary,
       });
      this.jobDetailsFrom.patchValue({
        fullDescription: this.jobData.position.jobDescription,
        benefits: this.jobData.position.benefits,
        specialNotes: this.jobData.position.specialNotes,
        qualifications: this.jobData.position.qualifications,
      });
    }
    if (this.storeId) {
      this.newJobListing.storeId = this.storeId.toString();
      this.storeService.getStoreByGeneratedStoreId(this.storeId).subscribe((data: any)=>{
        if(data && data.length > 0) {
          this.storeData = data[0];
        }
      });
    } else {
      this.storeData = localStorage.getItem('selectedStore');
      this.storeId = this.storeData.storeId;
    }
  }
  initAddJobForm(){
    this.addJoblistingFrom = this.fb.group({
      recNumber:['', Validators.required],
      jobTitle:['',Validators.required],
      location: ['', Validators.required],
      jobType: [''],
      onboardingPackage: [''],
      numberOfOpenSlots: ['', Validators.required],
      shortJobDescription: ['', Validators.required],
      positionExpiration: [{value: '', disabled: true}, Validators.required],
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
  getOnboardingPackages() {
    const storeId = this.storeId;
    this.onboardingService.getAllOnboardingPackagesByStoreId(storeId).subscribe((res) => {
      this.onboardingPackagesData = [];
        if (res.docs.length === 0){
          console.log('no docs with that franchise', this.franchiseId);
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
      this.userService.getUserById(this.userId).subscribe(resp => {
        if (resp) {
          this.newJobListing.storeId = this.storeId;
          this.newJobListing.franchiseId = this.franchiseId;
          this.newJobListing.recNumber = this.addJoblistingFrom.controls.recNumber.value;
          this.newJobListing.jobDescription = this.jobDetailsFrom.controls.fullDescription.value;
          this.newJobListing.jobTitle = this.addJoblistingFrom.controls.jobTitle.value;
          this.newJobListing.addressId = this.addJoblistingFrom.controls.location.value;
          this.newJobListing.companyWebsite = this.addJoblistingFrom.controls.companyWebsite.value;
          this.newJobListing.salary = this.addJoblistingFrom.controls.salary.value;
          this.newJobListing.jobType = this.addJoblistingFrom.controls.jobType.value;
          this.newJobListing.positionOpen = true;
          this.newJobListing.hiringManagerId = this.storeData.storeHiringManager;
          this.newJobListing.benefits = this.jobDetailsFrom.controls.benefits.value;
          this.newJobListing.specialNotes = this.jobDetailsFrom.controls.specialNotes.value;
          this.newJobListing.qualifications = this.jobDetailsFrom.controls.qualifications.value;
          this.newJobListing.numberOfOpenSlots = this.addJoblistingFrom.controls.numberOfOpenSlots.value;
          this.newJobListing.shortJobDescription = this.addJoblistingFrom.controls.shortJobDescription.value;
          this.newJobListing.positionExpiration = this.addJoblistingFrom.controls.positionExpiration.value;
          this.newJobListing.onboardingPackageId = this.addJoblistingFrom.controls.onboardingPackage.value;
          if (this.newJobListing.onboardingPackageId) {
            const packageData = this.onboardingPackagesData.find(c=> c.id === this.newJobListing.onboardingPackageId) as any;
            if(packageData) {
              this.newJobListing.onboardingPackageName = packageData.name || '';
            }
          }
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
          this.closeModal();
          this.alertService.showError('User has been delete');
          this.authService.SignOut();
        }
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
