import { Injectable } from '@angular/core';
import {FirestoreHelperService} from "../firestore-helper.service";
import {AngularFirestore} from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class JobService {
  message: string;
  storeData: any;
  constructor(public firestore: AngularFirestore) { }
  getJobsByStore(franchiseId){
    return this.firestore.collection('store', ref => ref.where(`${franchiseId}`, '==', franchiseId)).get()
      .subscribe(ss => {
        if (ss.docs.length === 0) {
          this.message = 'Document not found! Try again!';
        } else {
          ss.docs.forEach(doc => {
            this.message = '';
            this.storeData = doc.data();
          });
        }
      });
  }
}
