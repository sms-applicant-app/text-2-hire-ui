import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminFranchiseListPage } from './admin-franchise-list.page';

const routes: Routes = [
  {
    path: '',
    component: AdminFranchiseListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminFranchiseListPageRoutingModule {}
