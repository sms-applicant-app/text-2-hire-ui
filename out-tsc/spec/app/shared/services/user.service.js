import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let UserService = class UserService {
    constructor(dbHelper, firestore) {
        this.dbHelper = dbHelper;
        this.firestore = firestore;
    }
    getUserById(id) {
        console.log(id);
        return this.firestore.doc(`users/${id}`).valueChanges();
    }
    getUsersByFranchise(franchiseId) {
        return this.firestore.collection('user', ref => ref.where(`${franchiseId}`, '==', franchiseId)).get()
            .subscribe(ss => {
            if (ss.docs.length === 0) {
                this.message = 'Document not found! Try again!';
            }
            else {
                ss.docs.forEach(doc => {
                    this.message = '';
                    this.userData = doc.data();
                    console.log('users from store', this.userData);
                });
            }
        });
    }
    getUserByStore(storeId) {
        return this.firestore.collection('user', ref => ref.where(`${storeId}`, '==', storeId)).get()
            .subscribe(ss => {
            if (ss.docs.length === 0) {
                this.message = 'Document not found! Try again!';
            }
            else {
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
    deleteUser(franchiseId) {
        this.firestore.doc(`users/${franchiseId}`).delete().then(resp => {
            console.log('deleting user', resp);
        });
    }
};
UserService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], UserService);
export { UserService };
//# sourceMappingURL=user.service.js.map