import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
import {Observable} from "rxjs";
import {Address} from "../models/address";
import {FirestoreHelperService} from "../firestore-helper.service";
@Injectable({
  providedIn: 'root'
})
export class AddressService {
  constructor(
    public firestore: AngularFirestore,
    public dbHelper: FirestoreHelperService
  ) { }
  getAddress(id): Observable<any>{
    return this.firestore.doc(`addresses/${id}`).valueChanges();
  }
  async createAddress(address: Address): Promise<any>{
    const addressObj = {...address};
    console.log('adding franchise', address);
    return this.firestore.collection('addresses').add(addressObj).then(docRef =>{
      const addressDocId = docRef.id;
        console.log('add addressDocId', addressDocId);
    });
  }
  getAddresses(){
    return this.firestore.collection('addresses').snapshotChanges();
  }
  updateAddress(addressId, data): Promise<any>{
    return this.firestore.collection('addresses').doc(`${addressId}`).set(data, {merge: true});
  }
  deleteAddress(id){
    this.firestore.doc(`addresses/${id}`).delete().then(resp =>{
      console.log('deleting addresses', resp);
    });
  }
}
