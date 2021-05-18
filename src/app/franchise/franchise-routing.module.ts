import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FranchisePage } from './franchise.page';

const routes: Routes = [
  {
    path: '',
    component: FranchisePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FranchisePageRoutingModule {}
