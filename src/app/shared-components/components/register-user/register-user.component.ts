import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from '../../../shared/models/user';
import {DatePipe} from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AuthService} from '../../../shared/services/auth.service';
import {FirestoreHelperService} from '../../../shared/firestore-helper.service';

import {Role} from '../../../shared/models/role';
import { AlertService } from './../../../shared/services/alert.service';
import { toastMess } from '../../../shared/constants/messages';
import { emailValidator, phoneValidator, validatedURL } from '../../../shared/utils/app-validators';

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
  registrationForm: FormGroup;
  userAdded: boolean;
  isRegisteringStoreManager: boolean;
  constructor(
    public datePipe: DatePipe,
    public fb: FormBuilder,
    public authService: AuthService,
    public dbHelper: FirestoreHelperService,
    public alertService: AlertService
    ) { }

  ngOnInit() {
    console.log('incoming franchise Id and or storeId', this.franchiseId, this.storeId);
    this.userAdded = false;
    this.isRegisteringStoreManager = false;
    this.userForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, emailValidator])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]

    });
    this.registrationForm = this.fb.group({
      fullName: ['', Validators.required],
      phoneNumber: ['', Validators.compose([Validators.required, phoneValidator])],
      calendarLink: ['', Validators.compose([Validators.required, validatedURL])],
      role: ['']
    });
    if(this.storeId !== undefined){
      this.isRegisteringStoreManager = true;
    }
  }
  createDate() {
    this.date = new Date();
    this.latestDate = this.datePipe.transform(this.date, 'MM-dd-yyyy');

    return this.latestDate;
  }
  registerStoreManagerUser(){
    if (this.userForm.valid && this.registrationForm.valid) {
      this.createDate();
      this.newUser.email = this.userForm.controls.email.value;
      const password = this.userForm.controls.password.value;
      this.userId = this.newUser.email;
      this.authService.RegisterUser(this.newUser.email, password).then(u=>{
        this.newUser.fullName = this.registrationForm.controls.fullName.value;
        this.newUser.email = this.userForm.controls.email.value;
        this.newUser.phoneNumber = this.registrationForm.controls.phoneNumber.value;
        this.newUser.role = this.registrationForm.controls.role.value;
        if (this.newUser.role === 'hiringManager') {
          this.newUser.calendlyLink = this.registrationForm.controls.calendarLink.value;
        }
        this.newUser.dateCreated = this.latestDate;
        this.newUser.franchiseId = this.franchiseId;
        this.newUser.storeIds = this.isRegisteringStoreManager? this.storeId: null;
        this.dbHelper.set(`users/${this.userId}`, this.newUser);
        this.alertService.showSuccess(toastMess.CREATE_SUCCESS);
        this.authService.SendVerificationMail();
        this.userAdded = true;
        this.sendUserMessage();
      }).catch((err) => {
        this.alertService.showError(toastMess.CREATE_FAILED);
      });
    } else {
      this.alertService.showError('Please enter field');
    }
  }
  registerFranchiseOwner(){
    this.createDate();
    this.newUser.email = this.userForm.controls.email.value;
    const password = this.userForm.controls.password.value;
    this.authService.RegisterUser(this.newUser.email, password).then(u=>{
      console.log('registered user', u);
      const user ={
        firstName: this.registrationForm.controls.firstName.value,
        lastName: this.registrationForm.controls.lastName.value,
        email: this.userForm.controls.email.value,
        role: this.registrationForm.controls.role.value,
        phoneNumber: this.registrationForm.controls.phoneNumber.value,
        dateCreated: this.latestDate
      };
      this.dbHelper.set(`users/${this.userId}`, user);
      this.authService.SendVerificationMail();
      this.userAdded = true;
    });
  }
  sendUserMessage(){
    console.log('message being sent', this.newUser);
    this.addedUserEvent.emit(this.newUser);
  }
}
