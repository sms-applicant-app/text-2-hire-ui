import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StorePage } from './store.page';

const routes: Routes = [
  {
    path: '',
    component: StorePage
  },
  {
    path: 'store-details',
    loadChildren: () => import('./store-details/store-details.module').then( m => m.StoreDetailsPageModule)
  },
  {
    path: 'edit-store',
    loadChildren: () => import('./edit-store/edit-store.module').then( m => m.EditStorePageModule)
  },
  {
    path: 'store-calendar',
    loadChildren: () => import('./store-calendar/store-calendar.module').then( m => m.StoreCalendarPageModule)
  },
  {
    path: 'store-interview',
    loadChildren: () => import('./store-interview/store-interview.module').then( m => m.StoreInterviewPageModule)
  },
  {
    path: 'create-job-req',
    loadChildren: () => import('./create-job-req/create-job-req.module').then( m => m.CreateJobReqPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StorePageRoutingModule {}
