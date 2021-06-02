import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FranchiseDashboardPageRoutingModule } from './franchise-dashboard-routing.module';

import { FranchiseDashboardPage } from './franchise-dashboard.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FranchiseDashboardPageRoutingModule
  ],
  declarations: [FranchiseDashboardPage]
})
export class FranchiseDashboardPageModule {}
