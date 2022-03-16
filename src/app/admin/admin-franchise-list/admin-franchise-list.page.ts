import { FirestoreHelperService } from './../../shared/firestore-helper.service';
import { Franchisee } from './../../shared/models/franchisee';
import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-admin-franchise-list',
  templateUrl: './admin-franchise-list.page.html',
  styleUrls: ['./admin-franchise-list.page.scss'],
})
export class AdminFranchiseListPage implements OnInit, OnDestroy {

  franchiseData: Franchisee[];
  getSubscribe: Subscription = new Subscription();

  constructor(
    public authService: AuthService,
    public router: Router,
    public dbHelper: FirestoreHelperService,
    public ngZone: NgZone,
  ) { }

  ngOnInit() {
    this.getFranchisee();
  }
  ngOnDestroy(): void {
    this.getSubscribe.unsubscribe();
  }

  goBack() {
    this.router.navigate(['admin']);
  }

  getFranchisee(){
    this.getSubscribe = this.dbHelper.collectionWithIds$('franchisee', ref => ref.orderBy('createdDate', 'desc')).subscribe(data => {
      if (data) {
        console.log('data', data);
        data.forEach(franchise => {
          franchise.createdDate = franchise.createdDate ? franchise.createdDate.toDate() : franchise.createdDate;
        });
        this.franchiseData = [];
         this.ngZone.run(() => {
          this.franchiseData = data;
        });
      }
    });
  }
}
