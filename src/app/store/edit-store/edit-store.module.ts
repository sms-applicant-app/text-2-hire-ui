import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditStorePageRoutingModule } from './edit-store-routing.module';

import { EditStorePage } from './edit-store.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditStorePageRoutingModule
  ],
  declarations: [EditStorePage]
})
export class EditStorePageModule {}
