import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { OnboardingPageRoutingModule } from './onboarding-routing.module';
import { OnboardingPage } from './onboarding.page';
let OnboardingPageModule = class OnboardingPageModule {
};
OnboardingPageModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            OnboardingPageRoutingModule
        ],
        declarations: [OnboardingPage]
    })
], OnboardingPageModule);
export { OnboardingPageModule };
//# sourceMappingURL=onboarding.module.js.map