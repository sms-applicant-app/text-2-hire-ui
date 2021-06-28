import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
import {Observable} from "rxjs";
import {Franchisee} from "../models/franchisee";

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  constructor(
    public firestore: AngularFirestore
  ) { }
  getStoresByFranchise(id): Observable<any>{
    return this.firestore.doc(`users/${id}`).valueChanges();
  }
  createStore(franchise: Franchisee){
    return this.firestore.collection('franchisee').add(`${franchise}`);
  }
  getStores(){
    return this.firestore.collection('franchisee').snapshotChanges();
  }
  updateStore(franchiseId, data): Promise<any>{
    return this.firestore.collection('franchisee').doc(`${franchiseId}`).set({data}, {merge: true})
  }
  findStores(storeId: string, filter = '', sortOrder ='asc',
                       pageNumber = 0, pageSize = 3): Observable<Franchisee[]>{
    return
  }
  deleteStore(franchiseId){
    this.firestore.doc(`franchisee/${franchiseId}`).delete().then(resp =>{
      console.log('deleting franchise', resp);
    });
  }
}
