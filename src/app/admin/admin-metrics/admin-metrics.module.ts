import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminMetricsPageRoutingModule } from './admin-metrics-routing.module';

import { AdminMetricsPage } from './admin-metrics.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminMetricsPageRoutingModule
  ],
  declarations: [AdminMetricsPage]
})
export class AdminMetricsPageModule {}
