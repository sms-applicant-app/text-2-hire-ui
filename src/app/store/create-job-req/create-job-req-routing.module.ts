import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateJobReqPage } from './create-job-req.page';

const routes: Routes = [
  {
    path: '',
    component: CreateJobReqPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateJobReqPageRoutingModule {}
