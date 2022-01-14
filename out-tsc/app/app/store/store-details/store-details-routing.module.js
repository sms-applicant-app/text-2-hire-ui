import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StoreDetailsPage } from './store-details.page';
const routes = [
    {
        path: '',
        component: StoreDetailsPage
    }
];
let StoreDetailsPageRoutingModule = class StoreDetailsPageRoutingModule {
};
StoreDetailsPageRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule],
    })
], StoreDetailsPageRoutingModule);
export { StoreDetailsPageRoutingModule };
//# sourceMappingURL=store-details-routing.module.js.map