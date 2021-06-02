import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApplicantPage } from './applicant.page';

const routes: Routes = [
  {
    path: '',
    component: ApplicantPage
  },
  {
    path: 'applicant-dashboard',
    loadChildren: () => import('./applicant-dashboard/applicant-dashboard.module').then( m => m.ApplicantDashboardPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApplicantPageRoutingModule {}
