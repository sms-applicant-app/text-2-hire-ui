import { Role } from './../models/role';
import { take } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {FirestoreHelperService} from "../firestore-helper.service";
import {AngularFirestore} from "@angular/fire/firestore";
import {User} from "../models/user";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: User;
  message: string;
  userData: any;
  constructor(
    public dbHelper: FirestoreHelperService,
    public firestore: AngularFirestore
  ) {
  }

  getUserById(id): Observable<any> {
    console.log(id);
    return this.firestore.doc(`users/${id}`).valueChanges().pipe(take(1));
  }
  getUsersByFranchise(franchiseId){
    return this.firestore.collection('user', ref => ref.where(`${franchiseId}`, '==', franchiseId )).get()
      .subscribe(ss => {
        if (ss.docs.length === 0) {
          this.message = 'Document not found! Try again!';
        } else {
          ss.docs.forEach(doc => {
            this.message = '';
            this.userData = doc.data();
            console.log('users from store', this.userData);
          });
        }
      });
  }

  getFranchiseUserByFranchiseId(franchiseId){
    return this.firestore.collection('users', ref => ref.where('franchiseId', '==', franchiseId )
    .where('role', '==', Role.franchisee )).get().pipe(take(1));
  }

  getUserByStore(storeId){
    return this.firestore.collection('user', ref => ref.where(`${storeId}`, '==', storeId)).get()
      .subscribe(ss => {
        if (ss.docs.length === 0) {
          this.message = 'Document not found! Try again!';
        } else {
          ss.docs.forEach(doc => {
            this.message = '';
            this.userData = doc.data();
            console.log('store data from service', this.userData);
          });
        }
      });
  }

  // currently user is created in the component
  /*  createUser(franchise: Franchisee){
      return this.firestore.collection('franchisee').add(`${franchise}`);
    }*/
  getUsers() {
    return this.firestore.collection('users').snapshotChanges();
  }

  updateUser(userId, data) {
    this.firestore.doc(`users/${userId}`).update(data).then(resp => {
      console.log('updated user', resp);
    });
  }

  deleteUser(userId) {
    this.firestore.doc(`users/${userId}`).delete().then(resp => {
      console.log('deleting user', resp);
    });
  }
  deleteUsersByFranchiseId(franchiseId){
    this.firestore.collection('users', ref => ref.where('franchiseId', '==', franchiseId)).get()
      .subscribe(ss => {
        if (ss.docs.length === 0) {
          console.log('Document not found! Try again!');
        } else {
          ss.docs.forEach(doc => {
            this.message = '';
            doc.ref.delete().then().catch(err => {
              console.log('err', err);
            });
          });
        }
      });
  }

}
