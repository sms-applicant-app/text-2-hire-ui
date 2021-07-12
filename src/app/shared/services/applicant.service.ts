import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
import {Observable} from "rxjs";
import {Franchisee} from "../models/franchisee";
import {Applicant} from "../models/applicant";

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
  getApplicantsByStore(storeId){
    return this.firestore.collection('applicants').snapshotChanges();
  }
  createApplicantOnboardPacket(applicant: Applicant){
    return this.firestore.collection('applicant').add(`${applicant}`);
  }
  /*updateApplicant(applicant: Applicant){
    delete franchise.franchiseId;
    this.firestore.doc(`applicant/${id}`).update(applicant).then(resp =>{
      console.log('updated franchise', resp);
    });
  }*/
  deleteApplicant(applicantId){
    this.firestore.doc(`franchisee/${applicantId}`).delete().then(resp =>{
      console.log('deleting franchise', resp);
    });
  }
}
