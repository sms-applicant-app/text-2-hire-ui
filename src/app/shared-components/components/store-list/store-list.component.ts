import {Component, Input, OnInit} from '@angular/core';
import {Franchisee} from "../../../shared/models/franchisee";
import {FirestoreHelperService} from "../../../shared/firestore-helper.service";
import {Store} from "../../../shared/models/store";

@Component({
  selector: 'app-store-list',
  templateUrl: './store-list.component.html',
  styleUrls: ['./store-list.component.scss'],
})
export class StoreListComponent implements OnInit {
  @Input() franchise: Franchisee
  store: any[] = []

  constructor(public dbHelper: FirestoreHelperService ) { }

  ngOnInit() {}
  getFranchisee(franchiseId){
    this.store = []
    this.dbHelper.collectionWithIds$(`store/${franchiseId}`).subscribe((data:[]) => {
      console.log(data)
      this.store = data;
    });
  }
}
