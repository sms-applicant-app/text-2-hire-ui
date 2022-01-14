import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdminFranchiseListPage } from './admin-franchise-list.page';
const routes = [
    {
        path: '',
        component: AdminFranchiseListPage
    }
];
let AdminFranchiseListPageRoutingModule = class AdminFranchiseListPageRoutingModule {
};
AdminFranchiseListPageRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule],
    })
], AdminFranchiseListPageRoutingModule);
export { AdminFranchiseListPageRoutingModule };
//# sourceMappingURL=admin-franchise-list-routing.module.js.map