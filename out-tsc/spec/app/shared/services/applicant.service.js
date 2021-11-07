import { __awaiter, __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
let ApplicantService = class ApplicantService {
    constructor(firestore) {
        this.firestore = firestore;
        this.applicants = {};
        this.dataSub = new BehaviorSubject(this.applicants);
        this.currentData = this.dataSub.asObservable();
        this.currentData.subscribe(data => localStorage.setItem('selectedPosition', data));
    }
    createApplicant(applicant) {
        return __awaiter(this, void 0, void 0, function* () {
            const applicantObj = Object.assign({}, applicant);
            console.log('adding applicant', applicant);
            return this.firestore.collection('applicant').add(applicantObj).then(docRef => {
                const applicantId = docRef.id;
                localStorage.setItem('added-applicant', JSON.stringify(applicantId));
                console.log('add franchise id =', JSON.stringify(applicantId));
            });
        });
    }
    updateApplicant(applicantId, data) {
        this.firestore.doc(`applicant/${applicantId}`).update(data).then(resp => {
            console.log('updated user', resp);
        });
    }
    getApplicantsByStore(storeId) {
        return this.firestore.collection('applicant', ref => ref.where(`${storeId}`, '==', storeId)).get()
            .subscribe(ss => {
            if (ss.docs.length === 0) {
                this.message = 'Document not found! Try again!';
            }
            else {
                ss.docs.forEach(doc => {
                    this.message = '';
                    this.applicantData = doc.data();
                });
            }
        });
    }
    getApplicantsByFranchise(franchiseId) {
        return this.firestore.collection('applicant', ref => ref.where(`${franchiseId}`, '==', franchiseId)).get()
            .subscribe(ss => {
            if (ss.docs.length === 0) {
                this.message = 'Document not found! Try again!';
            }
            else {
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
    getApplicantsByJobId2(id) {
        return this.firestore.collection('jobs').doc(`${id}`).snapshotChanges();
    }
    getApplicantsByJobId(positionId) {
        return this.firestore.collection(`applicant`, ref => ref.where(`${positionId}`, '==', positionId)).valueChanges();
    }
    getApplicantByEmail(email) {
        return this.firestore.collection(`applicant`, ref => ref.where(`${email}`, '==', email)).valueChanges();
    }
    getApplicantsByStatusAndPositionId(status, positionId) {
        return this.firestore.collection('applicant', ref => ref.where(`${status}`, '==', status).where(`${positionId}`, '==', positionId)).valueChanges();
    }
    createApplicantOnboardPacket(packet) {
        const onBoardPacketObj = Object.assign({}, packet);
        return this.firestore.collection('onBoardingPacket').add(`${onBoardPacketObj}`).then(docRef => {
            const applicantId = docRef.id;
        });
    }
    /*updateApplicant(applicant: Applicant){
      delete franchise.franchiseId;
      this.firestore.doc(`applicant/${id}`).update(applicant).then(resp =>{
        console.log('updated franchise', resp);
      });
    }*/
    deleteApplicant(applicantId) {
        this.firestore.doc(`franchisee/${applicantId}`).delete().then(resp => {
            console.log('deleting franchise', resp);
        });
    }
};
ApplicantService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], ApplicantService);
export { ApplicantService };
//# sourceMappingURL=applicant.service.js.map