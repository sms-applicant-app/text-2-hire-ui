import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListStoresPageRoutingModule } from './list-stores-routing.module';

import { ListStoresPage } from './list-stores.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListStoresPageRoutingModule
  ],
  declarations: [ListStoresPage]
})
export class ListStoresPageModule {}
