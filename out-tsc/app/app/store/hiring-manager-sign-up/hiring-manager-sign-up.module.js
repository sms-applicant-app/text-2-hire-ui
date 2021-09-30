import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HiringManagerSignUpPageRoutingModule } from './hiring-manager-sign-up-routing.module';
import { HiringManagerSignUpPage } from './hiring-manager-sign-up.page';
let HiringManagerSignUpPageModule = class HiringManagerSignUpPageModule {
};
HiringManagerSignUpPageModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            HiringManagerSignUpPageRoutingModule
        ],
        declarations: [HiringManagerSignUpPage]
    })
], HiringManagerSignUpPageModule);
export { HiringManagerSignUpPageModule };
//# sourceMappingURL=hiring-manager-sign-up.module.js.map