import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {Store} from '../models/store';


@Injectable({
  providedIn: 'root'
})
export class StoreService {
  constructor(
    public firestore: AngularFirestore
  ) { }
  getStoresByFranchise(id): Observable<any>{
    return this.firestore.doc(`store/${id}`).valueChanges();
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
