import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StorePage } from './store.page';
const routes = [
    {
        path: '',
        component: StorePage
    },
    {
        path: 'store-details',
        loadChildren: () => import('./store-details/store-details.module').then(m => m.StoreDetailsPageModule)
    },
    {
        path: 'edit-store',
        loadChildren: () => import('./edit-store/edit-store.module').then(m => m.EditStorePageModule)
    },
    {
        path: 'store-calendar',
        loadChildren: () => import('./store-calendar/store-calendar.module').then(m => m.StoreCalendarPageModule)
    },
    {
        path: 'store-interview',
        loadChildren: () => import('./store-interview/store-interview.module').then(m => m.StoreInterviewPageModule)
    },
    {
        path: 'create-job-req',
        loadChildren: () => import('./create-job-req/create-job-req.module').then(m => m.CreateJobReqPageModule)
    },
    {
        path: 'hiring-manager-sign-up',
        loadChildren: () => import('./hiring-manager-sign-up/hiring-manager-sign-up.module').then(m => m.HiringManagerSignUpPageModule)
    }
];
let StorePageRoutingModule = class StorePageRoutingModule {
};
StorePageRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule],
    })
], StorePageRoutingModule);
export { StorePageRoutingModule };
//# sourceMappingURL=store-routing.module.js.map