import {Component, Input, OnInit} from '@angular/core';
import {OnboardingService} from "../../shared/services/onboarding.service";
import {MatTableDataSource} from "@angular/material/table";
import {Applicant} from "../../shared/models/applicant";
import {AngularFirestore} from '@angular/fire/firestore';
import {FileUpload} from "../../shared/models/file-upload";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SmsService} from "../../shared/services/sms.service";
import {StoreService} from "../../shared/services/store.service";
import {FirestoreHelperService} from "../../shared/firestore-helper.service";
import { AlertService } from '../../shared/services/alert.service';
import { CustomForms } from '../../shared/models/onBoardPacket';
import {ModalController} from '@ionic/angular';

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
  constructor( 
    public dbHelper: FirestoreHelperService,
    public storeService: StoreService,
    public smsService: SmsService,
    public onBoardingService: OnboardingService,
    public firestore: AngularFirestore,
    public fb: FormBuilder,
    public alertService: AlertService,
    public modalController: ModalController,
    ) { }

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
  sendOnboardingLinkToApplicant(applicant) {
    // send applicant id to sms service
    const onBoadingUid = applicant.applicant.applicantId;
    console.log('applicant', applicant);
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
    console.log('customForms', customForms);
    this.firestore.collection('applicant').doc(applicant.id)
      .set({customForms: customForms}, {merge: true})
      .then(() => {
        this.alertService.showSuccess('Send package success');
        this.closeModal();
       this.smsService.sendNewHireForms(applicant.applicant.name, applicant.applicant.phoneNumber, onBoadingUid, 'Jimmy Johns', 'Brandon','3145995164', '12/01/2021' ).subscribe(data =>{
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
