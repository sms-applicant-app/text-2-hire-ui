import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ApplicantPage } from './applicant.page';
const routes = [
    {
        path: '',
        component: ApplicantPage
    },
    {
        path: 'applicant-dashboard',
        loadChildren: () => import('./applicant-dashboard/applicant-dashboard.module').then(m => m.ApplicantDashboardPageModule)
    }
];
let ApplicantPageRoutingModule = class ApplicantPageRoutingModule {
};
ApplicantPageRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule],
    })
], ApplicantPageRoutingModule);
export { ApplicantPageRoutingModule };
//# sourceMappingURL=applicant-routing.module.js.map