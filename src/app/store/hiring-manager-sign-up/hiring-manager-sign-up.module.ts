import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HiringManagerSignUpPageRoutingModule } from './hiring-manager-sign-up-routing.module';

import { HiringManagerSignUpPage } from './hiring-manager-sign-up.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HiringManagerSignUpPageRoutingModule
  ],
  declarations: [HiringManagerSignUpPage]
})
export class HiringManagerSignUpPageModule {}
