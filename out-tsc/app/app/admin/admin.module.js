import { __decorate } from "tslib";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AdminPageRoutingModule } from './admin-routing.module';
import { AdminPage } from './admin.page';
import { AdminLoginComponent } from './admin-login/admin-login.component';
let AdminPageModule = class AdminPageModule {
};
AdminPageModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            AdminPageRoutingModule
        ],
        declarations: [AdminPage, AdminLoginComponent],
        schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
], AdminPageModule);
export { AdminPageModule };
//# sourceMappingURL=admin.module.js.map