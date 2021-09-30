import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HiringManagerSignUpPage } from './hiring-manager-sign-up.page';
const routes = [
    {
        path: '',
        component: HiringManagerSignUpPage
    }
];
let HiringManagerSignUpPageRoutingModule = class HiringManagerSignUpPageRoutingModule {
};
HiringManagerSignUpPageRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule],
    })
], HiringManagerSignUpPageRoutingModule);
export { HiringManagerSignUpPageRoutingModule };
//# sourceMappingURL=hiring-manager-sign-up-routing.module.js.map