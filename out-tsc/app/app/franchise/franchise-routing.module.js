import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FranchisePage } from './franchise.page';
import { ListStoresComponent } from './list-stores/list-stores.component';
const routes = [
    {
        path: '',
        component: FranchisePage
    },
    {
        path: 'list-stores',
        component: ListStoresComponent
    },
    {
        path: 'store-details/:id',
        loadChildren: () => import('./store-details/store-details.module').then(m => m.StoreDetailsPageModule)
    }
];
let FranchisePageRoutingModule = class FranchisePageRoutingModule {
};
FranchisePageRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule],
    })
], FranchisePageRoutingModule);
export { FranchisePageRoutingModule };
//# sourceMappingURL=franchise-routing.module.js.map