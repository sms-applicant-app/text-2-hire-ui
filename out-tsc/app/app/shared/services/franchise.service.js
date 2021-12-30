import { __awaiter, __decorate } from "tslib";
import { Injectable } from '@angular/core';
let FranchiseService = class FranchiseService {
    constructor(firestore, dbHelper) {
        this.firestore = firestore;
        this.dbHelper = dbHelper;
    }
    getFranchiseOwner(id) {
        return this.firestore.doc(`users/${id}`).valueChanges();
    }
    getStoreByFranchiseById(franchiseId) {
        return this.firestore.collection('store', ref => ref.where(`${franchiseId}`, '==', franchiseId)).get()
            .subscribe(ss => {
            if (ss.docs.length === 0) {
                this.message = " no stores with franchise id";
            }
            else {
                ss.docs.forEach(doc => {
                    this.storeData = doc.data();
                    console.log(this.storeData);
                });
            }
        });
    }
    getFranchiseById(id) {
        return this.dbHelper.collectionWithIds$(`franchise/${id}`).subscribe(data => {
            console.log('returned from franchise', data);
        });
    }
    createFranchise(franchise) {
        return __awaiter(this, void 0, void 0, function* () {
            const franchiseObj = Object.assign({}, franchise);
            console.log('adding franchise', franchise);
            return this.firestore.collection('franchisee').add(franchiseObj).then(docRef => {
                const franchiseId = docRef.id;
                localStorage.setItem('added-franchisee', JSON.stringify(franchiseId));
                console.log('add franchise id =', franchiseId);
            });
        });
    }
    getFranchises() {
        return this.firestore.collection('franchisee').snapshotChanges();
    }
    findFranchisesStores(franchiseId, filter = '', sortOrder = 'asc', pageNumber = 0, pageSize = 3) {
        return;
    }
    getAllFranchisesWithDbHelper() {
        return this.dbHelper.collectionWithIds$('franchisee');
    }
    updateFranchise(franchiseId, data) {
        return this.firestore.collection('franchisee').doc(`${franchiseId}`).set({ data }, { merge: true });
    }
    deleteFranchise(franchiseId) {
        this.firestore.doc(`franchisee/${franchiseId}`).delete().then(resp => {
            console.log('deleting franchise', resp);
        });
    }
};
FranchiseService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], FranchiseService);
export { FranchiseService };
//# sourceMappingURL=franchise.service.js.map