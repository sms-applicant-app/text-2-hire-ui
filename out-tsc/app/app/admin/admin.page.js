import { __decorate } from "tslib";
import { Component } from '@angular/core';
let AdminPage = class AdminPage {
    constructor(dbHelper, router) {
        this.dbHelper = dbHelper;
        this.router = router;
        this.franchiseData = [];
    }
    ngOnInit() {
        this.isRegisteringFranchise = true;
        this.franchisees = [];
        this.dbHelper.collectionWithIds$('franchisee').subscribe((data) => {
            this.franchisees = data;
        });
        console.log('franchises', this.franchisees);
    }
    getFranchiseById() {
        console.log(this.franchisees);
    }
    addUserForFranchise() {
        const navigationExtras = {
            state: {
                isRegisteringFranchise: this.isRegisteringFranchise
            }
        };
        this.router.navigate(['login'], navigationExtras);
    }
};
AdminPage = __decorate([
    Component({
        selector: 'app-admin',
        templateUrl: './admin.page.html',
        styleUrls: ['./admin.page.scss'],
    })
], AdminPage);
export { AdminPage };
//# sourceMappingURL=admin.page.js.map