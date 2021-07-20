import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FranchisePage } from './franchise.page';
import {ListStoresComponent} from './list-stores/list-stores.component';

const routes: Routes = [
  {
    path: '',
    component: FranchisePage
  },
  {
    path: 'list-stores',
    component: ListStoresComponent
  },
  {
    path: 'store-details/:id',
    loadChildren: () => import('./store-details/store-details.module').then( m => m.StoreDetailsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FranchisePageRoutingModule {}
