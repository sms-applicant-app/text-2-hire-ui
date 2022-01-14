import { __awaiter, __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
let JobService = class JobService {
    constructor(firestore) {
        this.firestore = firestore;
        this.stores = {};
        this.dataSub = new BehaviorSubject(this.stores);
        this.currentData = this.dataSub.asObservable();
        this.currentData.subscribe(data => localStorage.setItem('selectedStore', data));
    }
    storeSelection(newStore) {
        const store = this.dataSub.next(newStore);
        console.log('store selection in service', newStore);
        return this.getJobsByStore(newStore);
    }
    getPositionsForSelectedStore() {
        let storeId = localStorage.getItem('selectedStore');
        storeId = (storeId);
        this.dataSub.next(storeId);
        this.jobsData = this.getJobsByStore(storeId);
        return this.jobsData;
    }
    getJobsByStore(storeId) {
        return this.firestore.collection('jobs', ref => ref.where(`${storeId}`, '==', storeId)).get()
            .subscribe(ss => {
            if (ss.docs.length === 0) {
                this.message = 'Document not found! Try again!';
            }
            else {
                ss.docs.forEach(doc => {
                    this.message = '';
                    this.jobsData = doc.data();
                });
            }
        });
    }
    addJobRec(job) {
        return __awaiter(this, void 0, void 0, function* () {
            const jobObj = Object.assign({}, job);
            return this.firestore.collection('jobs').add(jobObj).then(docRef => {
                const jobId = docRef.id;
                console.log('job added', jobId);
            });
        });
    }
};
JobService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], JobService);
export { JobService };
//# sourceMappingURL=job.service.js.map