import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LogoutPage } from './logout.page';
const routes = [
    {
        path: '',
        component: LogoutPage
    }
];
let LogoutPageRoutingModule = class LogoutPageRoutingModule {
};
LogoutPageRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule],
    })
], LogoutPageRoutingModule);
export { LogoutPageRoutingModule };
//# sourceMappingURL=logout-routing.module.js.map