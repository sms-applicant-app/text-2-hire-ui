import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminAddFranchisePageRoutingModule } from './admin-add-franchise-routing.module';

import { AdminAddFranchisePage } from './admin-add-franchise.page';
import {SharedComponentsModule} from "../../shared-components/shared-components.module";





@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminAddFranchisePageRoutingModule,
    ReactiveFormsModule,
    SharedComponentsModule
  ],
  declarations: [AdminAddFranchisePage]
})
export class AdminAddFranchisePageModule {}
