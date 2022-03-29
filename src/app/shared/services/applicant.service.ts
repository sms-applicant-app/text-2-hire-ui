import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
import {BehaviorSubject, Observable} from "rxjs";
import {Franchisee} from "../models/franchisee";
import {Applicant} from "../models/applicant";
import {OnboardingPackage} from "../models/onboarding-package";
import {map, take} from "rxjs/operators";
import {FirestoreHelperService} from "../firestore-helper.service";

@Injectable({
  providedIn: 'root'
})
export class ApplicantService {
  message: string;
  applicantData: any;
  applicants: any = {};
  dataSub = new BehaviorSubject<any>(this.applicants);
  currentData = this.dataSub.asObservable();
  applicantsByPosition: any;
  positionId: string;
  applicantRef: any;
  constructor(
    public firestore: AngularFirestore, public dbHelper: FirestoreHelperService
  ) {
    this.currentData.subscribe(data => localStorage.setItem('selectedPosition', data));
    this.applicantRef = this.firestore.collection('applicant');
  }

  async createApplicant(applicant: Applicant): Promise<any>{
    const applicantObj = {...applicant};
    console.log('adding applicant',applicant);
    return this.firestore.collection('applicant').add(applicantObj).then(docRef =>{
      const applicantId = docRef.id;
      localStorage.setItem('added-applicant', JSON.stringify(applicantId));
      console.log('add franchise id =', JSON.stringify(applicantId));
    });
  }
  updateApplicant(applicantId, data) {
    console.log('id', applicantId, 'updated user', data);
    this.firestore.doc(`applicant/${applicantId}`).update(data).then(resp => {
      console.log('updated user', resp);
    });
  }
  getApplicantsByStore(storeId){
    return this.firestore.collection('applicant', ref => ref.where(`${storeId}`, '==', storeId)).get()
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
  getApplicantById(docId: string){
    return this.dbHelper.doc$(`applicant/${docId}`).pipe(take(1));

  }
  getApplicantsByFranchise(franchiseId){
    return this.firestore.collection('applicant', ref => ref.where(`${franchiseId}`, '==', franchiseId)).get()
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
 /* getApplicantsByJobId(jobId){
    return this.firestore.collection('applicant', ref => ref.where(`${jobId}`, '==', jobId)).get()
      .subscribe(ss =>{
        if (ss.docs.length === 0){
          this.message = 'Doc not found';
        } else {
          ss.forEach(doc =>{
            this.applicantData = doc.data();
            const applicants ={
              applicant: doc.data()
            };
            return applicants;
          });
        }
      });
  }*/
  getApplicantsByJobId2(id): Observable<any>{
    return this.firestore.collection('jobs').doc(`${id}`).snapshotChanges();
  }
  getApplicantsByJobId(positionId): Observable<any>{
    return this.firestore.collection(`applicant`, ref =>ref.where(`${positionId}`, '==', positionId)).snapshotChanges();
  }
  getApplicantByEmail(email): Observable<any>{
    return this.firestore.collection(`applicant`, ref => ref.where(`${email}`, '==', email)).valueChanges();
  }
  getApplicantsByStatusAndPositionId(status, positionId): Observable<any>{
    return this.firestore.collection('applicant', ref => ref.where(`${status}`, '==', status).where(`${positionId}`, '==', positionId)).valueChanges();
  }
  createApplicantOnboardPacket(packet: OnboardingPackage): Promise <any>{
    const onBoardPacketObj = {...packet};
    return this.firestore.collection('onBoardingPacket').add(`${onBoardPacketObj}`).then(docRef =>{
      const applicantId = docRef.id;
    });
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
