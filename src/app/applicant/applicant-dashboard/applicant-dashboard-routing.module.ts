import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApplicantDashboardPage } from './applicant-dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: ApplicantDashboardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApplicantDashboardPageRoutingModule {}
