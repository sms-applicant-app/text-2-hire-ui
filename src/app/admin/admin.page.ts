import { Component, OnDestroy, OnInit } from '@angular/core';
import {FirestoreHelperService} from '../shared/firestore-helper.service';
import {NavigationExtras, Router} from '@angular/router';
import {Franchisee} from '../shared/models/franchisee';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit, OnDestroy {
  name: string;
  franchiseData: Franchisee[];
  getSubscribe: Subscription = new Subscription();
  isRegisteringFranchise: boolean;
  constructor(public dbHelper: FirestoreHelperService, public router: Router) { }

  ngOnInit() {
    this.isRegisteringFranchise = true;
    this.getFranchisee();
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.getSubscribe.unsubscribe();
  }

  addUserForFranchise(){
    const navigationExtras: NavigationExtras = {
      state:{
        isRegisteringFranchise: this.isRegisteringFranchise
      }
    };
    this.router.navigate(['login'], navigationExtras);
  }
  getFranchisee(){
    this.getSubscribe = this.dbHelper.collectionWithIds$('franchisee', ref => ref.orderBy('createdDate', 'desc')).subscribe(data => {
      if (data) {
        this.franchiseData = data;
        console.log('data', data);
        this.franchiseData.forEach(franchise => {
          // franchise.dateCreated = franchise.dateCreated.toDate();
          franchise.createdDate = franchise.createdDate ? franchise.createdDate.toDate() : franchise.createdDate;
        });
      }
    });
  }
}
