import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApplicantPage } from './applicant.page';

const routes: Routes = [
  {
    path: '',
    component: ApplicantPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApplicantPageRoutingModule {}
