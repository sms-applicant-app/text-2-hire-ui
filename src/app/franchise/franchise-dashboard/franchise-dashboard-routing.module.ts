import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FranchiseDashboardPage } from './franchise-dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: FranchiseDashboardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FranchiseDashboardPageRoutingModule {}
