import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdminPage } from './admin.page';
import { AdminLoginComponent } from './admin-login/admin-login.component';
const routes = [
    {
        path: '',
        component: AdminPage
    },
    {
        path: 'admin-add-franchise',
        loadChildren: () => import('./admin-add-franchise/admin-add-franchise.module').then(m => m.AdminAddFranchisePageModule)
    },
    {
        path: 'admin-login',
        component: AdminLoginComponent
    },
    {
        path: 'admin-metrics',
        loadChildren: () => import('./admin-metrics/admin-metrics.module').then(m => m.AdminMetricsPageModule)
    },
    {
        path: 'admin-franchise-list',
        loadChildren: () => import('./admin-franchise-list/admin-franchise-list.module').then(m => m.AdminFranchiseListPageModule)
    },
    {
        path: 'admin-franchise-details/:id',
        loadChildren: () => import('./admin-franchise-details/admin-franchise-details.module').then(m => m.AdminFranchiseDetailsPageModule)
    }
];
let AdminPageRoutingModule = class AdminPageRoutingModule {
};
AdminPageRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule],
    })
], AdminPageRoutingModule);
export { AdminPageRoutingModule };
//# sourceMappingURL=admin-routing.module.js.map