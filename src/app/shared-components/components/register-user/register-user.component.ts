import {Component, EventEmitter, OnInit, Output} from '@angular/core';
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
  newStoreManager: StoreManager = new StoreManager()
  date;
  userId: string;
  latestDate: string
  registrationForm: FormGroup;
  franchiseId: string;
  userAdded: boolean;
  constructor(public datePipe: DatePipe, public fb: FormBuilder, public authService: AuthService, public dbHelper: FirestoreHelperService) { }

  ngOnInit() {
    this.registrationForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      password: [''],
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
    this.newStoreManager.user.email = this.registrationForm.controls.email.value;
    this.newStoreManager.user.password = this.registrationForm.controls.password.value;
    this.newStoreManager.user.role = this.registrationForm.controls.role.value;
    this.authService.RegisterUser(this.newStoreManager.user.email, this.newStoreManager.user.password).then(u=>{
      console.log('registered user', u);
      const user ={
        firstName: this.registrationForm.controls.firstName.value,
        lastName: this.registrationForm.controls.lastName.value,
        email: this.registrationForm.controls.email.value,
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
