import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {FirestoreHelperService} from '../../../shared/firestore-helper.service';
import {Store} from '../../../shared/models/store';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {AngularFirestore} from '@angular/fire/firestore';
import {UserService} from '../../../shared/services/user.service';
import {Router} from '@angular/router';
import {AddJobReqComponent} from '../add-job-req/add-job-req.component';
import {ModalController} from '@ionic/angular';
import * as uuid from 'uuid';
import {AddStoreComponent} from "../add-store/add-store.component";
import { Subject } from 'rxjs';


@Component({
  selector: 'app-store-list-by-franchise',
  templateUrl: './store-list-by-franchise.component.html',
  styleUrls: ['./store-list-by-franchise.component.scss'],
})
export class StoreListByFranchiseComponent implements OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('input',  {static: true}) filter: ElementRef;
  @Input() franchiseId: string;
  @Input() stores: Store[];

  testString: string;
  storeData: any = [];
  store: any[] = [];
  franchiseData: any;
  dataSource: MatTableDataSource<Store>;
  displayColumns = ['storeName'];
  userId: string;
  userData: any;
  userRole: string;
  seeStores: boolean;
  seePositions: boolean;
  seeApplicants: boolean;
  storeId: string;
  constructor(public dbHelper: FirestoreHelperService,
              public firestore: AngularFirestore,
              public userService: UserService,
              public router: Router,
              public modalController: ModalController
  ) {

    this.userId = JSON.parse(localStorage.getItem('user')).email;

  }

  ngOnInit() {
    console.log('need to add when selecting franchise to bring up stores for that franchise on admin', this.franchiseId);
    this.store= [];
      this.getListOfStoresBasedOnUser();

    this.seeStores = true;
    this.seeApplicants = false;
    this.seePositions = false;
  }
  getPositionsForStore(storeId){
    console.log('this store id', storeId);
    this.storeId = storeId;
    this.seeStores = false;
    this.seePositions = true;
  }
 /* getListOfStoresByFranchise(){
    this.firestore.collection('store', ref => ref.where('franchiseId', '==', this.franchiseIdFromList)).get()
      .subscribe(stores =>{
        this.store = [];
        if (stores.docs.length === 0){
          console.log('no docs with that franchise', this.franchiseId);
        } else {
          stores.forEach(data =>{
            const s = data.data();
            this.storeData = data.data();
            this.store.push(s);
            console.log(this.store, 'stores' );
            this.dataSource = new MatTableDataSource<Store>(this.store);
            console.log(this.store.length, 'length', this.store);
          });
        }
      });
  }*/
  async getListOfStoresBasedOnUser(){
   await this.firestore.doc(`users/${this.userId}`).get().subscribe(doc =>{
      this.userData = doc.data();
      this.firestore.collection('store', ref => ref.where('franchiseId', '==', this.userData.franchiseId)).get()
        .subscribe(stores =>{
          this.store = [];
          if (stores.docs.length === 0){
            console.log('no docs with that franchise', this.franchiseId);
          } else {
            this.store = stores.docs.map((data) => data.data());
            this.dataSource = new MatTableDataSource<Store>(this.stores);
          }
        });
    });
  }
  getFranchisee(franchiseId){
    this.dbHelper.collectionWithIds$(`franchisee/${franchiseId}`).subscribe((data: []) => {
      console.log('franchise',data);
      this.franchiseData = data;
    });

  }
  async addStore(){
    const franchiseId = this.franchiseId;
    const onStoreAddedSub = new Subject<Store>();
    const addStoreModel = await this.modalController.create({
      component: AddStoreComponent,
      swipeToClose: true,
      componentProps: {
        franchiseId,
        onStoreAddedSub
      }
    });

    onStoreAddedSub.subscribe((newStore: Store) => {
      this.store.unshift(newStore);
    });

    addStoreModel.onDidDismiss().then(data => {
      onStoreAddedSub.unsubscribe();
    });

    return await addStoreModel.present();
  }

  getStoreDetails(id){
    console.log('store details', id);
    this.router.navigate([`franchise/store-details/${id}`]);
  }

  /**
   * Delete function not working TODO look at docs and figure out delete
   * Get 3 digit store id from the storeId field and query the storeIds collection which has the firebase generated UID then pass that into doc.. Should work
   * @param id
   */
  deleteStore(id){
    this.firestore.collection('store').doc(`${id}`).delete();
  }

}
