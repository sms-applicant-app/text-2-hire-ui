import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StoreInterviewPageRoutingModule } from './store-interview-routing.module';

import { StoreInterviewPage } from './store-interview.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StoreInterviewPageRoutingModule
  ],
  declarations: [StoreInterviewPage]
})
export class StoreInterviewPageModule {}
