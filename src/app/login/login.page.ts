import { Component, OnInit } from '@angular/core';
import {AuthService} from "../shared/services/auth.service";
import firebase from "firebase";
import {User} from "../shared/models/user";
import {FormBuilder, FormGroup} from '@angular/forms';
import {NavigationExtras, Router} from '@angular/router';
import {FirestoreHelperService} from '../shared/firestore-helper.service';
import {DatePipe} from "@angular/common";
import {UserService} from "../shared/services/user.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  providers: [DatePipe]
})
export class LoginPage implements OnInit {
  acceptTerms: boolean;
  newUser: User = new User();
  isRegistering: boolean;
  registrationForm: FormGroup;
  userId: string;
  date: Date;
  latestDate: string;
  isRegisteringFranchiseUser = false;
  isRegisteringStore = false;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  validation_messages = {
    email: [
      { type: 'required', message: 'Enter your email to login' },
      { type: 'email', message: 'Must be a valid email' },
      // { type: 'maxlength', message: 'Display Name cannot be more than 25 characters long.' }
    ],
    name: [
      { type: 'required', message: 'Name is required.' },
      // { type: 'minlength', message: 'Display Name must be at least 4 characters long.' },
      // { type: 'maxlength', message: 'Display Name cannot be more than 25 characters long.' }
    ],
    phoneNumber: [
      { type: 'required', message: 'Phone Number is required.' },
      { type: 'minlength', message: 'Phone Number must be at least 7 characters long.' },
      { type: 'maxlength', message: 'Phone Number cannot be more than 15 characters long.' }
    ],
  };
  constructor(
    public authService: AuthService,
    public fb: FormBuilder,
    public router: Router,
    public dbHelper: FirestoreHelperService,
    public datePipe: DatePipe,
    public userService: UserService
  ) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation.extras.state;
    if(state){
      this.isRegisteringFranchiseUser = state.isRegisteringFranchise? true : null;
    }

  }

  ngOnInit() {
    console.log('registering franchise', this.isRegisteringFranchiseUser);
    console.log('registering store', this.isRegisteringStore);
    this.acceptTerms = false;
    this.isRegistering = false;
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
  gotoTerms(){
    console.log ('go terms and conditions');
  }
  login(email, password){
        this.authService.SignIn(email.value, password.value).then(user =>{
        this.routeUserBasedOnRole(this.authService.userData.email);
        this.userId = JSON.parse(localStorage.getItem('user')).uid;
          console.log(this.userId);
    });
  }
  goToRegister(){
    this.isRegistering = true;
  }
  registerUser(){
    this.createDate();
    this.newUser.email = this.registrationForm.controls.email.value;
    this.newUser.password = this.registrationForm.controls.password.value;
    this.newUser.role = this.registrationForm.controls.role.value;

    this.authService.RegisterUser(this.newUser.email, this.newUser.password).then(u=>{
      console.log('registered user', u);
      this.userId = this.registrationForm.controls.email.value;
        const user ={
          firstName: this.registrationForm.controls.firstName.value,
          lastName: this.registrationForm.controls.lastName.value,
          email: this.registrationForm.controls.email.value,
          role: this.registrationForm.controls.role.value,
          phoneNumber: this.registrationForm.controls.phoneNumber.value,
          dateCreated: this.latestDate
        };
      this.authService.SendVerificationMail()
      this.dbHelper.set(`users/${this.userId}`, user);
        this.authService.SignIn(this.newUser.email, this.newUser.password).then( user =>{
          this.routeUserBasedOnRole(this.userId);
        })
    });
  }
  routeUserBasedOnRole(userId){
    this.userService.getUserById(userId).subscribe(user => {
      console.log('retrieved user', user.role);
      this.userId = JSON.parse(localStorage.getItem('user')).email;
      if (user.role === 'franchisee'){
        const navigationExtras: NavigationExtras ={
          state: {
            userId: this.userId
          }
        };
        this.router.navigate(['franchise'], navigationExtras);
        console.log('Route Franchisee');
      }
    });
  }
}
