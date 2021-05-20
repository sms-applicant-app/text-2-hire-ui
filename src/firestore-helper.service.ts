import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import firebase from 'firebase';
type CollectionPredicate<T> = string | AngularFirestoreCollection<T>;
type DocPredicate<T> = string | AngularFirestoreDocument<T>;
@Injectable({
  providedIn: 'root'
})
export class FirestoreHelperService {

  constructor(private afs: AngularFirestore) { }
  col<T>(ref: CollectionPredicate<T>, queryFn?): AngularFirestoreCollection<T>{
    return typeof ref === 'string' ? this.afs.collection<T>(ref, queryFn) : ref;
  }
  doc<T>(ref: DocPredicate<T>, queryFn?): AngularFirestoreDocument<T> {
    return typeof ref === 'string' ? this.afs.doc<T>(ref) : ref;
  }

  /*get data*/
  doc$<T>(ref: DocPredicate<T>): Observable<T> {
    return this.doc(ref).snapshotChanges().pipe(map(doc => {
      return doc.payload.data() as T;
    }));
  }
  col$<T>(ref: CollectionPredicate<T>, queryFn?): Observable<T[]>{
    return this.col(ref, queryFn).snapshotChanges().pipe(map(docs => {
      return docs.map(a => a.payload.doc.data()) as T[];
    }));
  }
  /*get data with IDs*/
  collectionWithIds$<T>(ref: CollectionPredicate<T>, queryFn?): Observable<any[]>{
    return this.col(ref, queryFn).snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data};
      });
    }));
  }
  /*write data with ordering*/
  get timestamp() {
    return firebase.firestore.FieldValue.serverTimestamp();
  }
  set<T>(ref: DocPredicate<T>, data: any) {
    const timestamp = this.timestamp;
    return this.doc(ref).set({
      ...data,
      updatedAt: timestamp,
      createdAt: timestamp
    }, {merge: true});
  }
  update<T>(ref: DocPredicate<T>, data: any){
    const timestamp = this.timestamp;
    return this.doc(ref).update({
      ...data,
      updatedAt: timestamp
    });
  }
  /*Geo point data*/
  geopoint(lat: number, lng: number){
    return new firebase.firestore.GeoPoint(lat, lng);
  }
  /*sample geo usage
  *  updateItem() {
  *   const data = { location: this.db.geopoint(38, -119)}
  *   this.db.update('items/item3', data)
  * }
  *
  *
  * */
}
