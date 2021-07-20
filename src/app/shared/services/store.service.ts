import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {Store} from '../models/store';
import {FranchisePageRoutingModule} from "../../franchise/franchise-routing.module";
import {FranchiseService} from "./franchise.service";


@Injectable({
  providedIn: 'root'
})
export class StoreService {
  message: string;
  storeData: any;
  constructor(
    public firestore: AngularFirestore, public franchiseService: FranchiseService
  ) { }
  getStoresByFranchise(franchiseId){
    return this.firestore.collection('store', ref => ref.where(`${franchiseId}`, '==', franchiseId)).get()
      .subscribe(ss => {
        if (ss.docs.length === 0) {
          this.message = 'Document not found! Try again!';
        } else {
          ss.docs.forEach(doc => {
            this.message = '';
            this.storeData = doc.data();
          });
        }
      });
  }
  async createStore(store: Store): Promise<any>{
    const storeObj = {...store};
    console.log('adding store', store);
    return this.firestore.collection('store').add(storeObj).then(docRef =>{
      const storeId = docRef.id;

      localStorage.setItem('added-storeId', JSON.stringify(storeId));
      console.log('add store id =', storeId);
    });
  }
  getStores(){
    return this.firestore.collection('store').snapshotChanges();
  }
  updateStore(storeId, data): Promise<any>{
    return this.firestore.collection('store').doc(`${storeId}`).set({data}, {merge: true});
  }
  findStores(storeId: string, filter = '', sortOrder ='asc',
                       pageNumber = 0, pageSize = 3): Observable<Store[]>{
    return
  }
  deleteStore(franchiseId){
    this.firestore.doc(`store/${franchiseId}`).delete().then(resp =>{
      console.log('deleting store', resp);
    });
  }
}
