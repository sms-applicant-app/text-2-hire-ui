import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JobsPage } from './jobs.page';
const routes = [
    {
        path: '',
        component: JobsPage
    }
];
let JobsPageRoutingModule = class JobsPageRoutingModule {
};
JobsPageRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule],
    })
], JobsPageRoutingModule);
export { JobsPageRoutingModule };
//# sourceMappingURL=jobs-routing.module.js.map