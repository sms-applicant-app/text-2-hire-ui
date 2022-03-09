import { InactiveUser } from './../models/inactiveUser';
import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {FirestoreHelperService} from '../firestore-helper.service';
import { AlertService } from './alert.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InactiveUserService {
  constructor(
    public firestore: AngularFirestore,
    public dbHelper: FirestoreHelperService,
    public alertService: AlertService
  ) { }
  async createInactiveUser(inactiveUser: InactiveUser): Promise<any>{
    const inactiveUserObj = {...inactiveUser};
    console.log('adding inactiveUser', inactiveUser);
    return this.firestore.collection('inactiveUsers').add(inactiveUserObj).then(docRef =>{
      const inactiveUserId = docRef.id;
      console.log('add inactiveUser id =', inactiveUserId);
    });
  }
  getInactiveUserById(id){
    return this.dbHelper.doc$(`inactiveUsers/${id}`);
  }
  getInactiveUsers(){
    return this.firestore.collection('inactiveUsers').snapshotChanges().pipe(
      map(docs => {
        const test = docs.map(a => a.payload.doc.data());
        console.log('test', test);
      }
    ));
  }
  deleteInactiveUser(id){
    this.firestore.doc(`inactiveUsers/${id}`).delete().then(resp =>{
      console.log('deleting inactiveUsers', resp);
    });
  }
}
