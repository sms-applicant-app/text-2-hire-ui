import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ApplicantDashboardPageRoutingModule } from './applicant-dashboard-routing.module';

import { ApplicantDashboardPage } from './applicant-dashboard.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ApplicantDashboardPageRoutingModule
  ],
  declarations: [ApplicantDashboardPage]
})
export class ApplicantDashboardPageModule {}
