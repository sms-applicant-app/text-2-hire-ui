import { Component, OnInit } from '@angular/core';
import {AuthService} from '../shared/services/auth.service';
import firebase from 'firebase';
import {User} from '../shared/models/user';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NavigationExtras, Router} from '@angular/router';
import {FirestoreHelperService} from '../shared/firestore-helper.service';
import {DatePipe} from '@angular/common';
import {UserService} from '../shared/services/user.service';
import * as uuid from 'uuid';
import {
  emailValidator,
  matchingPasswords,
  passwordValidator,
  phoneValidator,
  validatedURL
} from '../shared/utils/app-validators';
import { AlertService } from '../shared/services/alert.service';
import { toastMess } from '../shared/constants/messages';
import {Franchisee} from "../shared/models/franchisee";


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  providers: [DatePipe]
})
export class LoginPage implements OnInit {
  acceptTerms: boolean;
  newUser: User = new User();
  alreadyRegistered: boolean;
  registrationForm: FormGroup;
  formLogin: FormGroup;
  userId: string;
  date: Date;
  latestDate: string;
  userData: any;
  isRegisteringFranchiseUser = false;
  isRegisteringStore = false;
  firstTimeLogin: boolean;
  storeManagerRegistrationForm: FormGroup;
  newFranchiseOwner: Franchisee = new Franchisee();

  // eslint-disable-next-line @typescript-eslint/naming-convention
  validation_messages = {
    email: [
      {type: 'required', message: 'Enter your email to login'},
      {type: 'email', message: 'Must be a valid email'},
      // { type: 'maxlength', message: 'Display Name cannot be more than 25 characters long.' }
    ],
    name: [
      {type: 'required', message: 'Name is required.'},
      // { type: 'minlength', message: 'Display Name must be at least 4 characters long.' },
      // { type: 'maxlength', message: 'Display Name cannot be more than 25 characters long.' }
    ],
    phoneNumber: [
      {type: 'required', message: 'Phone Number is required.'},
      {type: 'minlength', message: 'Phone Number must be at least 7 characters long.'},
      {type: 'maxlength', message: 'Phone Number cannot be more than 15 characters long.'}
    ],
  };

  constructor(
    public authService: AuthService,
    public fb: FormBuilder,
    public router: Router,
    public dbHelper: FirestoreHelperService,
    public datePipe: DatePipe,
    public userService: UserService,
    public alertService: AlertService
  ) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation.extras.state;
    if (state) {
      this.isRegisteringFranchiseUser = state.isRegisteringFranchise ? true : null;
    }

  }

  ngOnInit() {
    this.acceptTerms = false;
    this.alreadyRegistered = false;
    this.firstTimeLogin = false;
    this.createRegisterForm();
    this.createLoginForm();
    this.storeManagerRegistrationForm = this.fb.group({
      fullName: ['', Validators.required],
      phoneNumber: ['', Validators.compose([Validators.required, phoneValidator])],
      calendarLink: ['', Validators.compose([ validatedURL])],
      role: ['', Validators.required]
    });
  }
  createLoginForm(){
    this.formLogin = this.fb.group({
      email: ['', [Validators.required, emailValidator]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  createRegisterForm() {
    this.registrationForm = this.fb.group(
      {
        fullName: ['', Validators.required],
        email: ['', [Validators.required, emailValidator]],
        phoneNumber: ['', [Validators.required, phoneValidator]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required]
      },
      { validator: matchingPasswords('password', 'confirmPassword') }
    );
  }

  createDate() {
    this.date = new Date();
    this.latestDate = this.datePipe.transform(this.date, 'MM-dd-yyyy');

    return this.latestDate;
  }

  gotoTerms() {
    console.log('go terms and conditions');
  }

  async login() {
    if (this.formLogin.valid) {
      const formValue = this.formLogin.value;
      const email = formValue.email;
      const password = formValue.password;
      console.log(email, password);
      this.userData = this.userService.getUserById(email).subscribe(user =>{
        console.log(this.userData, user);
        localStorage.setItem('appUserData',JSON.stringify(user));
      });

     await this.authService.SignIn(email, password);
    } else {
      this.alertService.showError('Incorrect Email or Password');
    }
  }

  goToLogin() {
    this.alreadyRegistered = true;
    this.registrationForm.reset();
  }
  goBack() {
    this.alreadyRegistered = false;
  }

  registerUser(password) {
    if (this.registrationForm.valid) {
      const formValue = this.registrationForm.value;
      this.createDate();
      this.newUser.email = this.registrationForm.controls.email.value;
      this.authService.RegisterUser(this.newUser.email, password.value).then(u => {
        this.userId = this.registrationForm.controls.email.value;
        const user = {
          firstName: this.registrationForm.controls.firstName.value,
          email: this.registrationForm.controls.email.value,
          role: 'franchisee',
          phoneNumber: this.registrationForm.controls.phoneNumber.value,
          dateCreated: this.latestDate,
          updatedAt: this.latestDate,
          franchiseId: uuid.v4(),
          firstTimeLogin: true // next logging need to be prompted to finish Franchise profile ticket HNC-165
        });
        const userData = localStorage.setItem('appUserData', JSON.stringify(user));
        console.log(userData);

        this.authService.SendVerificationMail();

        this.dbHelper.set(`users/${this.userId}`, user);
        this.authService.SignIn(this.newUser.email, password.value);
        this.alertService.showSuccess(toastMess.CREATE_SUCCESS);

        this.registrationForm.reset();
      }).catch((err) => {
        this.alertService.showError(err.message);
      });
    } else {
      this.alertService.showError('Please enter field required');
    }
  }
  registerFranchiseOwner() {
    const formValue = this.storeManagerRegistrationForm.value;

    this.createDate();
    this.newUser.email = this.registrationForm.controls.email.value;
    const password = this.registrationForm.controls.password.value;
    this.authService.RegisterUser(this.newUser.email, password).then(u => {
      console.log('registered user', u);

      const franchiseOwner = {
        fullName: this.storeManagerRegistrationForm.controls.fullName.value,
        email: this.storeManagerRegistrationForm.controls.email.value,
        role: 'franchisee',
        phoneNumber: this.storeManagerRegistrationForm.controls.phoneNumber.value,
        dateCreated: this.latestDate,
        updatedAt: this.latestDate,
        franchiseId: uuid.v4(),
        firstTimeLogin: true //// next logging need to be prompted to finish Franchise profile ticket HNC-165
      };
      this.dbHelper.set(`users/${this.userId}`, franchiseOwner);
      this.authService.SendVerificationMail();
      this.authService.SignIn(this.newUser.email, password.value);
      this.alertService.showSuccess(toastMess.CREATE_SUCCESS);
      this.registrationForm.reset();
    }).catch((err) => {
      this.alertService.showError(err.message);
    });
  }
}
