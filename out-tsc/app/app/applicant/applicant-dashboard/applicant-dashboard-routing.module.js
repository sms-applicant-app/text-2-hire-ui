import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ApplicantDashboardPage } from './applicant-dashboard.page';
const routes = [
    {
        path: '',
        component: ApplicantDashboardPage
    }
];
let ApplicantDashboardPageRoutingModule = class ApplicantDashboardPageRoutingModule {
};
ApplicantDashboardPageRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule],
    })
], ApplicantDashboardPageRoutingModule);
export { ApplicantDashboardPageRoutingModule };
//# sourceMappingURL=applicant-dashboard-routing.module.js.map