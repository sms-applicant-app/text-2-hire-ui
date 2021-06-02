import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
import {Observable} from "rxjs";
import {Franchisee} from "../models/franchisee";

@Injectable({
  providedIn: 'root'
})
export class ListingService {
  constructor(
    public firestore: AngularFirestore
  ) { }
  getListingById(id): Observable<any>{
    return this.firestore.doc(`users/${id}`).valueChanges();
  }
  createJobListing(franchise: Franchisee){
    return this.firestore.collection('franchisee').add(`${franchise}`);
  }
  getListings(){
    return this.firestore.collection('franchisee').snapshotChanges();
  }
  updateListing(franchise: Franchisee){
    delete franchise.franchiseId;
    this.firestore.doc(`franchisee/${franchise.franchiseId}`).update(franchise).then(resp =>{
      console.log('updated franchise', resp);
    });
  }
  deleteListing(franchiseId){
    this.firestore.doc(`franchisee/${franchiseId}`).delete().then(resp =>{
      console.log('deleting franchise', resp);
    });
  }
}
