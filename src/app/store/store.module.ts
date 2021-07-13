import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StorePageRoutingModule } from './store-routing.module';

import { StorePage } from './store.page';
import {AddStoreComponent} from './add-store/add-store.component';
import {SharedComponentsModule} from '../shared-components/shared-components.module';




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StorePageRoutingModule,
    ReactiveFormsModule,
    SharedComponentsModule
  ],
    declarations: [StorePage, AddStoreComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StorePageModule {}
