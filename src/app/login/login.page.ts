import { Component, OnInit } from '@angular/core';
import {AuthService} from "../shared/services/auth.service";
import firebase from "firebase";
import {User} from "../shared/models/user";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  acceptTerms: boolean
  newUser: User = new User()
  isRegistering: boolean
  registrationForm: FormGroup
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
    public router: Router
  ) { }

  ngOnInit() {
    this.acceptTerms = false
    this.isRegistering = false
    this.registrationForm = this.fb.group({
      email: [],
      password: [],
      role: [],
      phoneNumber: []
    })
  }
  gotoTerms(){
    console.log ('go terms and conditions')
  }
  Login(email, password){
        this.authService.SignIn(email.value, password.value).then(user =>{

    });
  }
  register(){
    this.isRegistering = true;
  }
  registerUser(){
    this.newUser.email = this.registrationForm.controls.email.value;
    this.newUser.password = this.registrationForm.controls.password.value;
    this.authService.RegisterUser(this.newUser.email, this.newUser.password).then(u=>{
      this.authService.SignIn(this.newUser.email, this.newUser.password).then(r =>{

      })
    })
  }
}
