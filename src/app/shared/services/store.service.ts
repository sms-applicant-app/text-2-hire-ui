import { AlertService } from './alert.service';
import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {Store} from '../models/store';
import {FranchiseService} from './franchise.service';
import {GeneratedStoreId} from '../models/generatedStoreId';
import {AngularFireObject} from '@angular/fire/database';
import { toastMess } from '../constants/messages';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {DomSanitizer} from "@angular/platform-browser";

const httpOptions = {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin':' *'})
};

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
    public firestore: AngularFirestore, public franchiseService: FranchiseService, public alertService: AlertService, public httpClient: HttpClient, public sanitizer: DomSanitizer
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
      const qrCode = this.createQRCode(storeId, 1);
      console.log('returned qr-code in service', qrCode);
      this.alertService.showSuccess(toastMess.CREATE_SUCCESS);
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
    return;
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
  createQRCode(storeId, download){
    try{
      const apiKey = '7vktnoN4oJutWLz_w7nP10xqmC2i6Y-u7YchDQt-flvRuR1S1zvXvM3BL_d45dFv';
      const url = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://applicant.hirenow.us/positions/${storeId}`;
      const body =
        {
          // eslint-disable-next-line @typescript-eslint/naming-convention
          frame_name: 'no-frame',
          // eslint-disable-next-line @typescript-eslint/naming-convention
          qr_code_text: `https://applicant.hirenow.us/positions/${storeId}`,
          // eslint-disable-next-line @typescript-eslint/naming-convention
          image_format: 'SVG',
          // eslint-disable-next-line @typescript-eslint/naming-convention
          qr_code_logo: 'scan-me-square',
          download: `${download}`
        };

      return this.httpClient.post(url, body, httpOptions);
    } catch (error){
      console.log(error, 'creating qr code');
      return error;
    }

  }
  deleteStore(id){
    return this.firestore.doc(`store/${id}`).delete().then(resp =>{
      console.log('deleting store', resp);
    });
  }
}
