import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import firebase from 'firebase';
let FirestoreHelperService = class FirestoreHelperService {
    constructor(afs) {
        this.afs = afs;
    }
    col(ref, queryFn) {
        return typeof ref === 'string' ? this.afs.collection(ref, queryFn) : ref;
    }
    doc(ref, queryFn) {
        return typeof ref === 'string' ? this.afs.doc(ref) : ref;
    }
    /*get data*/
    doc$(ref) {
        return this.doc(ref).snapshotChanges().pipe(map(doc => {
            return doc.payload.data();
        }));
    }
    col$(ref, queryFn) {
        return this.col(ref, queryFn).snapshotChanges().pipe(map(docs => {
            return docs.map(a => a.payload.doc.data());
        }));
    }
    /*get data with IDs*/
    collectionWithIds$(ref, queryFn) {
        return this.col(ref, queryFn).snapshotChanges().pipe(map(actions => {
            return actions.map(a => {
                const data = a.payload.doc.data();
                const id = a.payload.doc.id;
                return Object.assign({ id }, data);
            });
        }));
    }
    /*write data with ordering*/
    get timestamp() {
        return firebase.firestore.FieldValue.serverTimestamp();
    }
    set(ref, data) {
        const timestamp = this.timestamp;
        return this.doc(ref).set(Object.assign(Object.assign({}, data), { updatedAt: timestamp, createdAt: timestamp }), { merge: true });
    }
    update(ref, data) {
        const timestamp = this.timestamp;
        return this.doc(ref).update(Object.assign(Object.assign({}, data), { updatedAt: timestamp }));
    }
    /*Geo point data*/
    geopoint(lat, lng) {
        return new firebase.firestore.GeoPoint(lat, lng);
    }
};
FirestoreHelperService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], FirestoreHelperService);
export { FirestoreHelperService };
//# sourceMappingURL=firestore-helper.service.js.map