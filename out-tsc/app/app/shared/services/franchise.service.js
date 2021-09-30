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
    getFranchiseById(id) {
        return this.firestore.doc(`franchisee/${id}`).valueChanges();
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