import { __decorate } from "tslib";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AdminAddFranchisePageRoutingModule } from './admin-add-franchise-routing.module';
import { AdminAddFranchisePage } from './admin-add-franchise.page';
import { SharedComponentsModule } from '../../shared-components/shared-components.module';
import { AngularMaterialModule } from '../../app-material/angular-material.module';
let AdminAddFranchisePageModule = class AdminAddFranchisePageModule {
};
AdminAddFranchisePageModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            AdminAddFranchisePageRoutingModule,
            ReactiveFormsModule,
            SharedComponentsModule,
            AngularMaterialModule
        ],
        declarations: [AdminAddFranchisePage],
        schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
], AdminAddFranchisePageModule);
export { AdminAddFranchisePageModule };
//# sourceMappingURL=admin-add-franchise.module.js.map