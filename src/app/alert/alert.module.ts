import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AlertComponent} from "./alert/alert.component";
import {MultiAlertComponent} from "./multi-alert";



@NgModule({
  declarations: [AlertComponent, MultiAlertComponent],
  exports: [
    AlertComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AlertModule { }
