var AddStoreComponent_1;
import { __awaiter, __decorate } from "tslib";
import { Component, Input } from '@angular/core';
import { Validators } from "@angular/forms";
let AddStoreComponent = AddStoreComponent_1 = class AddStoreComponent {
    constructor(dbHelper, datePipe, fb, router, modelController) {
        this.dbHelper = dbHelper;
        this.datePipe = datePipe;
        this.fb = fb;
        this.router = router;
        this.modelController = modelController;
    }
    ngOnInit() {
        this.userData = JSON.parse(localStorage.getItem('user'));
    }
    createStoreForm() {
        this.addStoreForm = this.fb.group({
            storeNumber: ['', Validators.required],
            storePhoneNumber: ['', [Validators.required]],
        });
    }
    addStore() {
        return __awaiter(this, void 0, void 0, function* () {
            let franchiseId;
            console.log('display add store');
            const addStoreModel = yield this.modelController.create({
                component: AddStoreComponent_1,
                swipeToClose: true,
                componentProps: {
                    franchiseId
                }
            });
            return yield addStoreModel.present();
        });
    }
};
__decorate([
    Input()
], AddStoreComponent.prototype, "franchiseId", void 0);
__decorate([
    Input()
], AddStoreComponent.prototype, "addressId", void 0);
AddStoreComponent = AddStoreComponent_1 = __decorate([
    Component({
        selector: 'app-add-store',
        templateUrl: './add-store.component.html',
        styleUrls: ['./add-store.component.scss'],
    })
], AddStoreComponent);
export { AddStoreComponent };
//# sourceMappingURL=add-store.component.js.map