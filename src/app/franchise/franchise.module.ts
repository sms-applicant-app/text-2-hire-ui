import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FranchisePageRoutingModule } from './franchise-routing.module';

import { FranchisePage } from './franchise.page';
import {FranchiseListComponent} from "../shared-components/components/franchise-list/franchise-list.component";
import {AngularMaterialModule} from "../app-material/angular-material.module";
import {ListFranchisesComponent} from "./list-franchises/list-franchises.component";
import {SharedComponentsModule} from "../shared-components/shared-components.module";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedComponentsModule,
    AngularMaterialModule
  ],
  declarations: [FranchisePage, ListFranchisesComponent,]
})
export class FranchisePageModule {}
