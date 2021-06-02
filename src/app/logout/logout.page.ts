import { Component, OnInit } from '@angular/core';
import {AuthService} from "../shared/services/auth.service";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit() {
    this.authService.SignOut().then(data =>{
      console.log("logged out", data)
    })
  }

}
