import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EditStorePageRoutingModule } from './edit-store-routing.module';
import { EditStorePage } from './edit-store.page';
let EditStorePageModule = class EditStorePageModule {
};
EditStorePageModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            EditStorePageRoutingModule
        ],
        declarations: [EditStorePage]
    })
], EditStorePageModule);
export { EditStorePageModule };
//# sourceMappingURL=edit-store.module.js.map