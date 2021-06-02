import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
import {Observable} from "rxjs";
import {Franchisee} from "../models/franchisee";

@Injectable({
  providedIn: 'root'
})
export class FranchiseService {

  constructor(
    public firestore: AngularFirestore
  ) { }
  getFranchiseOwner(id): Observable<any>{
    return this.firestore.doc(`users/${id}`).valueChanges();
  }
  getFranchiseById(id): Observable<any>{
    return this.firestore.doc(`franchisee/${id}`).valueChanges();
  }
 async createFranchise(franchise: Franchisee): Promise<any>{
    const franchiseObj = {...franchise};
    console.log('adding franchise',franchise);
    return this.firestore.collection('franchisee').add(franchiseObj).then(docRef =>{
        const franchiseId = docRef.id
      localStorage.setItem('franchisee', JSON.stringify(franchiseId));
        console.log('add franchise id =', franchiseId)
    })
  }
  getFranchises(){
    return this.firestore.collection('franchisee').snapshotChanges();
  }
  updateFranchise(franchiseId, data): Promise<any>{
    return this.firestore.collection('franchisee').doc(`${franchiseId}`).set({data}, {merge: true})
  }
  deleteFranchise(franchiseId){
    this.firestore.doc(`franchisee/${franchiseId}`).delete().then(resp =>{
      console.log('deleting franchise', resp);
    });
  }
}
