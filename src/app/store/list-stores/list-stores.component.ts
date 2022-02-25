import {Component, Input, OnInit} from '@angular/core';
import {StoreService} from "../../shared/services/store.service";

@Component({
  selector: 'app-list-stores',
  templateUrl: './list-stores.component.html',
  styleUrls: ['./list-stores.component.scss'],
})
export class ListStoresComponent implements OnInit {
  @Input()franchiseId: string;

  storesData: any;
  userData: any;

  constructor(public storeService: StoreService) { }

  ngOnInit() {
    console.log('incoming franchise id', this.franchiseId);
   // this.franchiseId = JSON.parse(localStorage.getItem('appUserData')).franchiseId;
    this.getAllStoresByFranchiseId();
  }

  getAllStoresByFranchiseId(){
    this.storesData = this.storeService.getStoresByFranchise(this.franchiseId);
  }
  //TODO future feature a FO can click his hiring manager and see what stores he is over and monitor performance metrics
  getStoresByHiringManager(){
    const userId = JSON.parse(localStorage.getItem('user')).uid;
    this.storesData = this.storeService.getStoresByHiringManger(userId);
  }
}
