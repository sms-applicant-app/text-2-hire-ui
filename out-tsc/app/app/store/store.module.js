import { __decorate } from "tslib";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { StorePageRoutingModule } from './store-routing.module';
import { StorePage } from './store.page';
import { AddStoreComponent } from './add-store/add-store.component';
import { SharedComponentsModule } from '../shared-components/shared-components.module';
import { AngularMaterialModule } from "../app-material/angular-material.module";
import { AddNewHireComponent } from "./add-new-hire/add-new-hire.component";
let StorePageModule = class StorePageModule {
};
StorePageModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            StorePageRoutingModule,
            ReactiveFormsModule,
            SharedComponentsModule,
            AngularMaterialModule
        ],
        declarations: [StorePage, AddStoreComponent, AddNewHireComponent],
        schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
], StorePageModule);
export { StorePageModule };
//# sourceMappingURL=store.module.js.map