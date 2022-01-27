import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../shared/services/auth.service";
import {Router} from "@angular/router";
import { AlertService } from '../../shared/services/alert.service';
import { toastMess } from '../../shared/constants/messages';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss'],
})
export class AdminLoginComponent implements OnInit {
  constructor(
    public authService: AuthService,
    public route: Router,
    public alertService: AlertService
  ) { }

  ngOnInit() {}
  adminLogin(email, password){
    this.authService.adminSignIn(email.value, password.value).then(user =>{
      this.route.navigate(['admin']);
      this.alertService.showSuccess(toastMess.LOGIN_SUCCESS);
    }).catch((err) => {
      this.alertService.showError(toastMess.LOGIN_FAILED)
    });;
      //this.routeUserBasedOnRole(this.authService.userData.email);
    };
}
