import { __awaiter, __decorate } from "tslib";
import { Component } from '@angular/core';
import { AddJobReqComponent } from '../shared-components/components/add-job-req/add-job-req.component';
let StorePage = class StorePage {
    constructor(franchiseService, modelController, storeService, firestore, router, userService, authService, activatedRoute) {
        this.franchiseService = franchiseService;
        this.modelController = modelController;
        this.storeService = storeService;
        this.firestore = firestore;
        this.router = router;
        this.userService = userService;
        this.authService = authService;
        this.activatedRoute = activatedRoute;
        this.storesData = [];
    }
    ngOnInit() {
        this.userData = JSON.parse(localStorage.getItem('appUserData'));
        console.log('user', this.userData.franchiseId, this.userData.role);
        if (this.userData.role === 'hiringManager') {
            console.log('im a hiring manager');
            this.role = 'hiringManager';
        }
        if (this.userData.role === 'franchisee') {
            this.franchiseId = this.userData.franchiseId;
            console.log('im a franchise owner', this.franchiseId);
            this.role = 'franchisee';
        }
        this.getAllFranchiseStoresById();
    }
    getAllFranchiseStoresById() {
        console.log('franchise id', this.franchiseId);
        this.storesData = this.franchiseService.getStoreByFranchiseById(this.franchiseId);
        console.log('retrieved stores', this.storesData);
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