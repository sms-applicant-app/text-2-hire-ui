import { __decorate } from "tslib";
import { RouterModule } from '@angular/router';
import { StorePage } from './store.page';
import { NgModule } from "@angular/core";
const routes = [
    {
        path: '',
        component: StorePage
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
        path: 'hiring-manager-sign-up',
        loadChildren: () => import('./hiring-manager-sign-up/hiring-manager-sign-up.module').then(m => m.HiringManagerSignUpPageModule)
    },
    {
        path: 'onboarding',
        loadChildren: () => import('./onboarding/onboarding.module').then(m => m.OnboardingPageModule)
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