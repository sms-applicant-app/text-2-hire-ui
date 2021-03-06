import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Franchisee} from "../../../shared/models/franchisee";
import {FirestoreHelperService} from "../../../shared/firestore-helper.service";
import {DatePipe} from "@angular/common";
import {Router} from "@angular/router";
import {FranchiseService} from "../../../shared/services/franchise.service";
import {MatDialog} from "@angular/material/dialog";
import { v4 as uuidv4 } from 'uuid';
@Component({
  selector: 'app-add-franchise',
  templateUrl: './add-franchise.component.html',
  styleUrls: ['./add-franchise.component.scss'],
})
export class AddFranchiseComponent implements OnInit {
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
  latestDate: string;
  addedFranchiseOwner: boolean;
  showFranchiseDetails: boolean;

  constructor(
    public dbHelper: FirestoreHelperService,
    public datePipe: DatePipe,
    public fb: FormBuilder,
    public router: Router,
    public franchiseService: FranchiseService,
    public dialog: MatDialog
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
  createDate() {
    this.date = new Date();
    this.latestDate = this.datePipe.transform(this.date, 'MM-dd-yyyy');

    return this.latestDate;
  }
  initAddFranchiseForm(){
    this.addFranchiseForm = this.fb.group({
      legalBusinessName: ['', Validators.required],
      corporateEmail: [''],
      dba: [''],
      corporatePhone: ['']
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
    console.log('address added', this.addressAdded);
    if(this.addressAdded){
      this.goToFranchiseList();
    }
  }

  async addFranchise(){
    this.createDate();
    this.newFranchise.businessLegalName = this.addFranchiseForm.controls.legalBusinessName.value;
    this.newFranchise.corporateEmail = this.addFranchiseForm.controls.corporateEmail.value;
    // this.newFranchise.jobTitle = this.addFranchiseForm.controls.jobTitle.value;
    this.newFranchise.dba = this.addFranchiseForm.controls.dba.value;
    this.newFranchise.phoneNumber = this.addFranchiseForm.controls.corporatePhone.value;
    this.newFranchise.addressId = this.addressId;
    this.newFranchise.franchiseOwnerId = this.userData.email;
    this.newFranchise.dateCreated = this.latestDate;
    const newFranchise = await this.franchiseService.createFranchise(this.newFranchise);
    this.franchiseAdded = true;
    this.newFranchise.id = JSON.parse(localStorage.getItem('added-franchise'));
    console.log('new franchise id=', this.newFranchise.id);
    return this.newFranchise.id;
  }
  addFranchiseAddress(){
    this.addressId = uuidv4();
    this.addAddress = true;
    this.addressType = 'franchise';
    this.addFranchise().then(franchiseId =>{
      console.log('franchise added in address method ', franchiseId);
    });
  }
  goToFranchiseList(){
    const userRole = JSON.parse(localStorage.getItem('appUserData')).role;
    if(userRole === 'franchisee'){
      this.router.navigate(['franchise/list-stores']);
    }
    this.router.navigate(['admin/admin-franchise-list']);
  }


}
