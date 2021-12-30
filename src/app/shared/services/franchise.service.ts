import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
import {Observable} from "rxjs";
import {Franchisee} from "../models/franchisee";
import {FirestoreHelperService} from "../firestore-helper.service";
import {Store} from "../models/store";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class FranchiseService {
  message: string;
  storeData: any;
  constructor(
    public firestore: AngularFirestore, public dbHelper: FirestoreHelperService
  ) { }
  getFranchiseOwner(id): Observable<any>{
    return this.firestore.doc(`users/${id}`).valueChanges();
  }
  getStoreByFranchiseById(franchiseId: string){
   return this.firestore.collection('store', ref => ref.where(`${franchiseId}`, '==', franchiseId)).get()
     .subscribe(ss =>{
       if(ss.docs.length === 0){
         this.message = " no stores with franchise id";
       } else {
         ss.docs.forEach(doc =>{
           this.storeData = doc.data();
           console.log(this.storeData);
         });
       }
     });
  }
  getFranchiseById(id){
    return this.dbHelper.doc$(`franchisee/${id}`).subscribe(data =>{
      console.log('returned from franchise', data);
    });
  }
 async createFranchise(franchise: Franchisee): Promise<any>{
    const franchiseObj = {...franchise};
    console.log('adding franchise',franchise);
    return this.firestore.collection('franchisee').add(franchiseObj).then(docRef =>{
        const franchiseId = docRef.id;
      localStorage.setItem('added-franchisee', JSON.stringify(franchiseId));
        console.log('add franchise id =', franchiseId);
    });
  }
  getFranchises(){
    return this.firestore.collection('franchisee').snapshotChanges();
  }
  findFranchisesStores(franchiseId: string, filter = '', sortOrder ='asc',
                 pageNumber = 0, pageSize = 3): Observable<Franchisee[]>{
    return
  }

  getAllFranchisesWithDbHelper(): Observable<any>{
  return this.dbHelper.collectionWithIds$('franchisee');
  }
  updateFranchise(franchiseId, data): Promise<any>{
    return this.firestore.collection('franchisee').doc(`${franchiseId}`).set({data}, {merge: true});
  }
  deleteFranchise(franchiseId){
    this.firestore.doc(`franchisee/${franchiseId}`).delete().then(resp =>{
      console.log('deleting franchise', resp);
    });
  }
}
