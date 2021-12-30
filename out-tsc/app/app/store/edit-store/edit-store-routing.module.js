import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EditStorePage } from './edit-store.page';
const routes = [
    {
        path: '',
        component: EditStorePage
    }
];
let EditStorePageRoutingModule = class EditStorePageRoutingModule {
};
EditStorePageRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule],
    })
], EditStorePageRoutingModule);
export { EditStorePageRoutingModule };
//# sourceMappingURL=edit-store-routing.module.js.map