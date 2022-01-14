import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { StoreCalendarPageRoutingModule } from './store-calendar-routing.module';
import { StoreCalendarPage } from './store-calendar.page';
let StoreCalendarPageModule = class StoreCalendarPageModule {
};
StoreCalendarPageModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            StoreCalendarPageRoutingModule
        ],
        declarations: [StoreCalendarPage]
    })
], StoreCalendarPageModule);
export { StoreCalendarPageModule };
//# sourceMappingURL=store-calendar.module.js.map