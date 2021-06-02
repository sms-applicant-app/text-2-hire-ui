import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
import {Observable} from "rxjs";
import {Franchisee} from "../models/franchisee";

@Injectable({
  providedIn: 'root'
})
export class PositionService {
  constructor(
    public firestore: AngularFirestore
  ) { }
  getPositionById(id): Observable<any>{
    return this.firestore.doc(`users/${id}`).valueChanges();
  }
  createPosition(franchise: Franchisee){
    return this.firestore.collection('franchisee').add(`${franchise}`);
  }
  getPotions(){
    return this.firestore.collection('franchisee').snapshotChanges();
  }
  updatePosition(franchise: Franchisee){
    delete franchise.franchiseId;
    this.firestore.doc(`franchisee/${franchise.franchiseId}`).update(franchise).then(resp =>{
      console.log('updated franchise', resp);
    });
  }
  deletePosition(franchiseId){
    this.firestore.doc(`franchisee/${franchiseId}`).delete().then(resp =>{
      console.log('deleting franchise', resp);
    });
  }
}

