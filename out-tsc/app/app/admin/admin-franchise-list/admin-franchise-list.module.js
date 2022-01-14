import { __decorate } from "tslib";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AdminFranchiseListPageRoutingModule } from './admin-franchise-list-routing.module';
import { AdminFranchiseListPage } from './admin-franchise-list.page';
import { SharedComponentsModule } from "../../shared-components/shared-components.module";
import { MatStepperModule } from "@angular/material/stepper";
import { STEPPER_GLOBAL_OPTIONS } from "@angular/cdk/stepper";
let AdminFranchiseListPageModule = class AdminFranchiseListPageModule {
};
AdminFranchiseListPageModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            AdminFranchiseListPageRoutingModule,
            SharedComponentsModule,
            MatStepperModule
        ],
        exports: [],
        declarations: [AdminFranchiseListPage],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
        providers: [
            {
                provide: STEPPER_GLOBAL_OPTIONS,
                useValue: { displayDefaultIndicatorType: false }
            }
        ]
    })
], AdminFranchiseListPageModule);
export { AdminFranchiseListPageModule };
//# sourceMappingURL=admin-franchise-list.module.js.map