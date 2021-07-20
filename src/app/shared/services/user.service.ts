import { Injectable } from '@angular/core';
import {FirestoreHelperService} from "../firestore-helper.service";
import {AngularFirestore} from "@angular/fire/firestore";
import {User} from "../models/user";
import {Observable} from "rxjs";
import {Franchisee} from "../models/franchisee";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: User;

  constructor(
    public dbHelper: FirestoreHelperService,
    public firestore: AngularFirestore
  ) {
  }

  getUserById(id): Observable<any> {
    console.log(id);
    return this.firestore.doc(`users/${id}`).valueChanges();
  }

  getUserByFranchise(id): Observable<any> {
    return this.firestore.doc(`users/${id}`).valueChanges();
  }

  getUserByStore(id): Observable<any> {
    return this.firestore.doc(`users/${id}`).valueChanges();
  }

  // currently user is created in the component
  /*  createUser(franchise: Franchisee){
      return this.firestore.collection('franchisee').add(`${franchise}`);
    }*/
  getUsers() {
    return this.firestore.collection('franchisee').snapshotChanges();
  }

  updateUser(userId, data) {
    this.firestore.doc(`user/${userId}`).update(data).then(resp => {
      console.log('updated franchise', resp);
    });
  }

  deleteUser(franchiseId) {
    this.firestore.doc(`franchisee/${franchiseId}`).delete().then(resp => {
      console.log('deleting franchise', resp);
    });
  }


}
