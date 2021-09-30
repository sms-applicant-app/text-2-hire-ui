import { __awaiter, __decorate } from "tslib";
import { Component } from '@angular/core';
import { AddJobReqComponent } from '../shared-components/components/add-job-req/add-job-req.component';
let StorePage = class StorePage {
    constructor(franchiseService, modelController, storeService, firestore) {
        this.franchiseService = franchiseService;
        this.modelController = modelController;
        this.storeService = storeService;
        this.firestore = firestore;
        this.stores = [];
    }
    ngOnInit() {
        this.franchiseId = JSON.parse(localStorage.getItem('appUserData')).franchiseId;
        this.storeId = JSON.parse(localStorage.getItem('appUserData')).storeIds;
        console.log('store id', this.storeId);
        localStorage.setItem('selectedStore', this.storeId);
        this.franchiseService.getFranchiseOwner(this.franchiseId).subscribe(data => [
            console.log('franchise data ', data)
        ]);
    }
    addJobRec() {
        return __awaiter(this, void 0, void 0, function* () {
            const franchiseId = this.franchiseId;
            const storeId = this.storeId;
            console.log('display add Job Model');
            const addJobRec = yield this.modelController.create({
                component: AddJobReqComponent,
                swipeToClose: true,
                componentProps: {
                    franchiseId,
                    storeId
                }
            });
            return yield addJobRec.present();
        });
    }
};
StorePage = __decorate([
    Component({
        selector: 'app-store',
        templateUrl: './store.page.html',
        styleUrls: ['./store.page.scss'],
    })
], StorePage);
export { StorePage };
//# sourceMappingURL=store.page.js.map