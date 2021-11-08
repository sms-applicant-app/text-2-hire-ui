import { Component, OnInit } from '@angular/core';
import {FileUpload} from "../../../shared/models/file-upload";
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-add-on-board-packet',
  templateUrl: './add-on-board-packet.component.html',
  styleUrls: ['./add-on-board-packet.component.scss'],
})
export class AddOnBoardPacketComponent implements OnInit {
    storeId: string;
    fileUpload: FileUpload;
    customForms: FormGroup;
    federalForms: FormGroup;
    formNames: any = [];
    formsControl: FormArray;
  constructor(public fb: FormBuilder) { }

  ngOnInit() {
    this.storeId = JSON.parse(localStorage.getItem('appUserData')).storeIds;
    this.customForms = this.fb.group({
      onBoardingPackageName: this.fb.array([])
    });
    this.federalForms = this.fb.group({
      w4: [''],
      i9: [''],
      stateW4: ['']
    });
    this.addFormToPackage();
  }
  initiateOnboardPackage(): FormGroup {
    return this.fb.group({
      fileName: [],
    });
  }
  addFormToPackage(){
    const control = this.customForms.get('onBoardPackageName') as FormArray;
    return control.push((this.initiateOnboardPackage()));
  }
  get getFormControls(){
    const control = this.customForms.get('onBoardPackageName') as FormArray;
    return control;
  }
  formUploaded($event){
    this.formNames = [];
    console.log('formsUploaded', $event);
    this.fileUpload = $event;
    if($event){
      console.log('do something with this form', this.fileUpload);
      this.formNames.push(this.fileUpload.name);
    }
  }
  uploadTask($event){
    console.log('percentage complete', $event);
  }
  ngAfterOnInit() {
    console.log('after init');
    this.formsControl = this.customForms.get('onBoardPackageName') as FormArray;
  }

}
