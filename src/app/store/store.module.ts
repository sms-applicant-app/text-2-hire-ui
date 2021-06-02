import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StorePageRoutingModule } from './store-routing.module';

import { StorePage } from './store.page';
import {AddStoreComponent} from "./add-store/add-store.component";
import {AppModule} from "../app.module";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StorePageRoutingModule,
    ReactiveFormsModule,
    AppModule
  ],
    exports: [
       AddStoreComponent
    ],
    declarations: [StorePage, AddStoreComponent]
})
export class StorePageModule {}
