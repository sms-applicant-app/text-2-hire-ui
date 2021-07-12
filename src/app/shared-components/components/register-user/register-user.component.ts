import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from "../../../shared/models/user";
import {DatePipe} from "@angular/common";
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthService} from "../../../shared/services/auth.service";
import {FirestoreHelperService} from "../../../shared/firestore-helper.service";
import {StoreManager} from "../../../shared/models/store-manager";
import { v4 as uuidv4 } from 'uuid';
import {uuid4} from "@capacitor/core/dist/esm/util";
import {Role} from "../../../shared/models/role";

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss'],
  providers: [ DatePipe ]
})
export class RegisterUserComponent implements OnInit {
  @Output() addedUserEvent = new EventEmitter<User>();
  @Input() franchiseId: string;
  @Input() storeId;
  newUser: User = new User();
  userForm: FormGroup;
  date;
  eRole = Role;
  userId: string;
  latestDate: string;
  registrationForm: FormGroup;
  userAdded: boolean;
  isRegisteringStoreManager: boolean;
  constructor(public datePipe: DatePipe, public fb: FormBuilder, public authService: AuthService, public dbHelper: FirestoreHelperService) { }

  ngOnInit() {
    this.userAdded = false;
    this.isRegisteringStoreManager = false;
    this.userForm = this.fb.group({
      email: [''],
      password: ['']

    });
    this.registrationForm = this.fb.group({
      fullName: [''],
      phoneNumber: [''],
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
    this.createDate();
    this.newUser.email = this.userForm.controls.email.value;
    this.newUser.password = this.userForm.controls.password.value;
    this.userId = this.newUser.email;
    this.authService.RegisterUser(this.newUser.email, this.newUser.password).then(u=>{
      console.log('registered user', u, this.registrationForm.value);
      this.newUser.fullName = this.registrationForm.controls.fullName.value;
      this.newUser.email = this.userForm.controls.email.value;
      this.newUser.phoneNumber = this.registrationForm.controls.phoneNumber.value;
      this.newUser.role = this.registrationForm.controls.role.value;
      this.newUser.dateCreated = this.latestDate;
      this.newUser.franchiseId = this.franchiseId;
      this.newUser.storeIds = this.isRegisteringStoreManager? this.storeId: null;
      console.log('can I make a store manger', this.newUser);
      this.dbHelper.set(`users/${this.userId}`, this.newUser);
      this.authService.SendVerificationMail();
      this.userAdded = true;
      this.sendUserMessage();
    });
  }
  registerFranchiseOwner(){
    this.createDate();
    this.newUser.email = this.userForm.controls.email.value;
    this.newUser.password = this.userForm.controls.password.value;
    this.authService.RegisterUser(this.newUser.email, this.newUser.password).then(u=>{
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
