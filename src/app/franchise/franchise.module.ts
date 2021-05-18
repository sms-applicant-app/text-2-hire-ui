import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FranchisePageRoutingModule } from './franchise-routing.module';

import { FranchisePage } from './franchise.page';
import {AddFranchiceComponent} from "./add-franchise/add-franchice.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FranchisePageRoutingModule
  ],
  declarations: [FranchisePage, AddFranchiceComponent]
})
export class FranchisePageModule {}
