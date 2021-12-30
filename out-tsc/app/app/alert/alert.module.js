import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from "./alert/alert.component";
import { MultiAlertComponent } from "./multi-alert";
let AlertModule = class AlertModule {
};
AlertModule = __decorate([
    NgModule({
        declarations: [AlertComponent, MultiAlertComponent],
        exports: [
            AlertComponent
        ],
        imports: [
            CommonModule
        ]
    })
], AlertModule);
export { AlertModule };
//# sourceMappingURL=alert.module.js.map