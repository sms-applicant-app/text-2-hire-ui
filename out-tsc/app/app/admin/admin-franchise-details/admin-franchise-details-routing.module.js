import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdminFranchiseDetailsPage } from './admin-franchise-details.page';
const routes = [
    {
        path: '',
        component: AdminFranchiseDetailsPage
    }
];
let AdminFranchiseDetailsPageRoutingModule = class AdminFranchiseDetailsPageRoutingModule {
};
AdminFranchiseDetailsPageRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule],
    })
], AdminFranchiseDetailsPageRoutingModule);
export { AdminFranchiseDetailsPageRoutingModule };
//# sourceMappingURL=admin-franchise-details-routing.module.js.map