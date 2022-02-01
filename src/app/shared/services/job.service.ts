import { Injectable } from '@angular/core';
import {FirestoreHelperService} from "../firestore-helper.service";
import {AngularFirestore} from "@angular/fire/firestore";
import {JobPosting} from "../models/job-posting";
import {BehaviorSubject, Observable} from "rxjs";
import { AlertService } from './alert.service';
import { toastMess } from '../constants/messages';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  message: string;
  storeData: any;
  jobsData: any;
  stores: any = {};
  dataSub = new BehaviorSubject<any>(this.stores);
  currentData = this.dataSub.asObservable();
  constructor(public firestore: AngularFirestore, public alertService: AlertService) {
    this.currentData.subscribe(data => localStorage.setItem('selectedStore', data));
  }
  storeSelection(newStore: any){
    const store = this.dataSub.next(newStore);
    console.log('store selection in service', newStore);
    return this.getJobsByStore(newStore);
  }
  //TODO verify safe delete
 /* getPositionsForSelectedStore(): Observable<any>{
    let storeId = localStorage.getItem('selectedStore');
    storeId = (storeId);
    this.dataSub.next(storeId);
    this.jobsData = this.getJobsByStore(storeId);
    return this.jobsData;
  }*/
  getJobsByStore(storeId){
    return this.firestore.collection('jobs', ref => ref.where('storeId', '==', storeId)).get()
      .subscribe(ss => {
        if (ss.docs.length === 0) {
          this.message = 'Document not found! Try again!';
        } else {
          ss.docs.forEach(doc => {
            this.message = '';
            this.jobsData = doc.data();
          });
        }
      });
  }
  async addJobRec(job: JobPosting): Promise<any>{
    const jobObj = {...job};
    return this.firestore.collection('jobs').add(jobObj).then(docRef =>{
      const jobId = docRef.id;
      console.log('job added', jobId);
      this.alertService.showSuccess(toastMess.CREATE_SUCCESS);
    }).catch((err) => {
      this.alertService.showError(toastMess.CREATE_FAILED);
    });
  }
}
