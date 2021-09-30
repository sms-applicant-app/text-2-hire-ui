import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ApplicantDashboardPageRoutingModule } from './applicant-dashboard-routing.module';
import { ApplicantDashboardPage } from './applicant-dashboard.page';
let ApplicantDashboardPageModule = class ApplicantDashboardPageModule {
};
ApplicantDashboardPageModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            ApplicantDashboardPageRoutingModule
        ],
        declarations: [ApplicantDashboardPage]
    })
], ApplicantDashboardPageModule);
export { ApplicantDashboardPageModule };
//# sourceMappingURL=applicant-dashboard.module.js.map