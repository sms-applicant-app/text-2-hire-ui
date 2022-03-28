import { Component, OnInit, OnChanges, ChangeDetectorRef } from '@angular/core';
import {FranchiseService} from '../shared/services/franchise.service';
import {AddStoreComponent} from '../shared-components/components/add-store/add-store.component';
import {ModalController} from '@ionic/angular';
import {AddJobReqComponent} from '../shared-components/components/add-job-req/add-job-req.component';
import {StoreService} from '../shared/services/store.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {MatTableDataSource} from '@angular/material/table';
import {Store} from '../shared/models/store';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../shared/services/user.service';
import {AuthService} from '../shared/services/auth.service';
import {Observable} from 'rxjs';
import { JobService } from '../shared/services/job.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.page.html',
  styleUrls: ['./store.page.scss'],
})
export class StorePage implements OnInit {
  franchiseId: string;
  selectedStore: any = [];
  storeHiringManger: string;
  storesData: any = [];
  userId: string;
  role: string;
  isHiringManager: boolean;
  dataSource: MatTableDataSource<Store>;
  userData: any;
  state$: Observable<any>;
  applicantsByStore: any = [];
  constructor(public franchiseService: FranchiseService,
              public modelController: ModalController,
              public storeService: StoreService,
              public firestore: AngularFirestore,
              public router: Router,
              public userService: UserService,
              public authService: AuthService,
              public activatedRoute: ActivatedRoute,
              public jobService: JobService,
              public changeDetectorRef: ChangeDetectorRef
  ) {

  }

  ngOnInit() {
    this.jobService.dataSub.subscribe(data => {
      if(data){
        this.getApplicantsByStoreId(data);
      }
    });
  }
  ionViewWillEnter(){
    this.userData = JSON.parse(localStorage.getItem('appUserData'));
    this.franchiseId = this.userData.franchiseId;
    if(this.userData.role === 'hiringManager'){
      this.role = 'hiringManager';
    }
    if (this.userData.role === 'franchisee'){
      this.role = 'franchisee';
    }
    this.getAllFranchiseStoresById();
  }
  getAllFranchiseStoresById(){
    console.log('franchise id', this.franchiseId);
    if (!this.franchiseId) {return;} ;
    this.storesData = this.franchiseService.getStoreByFranchiseById(this.franchiseId);
  }

  getApplicantsByStoreId(storeId){
    this.firestore.collection('applicant', ref => ref.where('storeId', '==', `${storeId}`)).valueChanges()
    .subscribe(applicant =>{
      if(applicant) {
        this.applicantsByStore = applicant;
        this.changeDetectorRef.detectChanges();
      }
    });
  }
}
