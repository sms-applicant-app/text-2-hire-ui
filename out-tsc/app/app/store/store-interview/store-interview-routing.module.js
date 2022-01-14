import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StoreInterviewPage } from './store-interview.page';
const routes = [
    {
        path: '',
        component: StoreInterviewPage
    }
];
let StoreInterviewPageRoutingModule = class StoreInterviewPageRoutingModule {
};
StoreInterviewPageRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule],
    })
], StoreInterviewPageRoutingModule);
export { StoreInterviewPageRoutingModule };
//# sourceMappingURL=store-interview-routing.module.js.map