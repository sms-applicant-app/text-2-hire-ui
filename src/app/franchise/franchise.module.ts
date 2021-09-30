import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FranchisePageRoutingModule } from './franchise-routing.module';
import { FranchisePage } from './franchise.page';
import {ListStoresComponent} from './list-stores/list-stores.component';
import {SharedComponentsModule} from '../shared-components/shared-components.module';
import {AngularMaterialModule} from "../app-material/angular-material.module";



@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        SharedComponentsModule,
        FranchisePageRoutingModule,
        AngularMaterialModule
    ],
  declarations: [FranchisePage, ListStoresComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FranchisePageModule {}
