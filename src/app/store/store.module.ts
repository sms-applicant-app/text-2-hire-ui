import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StorePageRoutingModule } from './store-routing.module';

import { StorePage } from './store.page';
import {AddStoreComponent} from './add-store/add-store.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StorePageRoutingModule,
    ReactiveFormsModule
  ],
    declarations: [StorePage, AddStoreComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StorePageModule {}
