import { Component, OnInit } from '@angular/core';
import {FranchiseService} from '../shared/services/franchise.service';
import {AddStoreComponent} from '../shared-components/components/add-store/add-store.component';
import {ModalController} from '@ionic/angular';
import {AddJobReqComponent} from '../shared-components/components/add-job-req/add-job-req.component';
import {StoreService} from '../shared/services/store.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {MatTableDataSource} from '@angular/material/table';
import {Store} from '../shared/models/store';

@Component({
  selector: 'app-store',
  templateUrl: './store.page.html',
  styleUrls: ['./store.page.scss'],
})
export class StorePage implements OnInit {
  franchiseId: string;
  storeId: string;
  storeHiringManger: string;
  stores: any = [];
  dataSource: MatTableDataSource<Store>;
  constructor(public franchiseService: FranchiseService,
              public modelController: ModalController,
              public storeService: StoreService,
              public firestore: AngularFirestore
  ) { }

  ngOnInit() {
    this.franchiseId = JSON.parse(localStorage.getItem('appUserData')).franchiseId;
    this.storeId = JSON.parse(localStorage.getItem('appUserData')).storeIds;
    console.log('store id', this.storeId);
    localStorage.setItem('selectedStore', this.storeId);
    this.franchiseService.getFranchiseOwner(this.franchiseId).subscribe(data => [
      console.log('franchise data ', data)
    ]);

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
