import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
import {Observable} from "rxjs";
import {Franchisee} from "../models/franchisee";

@Injectable({
  providedIn: 'root'
})
export class ApplicantService {
  constructor(
    public firestore: AngularFirestore
  ) { }
  getApplicantsByFranchise(id): Observable<any>{
    return this.firestore.doc(`users/${id}`).valueChanges();
  }
  getApplicantsByStore(){
    return this.firestore.collection('franchisee').snapshotChanges();
  }
  createApplicantOnboardPacket(franchise: Franchisee){
    return this.firestore.collection('franchisee').add(`${franchise}`);
  }
  updateApplicant(franchise: Franchisee){
    delete franchise.franchiseId;
    this.firestore.doc(`franchisee/${franchise.franchiseId}`).update(franchise).then(resp =>{
      console.log('updated franchise', resp);
    });
  }
  deleteApplicant(franchiseId){
    this.firestore.doc(`franchisee/${franchiseId}`).delete().then(resp =>{
      console.log('deleting franchise', resp);
    });
  }
}
