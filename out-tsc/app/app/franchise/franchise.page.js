import { __awaiter, __decorate } from "tslib";
import { Component } from '@angular/core';
import { AddStoreComponent } from '../shared-components/components/add-store/add-store.component';
import { AddJobReqComponent } from '../shared-components/components/add-job-req/add-job-req.component';
import { RegisterUserComponent } from '../shared-components/components/register-user/register-user.component';
let FranchisePage = class FranchisePage {
    constructor(fb, actRoute, router, franchiseService, modalController) {
        this.fb = fb;
        this.actRoute = actRoute;
        this.router = router;
        this.franchiseService = franchiseService;
        this.modalController = modalController;
        const navigation = this.router.getCurrentNavigation();
        const state = navigation.extras.state;
    }
    getStoresByFranchiseId() {
    }
    ngOnInit() {
        this.isLoading = true;
        this.franchiseOwner = '';
        this.userId = JSON.parse(localStorage.getItem('user')).email;
        this.getFranchiseOwnerByUserId(this.userId);
    }
    receiveFranchiseIdMessage($event) {
        this.franchiseId = $event;
    }
    getFranchiseOwnerByUserId(id) {
        this.franchiseService.getFranchiseOwner(id).subscribe(user => {
            console.log(user.franchiseId, 'users franchiseId');
            this.franchiseId = user.franchiseId;
            this.franchiseOwner = user.fullName;
            this.isLoading = false;
        });
    }
    addStore() {
        return __awaiter(this, void 0, void 0, function* () {
            const franchiseId = this.franchiseId;
            console.log('display add store');
            const addStoreModel = yield this.modalController.create({
                component: AddStoreComponent,
                swipeToClose: true,
                componentProps: {
                    franchiseId
                }
            });
            return yield addStoreModel.present();
        });
    }
    addJobRec() {
        return __awaiter(this, void 0, void 0, function* () {
            const franchiseId = this.franchiseId;
            console.log('display add job model');
            const addJobModel = yield this.modalController.create({
                component: AddJobReqComponent,
                swipeToClose: true,
                componentProps: {
                    // may need franchise id
                    franchiseId
                }
            });
            return yield addJobModel.present();
        });
    }
    addUser() {
        return __awaiter(this, void 0, void 0, function* () {
            const franchiseId = this.franchiseId;
            console.log('display add job model');
            const addJobModel = yield this.modalController.create({
                component: RegisterUserComponent,
                swipeToClose: true,
                componentProps: {
                    // may need franchise id
                    franchiseId
                }
            });
            return yield addJobModel.present();
        });
    }
    showStoresListByFranchiseId() {
        this.router.navigate(['/franchise/list-stores']);
    }
};
FranchisePage = __decorate([
    Component({
        selector: 'app-franchise',
        templateUrl: './franchise.page.html',
        styleUrls: ['./franchise.page.scss'],
    })
], FranchisePage);
export { FranchisePage };
//# sourceMappingURL=franchise.page.js.map