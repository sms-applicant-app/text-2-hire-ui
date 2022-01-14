import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule } from '@angular/router';
const routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'franchise',
        loadChildren: () => import('./franchise/franchise.module').then(m => m.FranchisePageModule)
    },
    {
        path: 'store',
        loadChildren: () => import('./store/store.module').then(m => m.StorePageModule)
    },
    /*  {
        path: 'multi-alerts', component: MultiAlertsComponent
      },*/
    {
        path: 'applicant',
        loadChildren: () => import('./applicant/applicant.module').then(m => m.ApplicantPageModule)
    },
    {
        path: 'admin',
        loadChildren: () => import('./admin/admin.module').then(m => m.AdminPageModule)
    },
    {
        path: 'login',
        loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
    },
    {
        path: 'logout',
        loadChildren: () => import('./logout/logout.module').then(m => m.LogoutPageModule)
    }
];
let AppRoutingModule = class AppRoutingModule {
};
AppRoutingModule = __decorate([
    NgModule({
        imports: [
            RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, enableTracing: false })
        ],
        exports: [RouterModule]
    })
], AppRoutingModule);
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map