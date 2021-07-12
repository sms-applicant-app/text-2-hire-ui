import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {FirestoreHelperService} from '../../../shared/firestore-helper.service';
import {Store} from '../../../shared/models/store';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {AngularFirestore} from '@angular/fire/firestore';

@Component({
  selector: 'app-store-list',
  templateUrl: './store-list.component.html',
  styleUrls: ['./store-list.component.scss'],
})
export class StoreListComponent implements OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('input',  {static: true}) filter: ElementRef;
  @Input() stores: Store[];
  @Input() franchiseId: string;
  storeData: any;
  store: any[] = [];
  dataSource: MatTableDataSource<Store>;
  displayColumns = ['storeId', 'storeName', 'storePhoneNumber', 'hiringManager', 'actions'];
  constructor(public dbHelper: FirestoreHelperService, public firestore: AngularFirestore) {
   // @ts-ignore
    this.storeData = this.firestore.collection('store', (ref) =>{
      ref.where('franchiseId','==',`${this.franchiseId}`);
    });
    /*this.dbHelper.collectionWithIds$('store').subscribe(data => {
      this.storeData = data;
      this.dataSource = new MatTableDataSource<Store>(this.storeData);
      setTimeout(() =>{
        this.dataSource.paginator = this.paginator;
      }, 0);
    });*/
  }

  ngOnInit() {
    console.log('store data for list', this.storeData);
  }
  getFranchisee(franchiseId){
    this.store = [];
    this.dbHelper.collectionWithIds$(`store/${franchiseId}`).subscribe((data: []) => {
      console.log(data);
      this.store = data;
    });
  }
}
