import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdminAddFranchisePage } from './admin-add-franchise.page';
const routes = [
    {
        path: '',
        component: AdminAddFranchisePage
    }
];
let AdminAddFranchisePageRoutingModule = class AdminAddFranchisePageRoutingModule {
};
AdminAddFranchisePageRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule],
    })
], AdminAddFranchisePageRoutingModule);
export { AdminAddFranchisePageRoutingModule };
//# sourceMappingURL=admin-add-franchise-routing.module.js.map