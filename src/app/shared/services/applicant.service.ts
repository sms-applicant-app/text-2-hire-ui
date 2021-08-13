import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
import {Observable} from "rxjs";
import {Franchisee} from "../models/franchisee";
import {Applicant} from "../models/applicant";

@Injectable({
  providedIn: 'root'
})
export class ApplicantService {
  message: string;
  applicantData: any;
  constructor(
    public firestore: AngularFirestore
  ) { }

  async createApplicant(applicant: Applicant): Promise<any>{
    const applicantObj = {...applicant};
    console.log('adding applicant',applicant);
    return this.firestore.collection('applicant').add(applicantObj).then(docRef =>{
      const applicantId = docRef.id;
      localStorage.setItem('added-franchisee', JSON.stringify(applicantId));
      console.log('add franchise id =', applicantId);
    });
  }
  getApplicantsByStore(storeId){
    return this.firestore.collection('applicants', ref => ref.where(`${storeId}`, '==', storeId)).get()
      .subscribe(ss => {
        if (ss.docs.length === 0) {
          this.message = 'Document not found! Try again!';
        } else {
          ss.docs.forEach(doc => {
            this.message = '';
            this.applicantData = doc.data();
          });
        }
      });
  }
  getApplicantsByFranchise(franchiseId){
    return this.firestore.collection('applicants', ref => ref.where(`${franchiseId}`, '==', franchiseId)).get()
      .subscribe(ss => {
        if (ss.docs.length === 0) {
          this.message = 'Document not found! Try again!';
        } else {
          ss.docs.forEach(doc => {
            this.message = '';
            this.applicantData = doc.data();
          });
        }
      });
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
