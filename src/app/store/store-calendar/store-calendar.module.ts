import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StoreCalendarPageRoutingModule } from './store-calendar-routing.module';

import { StoreCalendarPage } from './store-calendar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StoreCalendarPageRoutingModule
  ],
  declarations: [StoreCalendarPage]
})
export class StoreCalendarPageModule {}
