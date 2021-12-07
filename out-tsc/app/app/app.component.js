import { __awaiter, __decorate } from "tslib";
import { Component } from '@angular/core';
import { AddFranchiseComponent } from './shared-components/components/add-franchise/add-franchise.component';
let AppComponent = class AppComponent {
    constructor(authService, modalController) {
        this.authService = authService;
        this.modalController = modalController;
        this.appPages = [
            /*{ title: 'Home', url: '/admin', icon: 'home' },
            { title: 'Franchises', url: '/franchise', icon: 'mail' },
            { title: 'Stores', url: '/store', icon: 'storefront' },
            { title: 'Add A Franchise', url: '/folder/Favorites', icon: 'heart' },
            { title: 'Metrics', url: '/folder/Archived', icon: 'archive' },*/
            { title: 'Log out', url: '/logout', icon: 'logout' },
        ];
    }
    ngOnInit() {
        this.userData = JSON.parse(localStorage.getItem('appUserData'));
        if (this.userData.role === 'franchisee') {
            // get all stores for the franchise
            this.showStoresByFranchise = true;
        }
        if (this.userData.role === 'hiringManager') {
            // get stores for the hiring manager
            this.showStoresByHiringManager = true;
        }
    }
    addFranchise() {
        return __awaiter(this, void 0, void 0, function* () {
            const franchiseOwner = this.userData.email;
            console.log('display add franchise');
            const addFranchise = yield this.modalController.create({
                component: AddFranchiseComponent,
                swipeToClose: true,
                componentProps: {
                    franchiseOwner
                }
            });
            return yield addFranchise.present();
        });
    }
};
AppComponent = __decorate([
    Component({
        selector: 'app-root',
        templateUrl: 'app.component.html',
        styleUrls: ['app.component.scss'],
    })
], AppComponent);
export { AppComponent };
//# sourceMappingURL=app.component.js.map