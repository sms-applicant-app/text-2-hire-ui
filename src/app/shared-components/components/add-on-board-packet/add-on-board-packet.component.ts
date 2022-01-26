import { Component, Input, OnInit } from '@angular/core';
import {FileUpload} from "../../../shared/models/file-upload";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {OnboardingService} from "../../../shared/services/onboarding.service";
import {CustomForms, OnBoardPacket} from "../../../shared/models/onBoardPacket";
import { ModalController } from '@ionic/angular';
import { AlertService } from '../../../shared/services/alert.service';
import { formInclude } from '../../../shared/constants/formInclude';


@Component({
  selector: 'app-add-on-board-packet',
  templateUrl: './add-on-board-packet.component.html',
  styleUrls: ['./add-on-board-packet.component.scss'],
})
export class AddOnBoardPacketComponent implements OnInit {
  @Input() storeId: string;
  fileUpload: FileUpload;
  customForms: FormGroup;
  federalForms: FormGroup;
  formNames: any = [];
  formsControl: FormArray;
  addCustomForm: boolean;
  customFormsAdded: boolean;
  newOnboardPacket = new OnBoardPacket();
  newCustomForms = new CustomForms();
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
    console.log('after init');
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
  formUploaded($event){
    this.formNames = [];
    console.log('formsUploaded', $event);
    this.fileUpload = $event;
    if($event){
      console.log('do something with this form', this.fileUpload);
      this.formNames.push(this.fileUpload.file.name);
      console.log('uploaded forms', this.formNames);
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
      this.newOnboardPacket.storeId = this.storeId;
      if (this.fileUpload && this.fileUpload.file && this.fileUpload.file.name !== '') {
        this.newOnboardPacket.customForms = this.fileUpload.file.name;
      }
      this.createOnboadingPackage(this.newOnboardPacket);
      this.closeModal();
    }
  }
  uploadTask($event){
    console.log('percentage complete', $event);
    if ($event === 100){
      this.addCustomForm = false;
      this.customFormsAdded = true;
      // push to array of forms
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
