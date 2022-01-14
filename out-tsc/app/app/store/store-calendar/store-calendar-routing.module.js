import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StoreCalendarPage } from './store-calendar.page';
const routes = [
    {
        path: '',
        component: StoreCalendarPage
    }
];
let StoreCalendarPageRoutingModule = class StoreCalendarPageRoutingModule {
};
StoreCalendarPageRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule],
    })
], StoreCalendarPageRoutingModule);
export { StoreCalendarPageRoutingModule };
//# sourceMappingURL=store-calendar-routing.module.js.map