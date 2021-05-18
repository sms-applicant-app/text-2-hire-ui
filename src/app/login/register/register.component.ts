import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../shared/services/auth.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {User} from "../../shared/models/user";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registrationForm: FormGroup;
  newUser: User = new User()
  constructor(
    public authService: AuthService,
    public fb: FormBuilder,
    public route: Router

  ) { }

  ngOnInit() {
    this.registrationForm = this.fb.group({
      email: [],
      password: [],
      role: [],
      phoneNumber: []
    })
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
