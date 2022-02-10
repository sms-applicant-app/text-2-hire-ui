import { StoreService } from './../../../shared/services/store.service';
import { JobsListComponent } from './../jobs-list/jobs-list.component';
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
import { AlertService } from './../../../shared/services/alert.service';


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
  listStore: any[] = [];
  franchiseData: any;
  dataSource: MatTableDataSource<Store>;
  displayColumns = ['storeName'];
  userId: string;
  userData: any;
  userRole: string;
  seeStores: boolean;
  seePositions: boolean;
  seeApplicants: boolean;
  constructor(public dbHelper: FirestoreHelperService,
              public firestore: AngularFirestore,
              public userService: UserService,
              public router: Router,
              public modalController: ModalController,
              public storeService: StoreService,
              public alertService: AlertService

  ) {

    this.userId = JSON.parse(localStorage.getItem('user')).email;

  }

  ngOnInit() {
    this.listStore= [];
      this.getListOfStoresBasedOnUser();

    this.seeStores = true;
    this.seeApplicants = false;
    this.seePositions = false;
  }
  async getPositionsForStore(storeId, storeName, storeData){
    this.seePositions = true;
    localStorage.setItem('selectedStoreData', JSON.stringify(storeData));
    const getPositionModal = await this.modalController.create({
      component: JobsListComponent,
      swipeToClose: true,
      componentProps: {
        storeId,
        storeName,
      }
    });
    return await getPositionModal.present();
  }
  async getListOfStoresBasedOnUser(){
   await this.firestore.doc(`users/${this.userId}`).get().subscribe(doc =>{
      this.userData = doc.data();
      this.firestore.collection('store', ref => ref.where('franchiseId', '==', this.userData.franchiseId)).get()
        .subscribe(stores =>{
          this.listStore = [];
          if (stores.docs.length === 0){
            console.log('no docs with that franchise', this.franchiseId);
          } else {
            this.listStore = stores.docs.map((store) =>
            {
              const data = store.data() as any;
              return {
                id: store.id,
                ...data
              };
            });
            this.dataSource = new MatTableDataSource<Store>(this.listStore);
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
      this.listStore.unshift(newStore);
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
  deleteStore(storeDelete){
    this.alertService.alertConfirm('store').then((data) => {
      if (data) {
        this.storeService.deleteStore(storeDelete.id).then(() => {
          const index = this.listStore.findIndex(store => store.storeId === storeDelete.storeId);
          this.listStore.splice(index, 1);
          this.alertService.showSuccess(`Delete Success ${storeDelete.storeName}`);
        })
        .catch((err) => {
          this.alertService.showError('Delete Failed');
        });
      }
    });
  }
}
