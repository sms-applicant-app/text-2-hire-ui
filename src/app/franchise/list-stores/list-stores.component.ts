import {Component, Input, OnInit} from '@angular/core';
import {StoreService} from "../../shared/services/store.service";

@Component({
  selector: 'app-list-stores',
  templateUrl: './list-stores.component.html',
  styleUrls: ['./list-stores.component.scss'],
})
export class ListStoresComponent implements OnInit {
  @Input()franchiseIdFromList: string;
 franchisedId: string;
 storesData: any;

  constructor(public storeService: StoreService) { }

  ngOnInit() {
    this.franchisedId = JSON.parse(localStorage.getItem('user')).franchiseId;
    this.getAllStoresByFranchiseId();
  }


  getAllStoresByFranchiseId(){
    this.storesData = this.storeService.getStoresByFranchise(this.franchisedId);
    console.log(this.storesData);
  }
}
