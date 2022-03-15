import { AlertService } from './alert.service';
import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {Store} from '../models/store';
import {FranchiseService} from './franchise.service';
import {GeneratedStoreId} from '../models/generatedStoreId';
import {AngularFireObject} from "@angular/fire/database";
import { toastMess } from '../constants/messages';



@Injectable({
  providedIn: 'root'
})
export class StoreService {
  message: string;
  storeData: any;
  generatedStoreIdRef: AngularFirestoreCollection<GeneratedStoreId>;
  lastGeneratedId: any;
  storeIdRef: AngularFireObject<any>;
  constructor(
    public firestore: AngularFirestore,
    public franchiseService: FranchiseService,
    public alertService: AlertService
  ) { }
  getStoresByFranchise(franchiseId){
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
  getStoresByHiringManger(storeHiringManager){
    return this.firestore.collection('store', ref => ref.where(`${storeHiringManager}`, '==', storeHiringManager)).get()
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
  async createStore(store: Store): Promise<any>{
    const storeObj = {...store};
    return this.firestore.collection('store').add(storeObj).then(docRef =>{
      const storeId = docRef.id;
      localStorage.setItem('added-storeId', JSON.stringify(storeId));
      this.alertService.showSuccess(toastMess.CREATE_SUCCESS);
      return docRef.id;
    }).catch((err) => {
      this.alertService.showError(toastMess.CREATE_FAILED);
    });
  }
  async addGeneratedStoreId(storeId: GeneratedStoreId): Promise<any>{
    const idObj = {...storeId};
    return this.firestore.collection('storeIds').add(idObj).then(docRef =>{
      const returnId = docRef.id;
    });
  }
  getStoreByGeneratedStoreId(storeId){
    return this.firestore.collection('store', ref => ref.where('storeId', '==', storeId)).valueChanges();
  }

  getStores(){
    return this.firestore.collection('store').snapshotChanges();
  }
  updateStore(storeId, data): Promise<any>{
    return this.firestore.collection('store').doc(`${storeId}`).set({data}, {merge: true});
  }
  findStores(storeId: string, filter = '', sortOrder ='asc',
                       pageNumber = 0, pageSize = 3): Observable<Store[]>{
    return
  }
  getLastGeneratedStoreId(){
    return this.firestore.collection('storeIds', ref => ref.orderBy('createdAt', 'desc').limit(1)).get()
      .subscribe(ss =>{
        ss.docs.forEach(doc =>{
          this.lastGeneratedId = doc.data();
          console.log('retrieving last used store Id', this.lastGeneratedId, 'doc data =',doc.data());

        });
      });

   /* this.lastGeneratedId = this.generatedStoreIdRef.snapshotChanges().pipe(map(actions => {
      return actions.map(a =>{
        const data = a.payload.doc.data () as GeneratedStoreId;
        const docId = a.payload.doc.id;
        console.log('store id returned from DB', {docId, ...data});
        return { docId, ...data };
      });
    }));*/
  }
  lastGeneratedStoreId(): Observable<any>{
    this.lastGeneratedId = this.getLastGeneratedStoreId();
    return this.lastGeneratedId;
  }
  deleteStore(id){
    return this.firestore.doc(`store/${id}`).delete().then(resp =>{
      console.log('deleting store', resp);
    });
  }
  deleteStoresByFranchiseId(franchiseId){
    this.firestore.collection('store', ref => ref.where('franchiseId', '==', franchiseId)).get()
      .subscribe(ss => {
        if (ss.docs.length === 0) {
          console.log('Document not found! Try again!');
        } else {
          ss.docs.forEach(doc => {
            doc.ref.delete().then().catch(err => {
              console.log('err', err);
            });
          });
        }
      });
  }
}
