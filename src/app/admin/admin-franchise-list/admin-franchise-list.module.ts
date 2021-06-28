import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminFranchiseListPageRoutingModule } from './admin-franchise-list-routing.module';

import { AdminFranchiseListPage } from './admin-franchise-list.page';
import {SharedComponentsModule} from "../../shared-components/shared-components.module";
import {ModalModule} from "../../shared-components/pop-over-window/model/modal/modal.module";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminFranchiseListPageRoutingModule,
    SharedComponentsModule,
    ModalModule
  ],
  exports: [

  ],
  declarations: [AdminFranchiseListPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AdminFranchiseListPageModule {}
