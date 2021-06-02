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
  updateStore(franchise: Franchisee){
    delete franchise.franchiseId;
    this.firestore.doc(`franchisee/${franchise.franchiseId}`).update(franchise).then(resp =>{
      console.log('updated franchise', resp);
    });
  }
  deleteStore(franchiseId){
    this.firestore.doc(`franchisee/${franchiseId}`).delete().then(resp =>{
      console.log('deleting franchise', resp);
    });
  }
}
