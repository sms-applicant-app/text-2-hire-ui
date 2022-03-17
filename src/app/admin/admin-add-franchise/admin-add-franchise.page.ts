import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NavigationExtras, Router} from "@angular/router";
import * as firebase from 'firebase';

import {FirestoreHelperService} from "../../shared/firestore-helper.service";
import {FranchiseService} from "../../shared/services/franchise.service";
import {Franchisee} from "../../shared/models/franchisee";
import {Address} from "../../shared/models/address";
import { v4 as uuidv4 } from 'uuid';
import {MatStepper} from '@angular/material/stepper';
import {MatDialog} from "@angular/material/dialog";
import { emailValidator, phoneValidator } from '../../shared/utils/app-validators';
import { AlertService } from '../../shared/services/alert.service';
import { DatePipe } from '@angular/common';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-admin-add-franchise',
  templateUrl: './admin-add-franchise.page.html',
  styleUrls: ['./admin-add-franchise.page.scss'],
  providers: [ MatStepper, DatePipe]
})
export class AdminAddFranchisePage implements OnInit {
  addFranchiseForm: FormGroup;
  registerStoreManger: FormGroup;
  addressType: string;
  id: string;
  loading = false;
  submitted = false;
  isRegisteringStoreUser: boolean;
  userData: any;
  addressId: string;
  franchiseId: any;
  newFranchise: Franchisee = new Franchisee();
  addAddress: boolean;
  addUser: boolean;
  addressAdded: boolean;
  franchiseAdded = false;
  date;
  addedFranchiseOwner: boolean;
  showFranchiseDetails: boolean;

  constructor(
    public dbHelper: FirestoreHelperService,
    public fb: FormBuilder,
    public router: Router,
    public franchiseService: FranchiseService,
    public dialog: MatDialog,
    public alertService: AlertService,
    public datePipe: DatePipe,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem('user'));
    this.isRegisteringStoreUser = false;
    this.initAddFranchiseForm();
    this.addAddress = false;
    this.addressAdded = false;
    this.addedFranchiseOwner = false;
    this.showFranchiseDetails = false;
  }
  initAddFranchiseForm(){
    this.addFranchiseForm = this.fb.group({
      legalBusinessName: ['', Validators.required],
      corporateEmail: ['', [Validators.required, emailValidator]],
      dba: [''],
      corporatePhone: ['', [Validators.required, phoneValidator]]
    });
  }
  receiveUserMessage($event){
    this.addedFranchiseOwner = $event;
    console.log('user added', this.addedFranchiseOwner);
    if(this.addedFranchiseOwner){
      this.showFranchiseDetails = true;
    }
  }
  receiveAddressMessage($event){
    this.addressAdded = $event;
    if(this.addressAdded){
      this.alertService.showSuccess('Add address success')
    }
  }
 async addFranchise(){
   if (this.addFranchiseForm.valid) {
    this.franchiseAdded = true;
    if (this.addressId) {
      this.newFranchise.addressId = this.addressId;
    }
    // conflict old data vs new data dateCreated.
    this.newFranchise.dateCreated = this.datePipe.transform(new Date(), 'MM-dd-yyyy');;
    this.newFranchise.createdDate = firebase.default.firestore.FieldValue.serverTimestamp();
    this.newFranchise.businessLegalName = this.addFranchiseForm.controls.legalBusinessName.value;
    this.newFranchise.corporateEmail = this.addFranchiseForm.controls.corporateEmail.value;
    this.newFranchise.dba = this.addFranchiseForm.controls.dba.value;
    this.newFranchise.phoneNumber = this.addFranchiseForm.controls.corporatePhone.value;
    const newFranchise = await this.franchiseService.createFranchise(this.newFranchise);
    this.newFranchise.id = JSON.parse(localStorage.getItem('added-franchise'));
    this.alertService.showSuccess(`${this.newFranchise.businessLegalName} create success`);
    // this.router.navigate(['admin/admin-franchise-list']);
    this.navCtrl.pop();
    // this.router.navigate(['admin']);
   return this.newFranchise.id;
  } else {
    this.alertService.showError('Please enter field');
  }

}
  addFranchiseAddress(){
    if (this.addFranchiseForm.valid) {
      this.addressId = uuidv4();
      this.addAddress = true;
      this.addressType = 'Franchise';
    } else {
      this.alertService.showError('Please enter field')
    }
  }
  goToFranchiseList(){
    const userRole = JSON.parse(localStorage.getItem('appUserData')).role;
    if(userRole === 'franchisee'){
      this.router.navigate(['franchise/list-stores']);
    }
    this.router.navigate(['admin/admin-franchise-list']);
  }

  createUserForFranchise(){
    const navigationExtras: NavigationExtras={
      state:{
        franchiseId: this.newFranchise.id,
        isRegisteringFranchise: true
      }
    };
    this.router.navigate(['login'], navigationExtras);
  }

}
