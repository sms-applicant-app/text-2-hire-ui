import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdminMetricsPage } from './admin-metrics.page';
const routes = [
    {
        path: '',
        component: AdminMetricsPage
    }
];
let AdminMetricsPageRoutingModule = class AdminMetricsPageRoutingModule {
};
AdminMetricsPageRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule],
    })
], AdminMetricsPageRoutingModule);
export { AdminMetricsPageRoutingModule };
//# sourceMappingURL=admin-metrics-routing.module.js.map