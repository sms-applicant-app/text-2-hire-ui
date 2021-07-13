import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StoreInterviewPage } from './store-interview.page';

const routes: Routes = [
  {
    path: '',
    component: StoreInterviewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoreInterviewPageRoutingModule {}
