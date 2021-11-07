import { Component, OnInit } from '@angular/core';
import {FileUpload} from "../../../shared/models/file-upload";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-add-on-board-packet',
  templateUrl: './add-on-board-packet.component.html',
  styleUrls: ['./add-on-board-packet.component.scss'],
})
export class AddOnBoardPacketComponent implements OnInit {
    storeId: string;
    fileUpload: FileUpload;
    onBoardPacketForms: FormGroup;
    formNames: any = [];
  constructor(public fb: FormBuilder) { }

  ngOnInit() {
    this.storeId = JSON.parse(localStorage.getItem('appUserData')).storeIds;
    this.onBoardPacketForms = this.fb.group({
      onBoardingPackageName: ['']
    });
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
}
