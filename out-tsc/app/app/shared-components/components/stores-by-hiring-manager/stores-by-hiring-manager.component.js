import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
let StoresByHiringManagerComponent = class StoresByHiringManagerComponent {
    constructor(firestore, jobService) {
        this.firestore = firestore;
        this.jobService = jobService;
        this.stores = [];
        this.positions = [];
        this.displayColumns = ['storeName'];
    }
    ngOnInit() {
    }
    ngOnChanges() {
        this.getStoresByHiringManger(this.storeManagerId);
    }
    getStoresByHiringManger(storeHiringManager) {
        this.firestore.collection('store', ref => ref.where('storeHiringManager', '==', `${storeHiringManager}`)).get()
            .subscribe(store => {
            this.stores = [];
            if (store.docs.length === 0) {
                console.log('no docs with that hiring manager', storeHiringManager);
            }
            else {
                this.stores = store.docs.map((data) => data.data());
                this.dataSource = new MatTableDataSource(this.stores);
            }
        });
    }
    getOpenPositionsByStore(id) {
        // todo add get only open positions
        console.log('selected store to get positions for', id);
        localStorage.setItem('selectedStore', JSON.stringify(id));
        this.jobService.storeSelection(id);
        this.firestore.collection('jobs', ref => ref.where('storeId', '==', id)).get()
            .subscribe(ss => {
            this.positions = [];
            if (ss.docs.length === 0) {
                return 'no positions for store';
            }
            else {
                ss.forEach(data => {
                    const j = data.data();
                    this.positions.push(j);
                    this.positionsDataSource = new MatTableDataSource(this.positions);
                });
            }
        });
    }
};
__decorate([
    Input('storeManagerId')
], StoresByHiringManagerComponent.prototype, "storeManagerId", void 0);
StoresByHiringManagerComponent = __decorate([
    Component({
        selector: 'app-stores-by-hiring-manager',
        templateUrl: './stores-by-hiring-manager.component.html',
        styleUrls: ['./stores-by-hiring-manager.component.scss'],
    })
], StoresByHiringManagerComponent);
export { StoresByHiringManagerComponent };
//# sourceMappingURL=stores-by-hiring-manager.component.js.map