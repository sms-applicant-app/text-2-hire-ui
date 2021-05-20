import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListStoresPage } from './list-stores.page';

const routes: Routes = [
  {
    path: '',
    component: ListStoresPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListStoresPageRoutingModule {}
