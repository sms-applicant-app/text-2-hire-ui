import { Component, OnInit } from '@angular/core';
import {FirestoreHelperService} from '../shared/firestore-helper.service';
import {NavigationExtras, Router} from "@angular/router";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  name: string;
  isRegisteringFranchise: boolean;
  constructor(public dbHelper: FirestoreHelperService, public router: Router) { }

  ngOnInit() {
    this.isRegisteringFranchise = true;
  }
    addUserForFranchise(){
    const navigationExtras: NavigationExtras = {
      state:{
        isRegisteringFranchise: this.isRegisteringFranchise
      }

    }
      this.router.navigate(['login'], navigationExtras);
    }
}
