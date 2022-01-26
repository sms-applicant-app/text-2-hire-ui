import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Store} from '../../../shared/models/store';
import {AngularFirestore} from '@angular/fire/firestore';
import {JobService} from '../../../shared/services/job.service';
import {JobPosting} from '../../../shared/models/job-posting';

@Component({
  selector: 'app-stores-by-hiring-manager',
  templateUrl: './stores-by-hiring-manager.component.html',
  styleUrls: ['./stores-by-hiring-manager.component.scss'],
})
export class StoresByHiringManagerComponent implements OnInit, OnChanges {
  @Input('storeManagerId') storeManagerId;
  stores: any[] = [];
  positions: any = [];
  dataSource: MatTableDataSource<Store>;
  positionsDataSource: MatTableDataSource<JobPosting>;
  displayColumns = ['storeName'];
  constructor(public firestore: AngularFirestore, public jobService: JobService) { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.getStoresByHiringManger(this.storeManagerId);
  }

  getStoresByHiringManger(storeHiringManager){
    this.firestore.collection('store', ref => ref.where('storeHiringManager', '==', `${storeHiringManager}`)).get()
      .subscribe(store =>{
        this.stores = [];
        if(store.docs.length === 0){
          console.log('no docs with that hiring manager', storeHiringManager);
        } else {
          this.stores = store.docs.map((data) => data.data());
          this.dataSource = new MatTableDataSource<Store>(this.stores);
        }
      });
  }
  getOpenPositionsByStore(id){
    // todo add get only open positions
    console.log('selected store to get positions for', id);
    localStorage.setItem('selectedStore', JSON.stringify(id));
    this.jobService.storeSelection(id);
    this.firestore.collection('jobs', ref => ref.where('storeId', '==', id)).get()
      .subscribe(ss =>{
        this.positions = [];
        if(ss.docs.length === 0){
          return 'no positions for store';
        } else {
          ss.forEach(data =>{
            const j = data.data();
            this.positions.push(j);
            this.positionsDataSource = new MatTableDataSource<JobPosting>(this.positions);
          });
        }
      });
  }
}
