import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { StoreInterviewPageRoutingModule } from './store-interview-routing.module';
import { StoreInterviewPage } from './store-interview.page';
let StoreInterviewPageModule = class StoreInterviewPageModule {
};
StoreInterviewPageModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            StoreInterviewPageRoutingModule
        ],
        declarations: [StoreInterviewPage]
    })
], StoreInterviewPageModule);
export { StoreInterviewPageModule };
//# sourceMappingURL=store-interview.module.js.map