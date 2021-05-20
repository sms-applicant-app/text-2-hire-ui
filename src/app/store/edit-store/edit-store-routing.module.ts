import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditStorePage } from './edit-store.page';

const routes: Routes = [
  {
    path: '',
    component: EditStorePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditStorePageRoutingModule {}
