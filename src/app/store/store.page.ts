import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-store',
  templateUrl: './store.page.html',
  styleUrls: ['./store.page.scss'],
})
export class StorePage implements OnInit {
  franchiseId: string;
  storeId: string;
  storeHiringManger: string;
  storesData: any = [];
  userId: string;
  role: string;
  isHiringManager: boolean;
  dataSource: MatTableDataSource<Store>;
  userData: any;
  state$: Observable<any>;

  constructor(public franchiseService: FranchiseService,
              public modelController: ModalController,
              public storeService: StoreService,
              public firestore: AngularFirestore,
              public router: Router,
              public userService: UserService,
              public authService: AuthService,
              public activatedRoute: ActivatedRoute
  ) {

  }

  ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem('appUserData'));
    console.log('user', this.userData.franchiseId, this.userData.role);
    this.franchiseId = this.userData.franchiseId;
    if(this.userData.role === 'hiringManager'){
      console.log('im a hiring manager');
      this.role = 'hiringManager';
    }
    if (this.userData.role === 'franchisee'){
      console.log('im a franchise owner', this.franchiseId);
      this.role = 'franchisee';
    }
    this.getAllFranchiseStoresById();

  }

  getAllFranchiseStoresById(){
  console.log('franchise id', this.franchiseId);
  if(!this.franchiseId) return;
   this.storesData = this.franchiseService.getStoreByFranchiseById(this.franchiseId);
  }

    async addJobRec(){
      const franchiseId = this.franchiseId;
      const storeId = this.storeId;
      console.log('display add Job Model');
      const addJobRec = await this.modelController.create({
        component: AddJobReqComponent,
        swipeToClose: true,
        componentProps: {
          franchiseId,
          storeId
        }
      });
      return await addJobRec.present();
    }

}
