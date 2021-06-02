import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StorePage } from './store.page';

const routes: Routes = [
  {
    path: '',
    component: StorePage
  },
  {
    path: 'create-store',
    loadChildren: () => import('./create-store/create-store.module').then( m => m.CreateStorePageModule)
  },
  {
    path: 'store-details',
    loadChildren: () => import('./store-details/store-details.module').then( m => m.StoreDetailsPageModule)
  },
  {
    path: 'list-stores',
    loadChildren: () => import('./list-stores/list-stores.module').then( m => m.ListStoresPageModule)
  },
  {
    path: 'edit-store',
    loadChildren: () => import('./edit-store/edit-store.module').then( m => m.EditStorePageModule)
  },
  {
    path: 'store-dashboard',
    loadChildren: () => import('./store-dashboard/store-dashboard.module').then( m => m.StoreDashboardPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StorePageRoutingModule {}
