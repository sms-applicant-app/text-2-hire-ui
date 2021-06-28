import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from "../../../shared/models/user";
import {DatePipe} from "@angular/common";
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthService} from "../../../shared/services/auth.service";
import {FirestoreHelperService} from "../../../shared/firestore-helper.service";
import {StoreManager} from "../../../shared/models/store-manager";

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss'],
  providers: [ DatePipe ]
})
export class RegisterUserComponent implements OnInit {
  @Output() messageEvent = new EventEmitter<boolean>();
  @Output() addedUserEvent = new EventEmitter<any>()
  @Input() franchiseId: string;
  newStoreManager: StoreManager = new StoreManager()
  newUser: User = new User()
  userForm: FormGroup
  date;
  userId: string;
  latestDate: string
  registrationForm: FormGroup;

  userAdded: boolean;
  constructor(public datePipe: DatePipe, public fb: FormBuilder, public authService: AuthService, public dbHelper: FirestoreHelperService) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      email: [''],
      password: ['']
    })
    this.registrationForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      role: [''],
      phoneNumber: ['']
    });
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
      this.userAdded = true
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
      this.userAdded = true
    });
  }
  sendMessage() {
    this.messageEvent.emit(this.userAdded);
  }
  sendUserMessage(){
    this.addedUserEvent.emit(this.newStoreManager)
  }
}
