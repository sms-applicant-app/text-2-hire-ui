import { Component, OnInit } from '@angular/core';
import {FirestoreHelperService} from '../shared/firestore-helper.service';
import {NavigationExtras, Router} from '@angular/router';
import {Franchisee} from '../shared/models/franchisee';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  name: string;
  franchisees: Franchisee[];
  isRegisteringFranchise: boolean;
  franchiseData: any = [];
  constructor(public dbHelper: FirestoreHelperService, public router: Router) { }

  ngOnInit() {
    this.isRegisteringFranchise = true;
    this.franchisees = [];
    this.dbHelper.collectionWithIds$('franchisee').subscribe((data: []) => {
      this.franchisees = data;
    });
    console.log('franchises', this.franchisees);
  }
  getFranchiseById(){
    console.log(this.franchisees);
  }
    addUserForFranchise(){
    const navigationExtras: NavigationExtras = {
      state:{
        isRegisteringFranchise: this.isRegisteringFranchise
      }

    };
      this.router.navigate(['login'], navigationExtras);
    }
}
