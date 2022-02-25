import { Component, Input, OnInit } from '@angular/core';
import {FileUpload} from '../../../shared/models/file-upload';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {OnboardingService} from '../../../shared/services/onboarding.service';
import {CustomForms, OnBoardPacket} from '../../../shared/models/onBoardPacket';
import { ModalController } from '@ionic/angular';
import { AlertService } from '../../../shared/services/alert.service';
import { formInclude } from '../../../shared/constants/formInclude';
import { FileItem } from '../../../shared/models/file-item';

@Component({
  selector: 'app-add-on-board-packet',
  templateUrl: './add-on-board-packet.component.html',
  styleUrls: ['./add-on-board-packet.component.scss'],
})
export class AddOnBoardPacketComponent implements OnInit {
  @Input() storeData: any;
  @Input() storeId: string;
  @Input() franchiseName: string;
  fileUpload: FileUpload;
  customForms: FormGroup;
  federalForms: FormGroup;
  formNames: any = [];
  formsControl: FormArray;
  addCustomForm: boolean;
  customFormsAdded: boolean;
  newOnboardPacket = new OnBoardPacket();
  fileItemsUploaded: FileUpload[] = [];

  formInclude: Array<any> = [
    { id: 1, value: 'w4', label: 'W-4 Employee With Holding Certificate' , isChecked : false},
    { id: 2, value: 'i9', label: 'Employment Eligibility Verification' , isChecked : false},
    { id: 3, value: 'stateW4', label: 'MO W-4 Employee Withholding Certificate (certificate as in its an award to have with holdings)'
     , isChecked : false }
  ];
  constructor(
    public fb: FormBuilder,
    public onBoardingService: OnboardingService,
    public modalController: ModalController,
    public alertService: AlertService
    ) { }

  ngOnInit() {
    console.log('incoming store id add-on-board-packet component', this.storeData);
    this.customForms = this.fb.group({
      onBoardingPackageName: this.fb.array([])
    });
    this.federalForms = this.fb.group({
      name:['', Validators.required],
      w4: [false],
      i9: [false],
      stateW4: [false]
    });
    this.addCustomForm = false;
    this.customFormsAdded = false;
    this.addFormRowToPackage();
  }
  ngAfterOnInit() {
    this.formsControl = this.customForms.get('onBoardingPackageName') as FormArray;
  }
  initiateOnboardPackage(): FormGroup {
    return this.fb.group({
      fileName: [],
    });
  }
  addCustomFormButton(){
    this.addFormRowToPackage();
    this.addCustomForm = true;
  }
  addFormRowToPackage(){
    const control = this.customForms.get('onBoardingPackageName') as FormArray;
    return control.push((this.initiateOnboardPackage()));
  }
  get getFormControls(){
    const control = this.customForms.get('onBoardingPackageName') as FormArray;
    return control;
  }

  formUploaded(fileItems: FileUpload[]){
    if(fileItems.length > 0) {
      this.formNames = [];
      this.addCustomForm = false;
      this.customFormsAdded = true;
      this.fileItemsUploaded = this.fileItemsUploaded.concat(fileItems);
      this.formNames = this.formNames.concat(this.fileItemsUploaded.map(c=> c.name));
    }
  }

  submitCustomForms(){
    if (this.federalForms.invalid || !this.federalForms.dirty) {
      this.alertService.showError('Please enter required field');
      return;
    } else if (this.federalForms.valid) {
      this.newOnboardPacket.name = this.federalForms.controls.name.value;
      this.newOnboardPacket.i9 =  this.federalForms.controls.i9.value ? formInclude.I9 : '';
      this.newOnboardPacket.stateW4 = this.federalForms.controls.stateW4.value ? formInclude.STATE_W4 : '';
      this.newOnboardPacket.w4 = this.federalForms.controls.w4.value ? formInclude.W4 : '';
      this.newOnboardPacket.storeId = this.storeData.storeId.toString();
      this.newOnboardPacket.receivingHiringManager = this.storeData.hiringManagerId;
      // @ts-ignore
      // @ts-ignore
      if (this.fileItemsUploaded?.length > 0) {
        const customForms  = this.fileItemsUploaded.map(f => new CustomForms(f.name, f.url));
        this.newOnboardPacket.customForms = JSON.stringify(customForms);
      }
      this.createOnboadingPackage(this.newOnboardPacket);
      this.closeModal();
    }
  }

  createOnboadingPackage(packet){
    this.onBoardingService.createOnboardPacket(packet).then(data =>{
      console.log('sent forms', packet);
    });
  }
  closeModal() {
    this.modalController
      .dismiss()
      .then();
  }
}
