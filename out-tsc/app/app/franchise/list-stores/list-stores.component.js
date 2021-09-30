import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
let ListStoresComponent = class ListStoresComponent {
    constructor(storeService) {
        this.storeService = storeService;
    }
    ngOnInit() {
        this.franchisedId = JSON.parse(localStorage.getItem('user')).franchiseId;
        this.getAllStoresByFranchiseId();
    }
    getAllStoresByFranchiseId() {
        this.storesData = this.storeService.getStoresByFranchise(this.franchisedId);
        console.log(this.storesData);
    }
    getStoresByHiringManager() {
        const userId = JSON.parse(localStorage.getItem('user')).uid;
        this.storesData = this.storeService.getStoresByHiringManger(userId);
        console.log('store data returned for hiring manager', this.storesData);
    }
};
__decorate([
    Input()
], ListStoresComponent.prototype, "franchiseIdFromList", void 0);
ListStoresComponent = __decorate([
    Component({
        selector: 'app-list-stores',
        templateUrl: './list-stores.component.html',
        styleUrls: ['./list-stores.component.scss'],
    })
], ListStoresComponent);
export { ListStoresComponent };
//# sourceMappingURL=list-stores.component.js.map