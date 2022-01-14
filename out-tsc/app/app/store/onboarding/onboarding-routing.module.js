import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OnboardingPage } from './onboarding.page';
const routes = [
    {
        path: '',
        component: OnboardingPage
    }
];
let OnboardingPageRoutingModule = class OnboardingPageRoutingModule {
};
OnboardingPageRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule],
    })
], OnboardingPageRoutingModule);
export { OnboardingPageRoutingModule };
//# sourceMappingURL=onboarding-routing.module.js.map