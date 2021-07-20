import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminFranchiseDetailsPageRoutingModule } from './admin-franchise-details-routing.module';

import { AdminFranchiseDetailsPage } from './admin-franchise-details.page';
import {SharedComponentsModule} from "../../shared-components/shared-components.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        AdminFranchiseDetailsPageRoutingModule,
        SharedComponentsModule
    ],
  declarations: [AdminFranchiseDetailsPage]
})
export class AdminFranchiseDetailsPageModule {}
