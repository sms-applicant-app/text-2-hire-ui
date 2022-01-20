import { __awaiter, __decorate } from "tslib";
import { Injectable } from '@angular/core';
let StoreService = class StoreService {
    constructor(firestore, franchiseService) {
        this.firestore = firestore;
        this.franchiseService = franchiseService;
    }
    getStoresByFranchise(franchiseId) {
        return this.firestore.collection('store', ref => ref.where(`${franchiseId}`, '==', franchiseId)).get()
            .subscribe(ss => {
            if (ss.docs.length === 0) {
                this.message = 'Document not found! Try again!';
            }
            else {
                ss.docs.forEach(doc => {
                    this.message = '';
                    this.storeData = doc.data();
                });
            }
        });
    }
    getStoresByHiringManger(storeHiringManager) {
        return this.firestore.collection('store', ref => ref.where(`${storeHiringManager}`, '==', storeHiringManager)).get()
            .subscribe(ss => {
            if (ss.docs.length === 0) {
                this.message = 'Document not found! Try again!';
            }
            else {
                ss.docs.forEach(doc => {
                    this.message = '';
                    this.storeData = doc.data();
                });
            }
        });
    }
    createStore(store) {
        return __awaiter(this, void 0, void 0, function* () {
            const storeObj = Object.assign({}, store);
            console.log('adding store', store);
            return this.firestore.collection('store').add(storeObj).then(docRef => {
                const storeId = docRef.id;
                localStorage.setItem('added-storeId', JSON.stringify(storeId));
                console.log('add store id =', storeId);
            });
        });
    }
    addGeneratedStoreId(storeId) {
        return __awaiter(this, void 0, void 0, function* () {
            const idObj = Object.assign({}, storeId);
            return this.firestore.collection('storeIds').add(idObj).then(docRef => {
                const returnId = docRef.id;
            });
        });
    }
    getStores() {
        return this.firestore.collection('store').snapshotChanges();
    }
    updateStore(storeId, data) {
        return this.firestore.collection('store').doc(`${storeId}`).set({ data }, { merge: true });
    }
    findStores(storeId, filter = '', sortOrder = 'asc', pageNumber = 0, pageSize = 3) {
        return;
    }
    getLastGeneratedStoreId() {
        return this.firestore.collection('storeIds', ref => ref.orderBy('createdAt', 'desc').limit(1)).get()
            .subscribe(ss => {
            ss.docs.forEach(doc => {
                this.lastGeneratedId = doc.data();
                console.log('retrieving last used store Id', this.lastGeneratedId, 'doc data =', doc.data());
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
    lastGeneratedStoreId() {
        this.lastGeneratedId = this.getLastGeneratedStoreId();
        return this.lastGeneratedId;
    }
    deleteStore(franchiseId) {
        this.firestore.doc(`store/${franchiseId}`).delete().then(resp => {
            console.log('deleting store', resp);
        });
    }
};
StoreService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], StoreService);
export { StoreService };
//# sourceMappingURL=store.service.js.map