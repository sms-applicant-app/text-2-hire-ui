import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {Store} from '../models/store';
import {FranchisePageRoutingModule} from "../../franchise/franchise-routing.module";
import {FranchiseService} from "./franchise.service";
import {GeneratedStoreId} from "../models/generatedStoreId";
import {convertActionBinding} from "@angular/compiler/src/compiler_util/expression_converter";
import {map} from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class StoreService {
  message: string;
  storeData: any;
  generatedStoreIdRef: AngularFirestoreCollection<GeneratedStoreId>;
  lastGeneratedId: any;
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
  async addGeneratedStoreId(storeId: GeneratedStoreId): Promise<any>{
    const idObj = {...storeId};
    return this.firestore.collection('storeIds').add(idObj).then(docRef =>{
      const returnId = docRef.id;

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
  getLastGeneratedStoreId(){
    this.generatedStoreIdRef = this.firestore.collection<GeneratedStoreId>('storeIds', ref => ref.orderBy('date', 'desc').limit(1));
    this.lastGeneratedId = this.generatedStoreIdRef.snapshotChanges().pipe(map(actions => {
      return actions.map(a =>{
        const data = a.payload.doc.data () as GeneratedStoreId;
        const docId = a.payload.doc.id;
        console.log('store id returned from DB', {docId, ...data});
        return { docId, ...data };
      });
    }));
  }
  deleteStore(franchiseId){
    this.firestore.doc(`store/${franchiseId}`).delete().then(resp =>{
      console.log('deleting store', resp);
    });
  }
}
