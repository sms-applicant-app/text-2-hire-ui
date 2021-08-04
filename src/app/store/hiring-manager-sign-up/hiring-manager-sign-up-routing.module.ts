import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HiringManagerSignUpPage } from './hiring-manager-sign-up.page';

const routes: Routes = [
  {
    path: '',
    component: HiringManagerSignUpPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HiringManagerSignUpPageRoutingModule {}
