import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ApplicantPageRoutingModule } from './applicant-routing.module';

import { ApplicantPage } from './applicant.page';
import {AddApplicantComponent} from "./add-applicant/add-applicant.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ApplicantPageRoutingModule
  ],
  declarations: [ApplicantPage, AddApplicantComponent]
})
export class ApplicantPageModule {}
