import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from '../../../shared/models/user';
import {DatePipe} from '@angular/common';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import {AuthService} from '../../../shared/services/auth.service';
import {FirestoreHelperService} from '../../../shared/firestore-helper.service';

import {Role} from '../../../shared/models/role';
import { AlertService } from './../../../shared/services/alert.service';
import { toastMess } from '../../../shared/constants/messages';
import { emailValidator, phoneValidator, validatedURL } from '../../../shared/utils/app-validators';
import {StoreHiringManager} from "../../../shared/models/store-manager";

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss'],
  providers: [ DatePipe ]
})
export class RegisterUserComponent implements OnInit {
  @Input() franchiseId: string;
  @Input() storeId;
  @Output() addedUserEvent = new EventEmitter<User>();

  newUser: User = new User();
  userForm: FormGroup;
  date;
  eRole = Role;
  userId: string;
  latestDate: string;
  storeManagerRegistrationForm: FormGroup;
  userAdded: boolean;
  newStoreHiringManager: StoreHiringManager = new StoreHiringManager();
  isRegisteringStoreManager: boolean;
  constructor(
    public datePipe: DatePipe,
    public fb: FormBuilder,
    public authService: AuthService,
    public dbHelper: FirestoreHelperService,
    public alertService: AlertService
    ) { }

  ngOnInit() {
    this.userAdded = false;
    this.isRegisteringStoreManager = false;
    this.userForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, emailValidator])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]

    });
    this.storeManagerRegistrationForm = this.fb.group({
      fullName: ['', Validators.required],
      phoneNumber: ['', Validators.compose([Validators.required, phoneValidator])],
      calendarLink: ['', Validators.compose([ validatedURL])],
      role: ['', Validators.required]
    });
    if(this.storeId !== undefined){
      this.isRegisteringStoreManager = true;
    }
  }

  validatedURL(control: FormControl): { [key: string]: any } {
    const role = this.storeManagerRegistrationForm.controls.role.value;
    if (role === Role.hiringManager) {
      if (!control.value) {
        return { required: true };
      }
      const pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
        '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
        if (control.value.match(pattern)) {
          return null;
        } else {
          return { pattern: true };
        }
      }
  }
  createDate() {
    this.date = new Date();
    this.latestDate = this.datePipe.transform(this.date, 'MM-dd-yyyy');

    return this.latestDate;
  }
  registerStoreManagerUser(){
    if (this.userForm.valid && this.storeManagerRegistrationForm.valid) {
      this.createDate();
      this.newUser.email = this.userForm.controls.email.value;
      const password = this.userForm.controls.password.value;
      this.userId = this.newUser.email;
      this.authService.RegisterUser(this.newUser.email, password).then(u=>{
        this.newStoreHiringManager.fullName = this.storeManagerRegistrationForm.controls.fullName.value;
        this.newStoreHiringManager.email = this.userForm.controls.email.value;
        this.newStoreHiringManager.phoneNumber = this.storeManagerRegistrationForm.controls.phoneNumber.value;
        this.newStoreHiringManager.role = this.storeManagerRegistrationForm.controls.role.value;
        if (this.newStoreHiringManager.role === 'hiringManager') {
          this.newStoreHiringManager.calendlyLink = this.storeManagerRegistrationForm.controls.calendarLink.value;
        }
        this.newStoreHiringManager.dateCreated = this.latestDate;
        this.newStoreHiringManager.franchiseId = this.franchiseId;
        this.newStoreHiringManager.storeIds = this.isRegisteringStoreManager? this.storeId: null;
        this.dbHelper.set(`users/${this.userId}`, this.newStoreHiringManager);
        this.alertService.showSuccess(toastMess.CREATE_STORE_HIRING_MANAGER);
        this.authService.SendVerificationMail();
        this.userAdded = true;
        this.sendUserMessage();
      }).catch((err) => {
        this.alertService.showError(toastMess.CREATE_FAILED);
      });
    } else {
      this.alertService.showError('Please enter missing fields in red');
    }
  }
  registerFranchiseOwner(){
    this.createDate();
    this.newUser.email = this.userForm.controls.email.value;
    const password = this.userForm.controls.password.value;
    this.authService.RegisterUser(this.newUser.email, password).then(u=>{
      console.log('registered user', u);
      const franchiseOwner ={
        firstName: this.storeManagerRegistrationForm.controls.firstName.value,
        lastName: this.storeManagerRegistrationForm.controls.lastName.value,
        email: this.userForm.controls.email.value,
        role: this.storeManagerRegistrationForm.controls.role.value,
        phoneNumber: this.storeManagerRegistrationForm.controls.phoneNumber.value,
        dateCreated: this.latestDate
      };
      this.dbHelper.set(`users/${this.userId}`, franchiseOwner);
      this.authService.SendVerificationMail();
      this.userAdded = true;
    });
  }
  sendUserMessage(){
    console.log('message being sent', this.newUser);
    this.addedUserEvent.emit(this.newUser);
  }
}
