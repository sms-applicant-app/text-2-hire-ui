import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CreateJobReqPage } from './create-job-req.page';
const routes = [
    {
        path: '',
        component: CreateJobReqPage
    }
];
let CreateJobReqPageRoutingModule = class CreateJobReqPageRoutingModule {
};
CreateJobReqPageRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule],
    })
], CreateJobReqPageRoutingModule);
export { CreateJobReqPageRoutingModule };
//# sourceMappingURL=create-job-req-routing.module.js.map