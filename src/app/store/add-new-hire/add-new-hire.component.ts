import {Component, Input, OnInit} from '@angular/core';
import {OnboardingService} from "../../shared/services/onboarding.service";
import {MatTableDataSource} from "@angular/material/table";
import {Applicant} from "../../shared/models/applicant";
import {AngularFirestore} from '@angular/fire/firestore';
import {FileUpload} from "../../shared/models/file-upload";
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {SmsService} from "../../shared/services/sms.service";
import {StoreService} from "../../shared/services/store.service";
import {FirestoreHelperService} from "../../shared/firestore-helper.service";

@Component({
  selector: 'app-add-new-hire',
  templateUrl: './add-new-hire.component.html',
  styleUrls: ['./add-new-hire.component.scss'],
})
export class AddNewHireComponent implements OnInit {
  @Input() applicant: any;
  @Input() store: any;
  storeId: string;

  positionAppliedForId: string;
  onBoardingPackages: any = [];
  dataSource: MatTableDataSource<Applicant>;
  customFormsAdded: boolean;
  formNames: any = [];
  customForms: FormGroup;
  fileUpload: FileUpload;
  constructor(  public dbHelper: FirestoreHelperService, public storeService: StoreService, public smsService: SmsService, public onBoardingService: OnboardingService, public firestore: AngularFirestore, public fb: FormBuilder) { }

  ngOnInit() {
    console.log('incoming applicant', this.applicant, 'incoming store', this.store);
    this.storeId = this.applicant.applicant.storeId;
    this.positionAppliedForId = this.applicant.positionId;
    //this.getListOfOnboardingPackages();
    this.getOnboardingPacketsByStoreId(this.storeId);
    this.customFormsAdded = false;
    this.customForms = this.fb.group({
      onBoardingPackageName: this.fb.array([])
    });
  }
  //get list of onboarding packages for store
  getListOfOnboardingPackages(){
    const storeId = this.storeId;
   this.onBoardingPackages = this.onBoardingService.getAllOnboardingPackagesByStoreId(storeId);
   /*
   this.onBoardingPackages.forEach(data =>{
     console.log('onbaording packages',data);
   });*/
    console.log(this.onBoardingPackages);
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
  sendOnboardingLinkToApplicant(applicant){
    const onBoadingUid = '1234567';
    console.log('applicant', applicant);
    this.smsService.sendNewHireForms(applicant.applicant.name, applicant.applicant.phoneNumber, onBoadingUid, 'Jimmy Johns', 'Brandon','3145995164', '12/01/2021' ).subscribe(data =>{
      console.log(data);
    });
  }
  selectionChange(e) {
    console.log('store step', e);
  }
  uploadTask($event){
    console.log('percentage complete', $event);
    if ($event === 100){
     /* this.addCustomForm = false;*/
      this.customFormsAdded = true;
    }
  }
  get getFormControls(){
    const control = this.customForms.get('onBoardingPackageName') as FormArray;
    return control;
  }
  formUploaded($event){
    this.formNames = [];
    console.log('formsUploaded', $event);
    this.fileUpload = $event;
    if($event){
      console.log('do something with this form', this.fileUpload);
      this.formNames.push(this.fileUpload.file.name);
      console.log('uploaded forms', this.formNames);
      /* this.formNames.forEach(
         this.newCustomForms.formUrl = this.formNames.url
       );*/
    }
  }


}
