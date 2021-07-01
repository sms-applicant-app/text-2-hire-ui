import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminAddFranchisePageRoutingModule } from './admin-add-franchise-routing.module';

import { AdminAddFranchisePage } from './admin-add-franchise.page';
import {SharedComponentsModule} from "../../shared-components/shared-components.module";
import {ModalModule} from "../../shared-components/pop-over-window/model/modal/modal.module";
import {AngularMaterialModule} from "../../app-material/angular-material.module";





@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminAddFranchisePageRoutingModule,
    ReactiveFormsModule,
    SharedComponentsModule,
    ModalModule,
    AngularMaterialModule
  ],
  declarations: [AdminAddFranchisePage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AdminAddFranchisePageModule {}
