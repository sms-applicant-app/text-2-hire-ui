import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { StoreDetailsPageRoutingModule } from './store-details-routing.module';
import { StoreDetailsPage } from './store-details.page';
let StoreDetailsPageModule = class StoreDetailsPageModule {
};
StoreDetailsPageModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            StoreDetailsPageRoutingModule
        ],
        declarations: [StoreDetailsPage]
    })
], StoreDetailsPageModule);
export { StoreDetailsPageModule };
//# sourceMappingURL=store-details.module.js.map