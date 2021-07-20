import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminFranchiseDetailsPage } from './admin-franchise-details.page';

const routes: Routes = [
  {
    path: '',
    component: AdminFranchiseDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminFranchiseDetailsPageRoutingModule {}
