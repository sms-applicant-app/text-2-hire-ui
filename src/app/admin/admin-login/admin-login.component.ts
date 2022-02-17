import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../shared/services/auth.service";
import {Router} from "@angular/router";
import { AlertService } from '../../shared/services/alert.service';
import { toastMess } from '../../shared/constants/messages';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { emailValidator } from '../../shared/utils/app-validators';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss'],
})
export class AdminLoginComponent implements OnInit {
  adminLoginForm: FormGroup;

  constructor(
    public authService: AuthService,
    public route: Router,
    public alertService: AlertService,
    public fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.createLoginForm();
  }
  createLoginForm(){
    this.adminLoginForm = this.fb.group({
      email: ['', [Validators.required, emailValidator]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  adminLogin(){
    if (this.adminLoginForm.valid) {
      const formValue = this.adminLoginForm.value;
      this.authService.adminSignIn(formValue.email, formValue.password).then(user =>{
        this.route.navigate(['admin']);
        this.alertService.showSuccess(toastMess.LOGIN_SUCCESS);
      }).catch((err) => {
        this.alertService.showError(err.message);
      });;
    }
    };
}
