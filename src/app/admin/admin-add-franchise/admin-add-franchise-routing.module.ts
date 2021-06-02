import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminAddFranchisePage } from './admin-add-franchise.page';

const routes: Routes = [
  {
    path: '',
    component: AdminAddFranchisePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminAddFranchisePageRoutingModule {}
