import { Role } from './../../shared/models/role';
import { Subscription } from 'rxjs/internal/Subscription';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { DatePipe } from '@angular/common';
import {AngularFirestore} from '@angular/fire/firestore';
import {ModalController} from '@ionic/angular';
import {MatTableDataSource} from "@angular/material/table";

import {OnboardingService} from "../../shared/services/onboarding.service";
import {Applicant} from "../../shared/models/applicant";
import {FileUpload} from "../../shared/models/file-upload";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SmsService} from "../../shared/services/sms.service";
import {StoreService} from "../../shared/services/store.service";
import {FirestoreHelperService} from "../../shared/firestore-helper.service";
import { AlertService } from '../../shared/services/alert.service';
import { CustomForms } from '../../shared/models/onBoardPacket';
import { FranchiseService } from './../../shared/services/franchise.service';
import { AuthService } from './../../shared/services/auth.service';
import { UserService } from './../../shared/services/user.service';
import { JobService } from './../../shared/services/job.service';
import { ApplicantStatus } from './../../shared/models/applicant-status';

@Component({
  selector: 'app-add-new-hire',
  templateUrl: './add-new-hire.component.html',
  styleUrls: ['./add-new-hire.component.scss'],
})
export class AddNewHireComponent implements OnInit, OnDestroy {
  @Input() applicant: any;
  @Input() storeData: any;
  @Input() hiringMangerData: any;
  storeId: string;

  positionAppliedForId: string;
  onBoardingPackages: any = [];
  dataSource: MatTableDataSource<Applicant>;
  customFormsAdded: boolean;
  formNames: any = [];
  customForms: FormGroup;
  fileUpload: FileUpload;
  startDate: any;
  userData: any = [];
  franchiseDataSub: Subscription = new Subscription();
  franchiseName: string;
  hiringManagersName: string;
  jobData: any = [];
  role: string;
  applicantStatus = ApplicantStatus;
  constructor(
    public authService: AuthService,
    public dbHelper: FirestoreHelperService,
    public storeService: StoreService,
    public smsService: SmsService,
    public onBoardingService: OnboardingService,
    public firestore: AngularFirestore,
    public fb: FormBuilder,
    public alertService: AlertService,
    public modalController: ModalController,
    public datepipe: DatePipe,
    public franchiseService: FranchiseService,
    public userService: UserService,
    public jobService: JobService
    ) { }

  ngOnInit() {
    console.log('incoming applicant', this.applicant);
    this.storeId = this.applicant.applicant.storeId;
    this.positionAppliedForId = this.applicant.positionId;
    this.userData = JSON.parse(localStorage.getItem('appUserData'));
    this.getFranchiseeByApplicant(this.applicant.applicant.franchiseId);
    this.getOnboardingPacketsByStoreId(this.storeId);
    this.customFormsAdded = false;
    this.customForms = this.fb.group({
      onBoardingPackageName: this.fb.array([])
    });
  }
  ngOnDestroy(): void {
    this.franchiseDataSub.unsubscribe();
  }
  //get list of onboarding packages for store
  getListOfOnboardingPackages(){
    const storeId = this.storeId;
   this.onBoardingPackages = this.onBoardingService.getAllOnboardingPackagesByStoreId(storeId);
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

  getOnboardingPacketsByStoreId(storeId){
    this.firestore.collection('onboardPackages', ref => ref.where('storeId', '==', `${storeId}`)).get()
      .subscribe( ss =>{
        this.onBoardingPackages = [];
        if (ss.docs.length === 0){
          console.log('no onboarding Packages');
        } else {
          ss.forEach( a =>{
            const app = a.data();
            const id = a.id;
            this.onBoardingPackages.push({id, packages: app });
            this.dataSource = new MatTableDataSource<Applicant>(this.onBoardingPackages);
          });
          console.log(this.onBoardingPackages);
        }
      });

  }
  sendOnboardingLinkToApplicant(applicant) {
    this.startDate = this.datepipe.transform(this.startDate, 'dd-MM-yyyy');
    // send applicant id to sms service
    const onBoadingUid = applicant.applicant.applicantId;
    const onBoardingPackagesSelected = this.onBoardingPackages.filter(p => p.isChecked === true);
    if(onBoardingPackagesSelected.length === 0) {
      this.alertService.showError('Please choose at least one onboarding package');
      return;
    }

    let customForms: Array<CustomForms> = [];
    let isW4 = false;
    let isI9 = false;
    let isstateW4 = false;

    onBoardingPackagesSelected.forEach(p => {
      if(p.packages.w4 && !isW4) {
        customForms.push({
          formUrl: p.packages.w4,
          name: 'W-4 Employee With Holding Certificate'
        });
        isW4 = true
      }

      if(p.packages.i9 && !isI9) {
        customForms.push({
          formUrl: p.packages.i9,
          name: 'Employment Eligibility Verification'
        });
        isI9 = true
      }

      if(p.packages.stateW4 && !isstateW4) {
        customForms.push({
          formUrl: p.packages.stateW4,
          name: 'MO W-4 Employee Withholding Certificate (certificate as in its an award to have with holdings)'
        });
        isstateW4 = true
      }

      if(p.packages.customForms && p.packages.customForms instanceof Array) {
        customForms = customForms.concat(p.packages.customForms);
      }
    });

    // added custom form
    const customFormsAdded = this.customForms.controls['onBoardingPackageName'].value;
    if (customFormsAdded && customFormsAdded?.length > 0) {
      customForms = customForms.concat(customFormsAdded.map(f => new CustomForms(f.name, f.url)));
    }

    customForms = customForms.map((obj)=> { return Object.assign({}, obj)});
    const hiringManagersName = this.storeData.hiringManagersName ? this.storeData.hiringManagersName : (this.hiringMangerData.firstName || this.hiringMangerData.fullName);
    this.firestore.collection('applicant').doc(applicant.id)
      .set({customForms: customForms, status: this.applicantStatus.applicantApplied}, {merge: true}) //confirm status applicant.
      .then(() => {
        this.alertService.showSuccess('Send package success');
        this.closeModal();
        this.smsService.sendNewHireForms(
          applicant.applicant.name,
          applicant.applicant.phoneNumber,
          onBoadingUid,
          this.franchiseName,
          hiringManagersName,
          this.storeData.storePhoneNumber,
          this.startDate
        )
      .subscribe(data =>{
          console.log(data);
      });
       alert('applicant id:' + onBoadingUid);
    });
  }

  selectionChange(e) {
    console.log('store step', e);
  }

  get getFormControls(){
    const control = this.customForms.get('onBoardingPackageName') as FormArray;
    return control;
  }

  formUploaded(fileItems: FileUpload[]){
    if(fileItems.length > 0) {
      this.customFormsAdded = true;
      this.customForms.controls['onBoardingPackageName'] = this.fb.array(
        fileItems.map((c, index) => {
          return this.fb.group({
            name: [`Form ${index + 1}`, Validators.required],
            fileName: [c.name],
            url: c.url,
          });
        })
      );
    }
  }
  closeModal() {
    this.modalController.dismiss().then();
  }
}
