import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../shared/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss'],
})
export class AdminLoginComponent implements OnInit {

  constructor(public authService: AuthService,
              public route: Router
  ) { }

  ngOnInit() {}
  adminLogin(email, password){
    this.authService.SignIn(email.value, password.value).then(user =>{
      this.route.navigate(['admin']);
    });
      //this.routeUserBasedOnRole(this.authService.userData.email);
    };
}
