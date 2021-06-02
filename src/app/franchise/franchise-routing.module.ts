import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FranchisePage } from './franchise.page';

const routes: Routes = [
  {
    path: '',
    component: FranchisePage
  },
  {
    path: 'franchise-dashboard',
    loadChildren: () => import('./franchise-dashboard/franchise-dashboard.module').then( m => m.FranchiseDashboardPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FranchisePageRoutingModule {}
