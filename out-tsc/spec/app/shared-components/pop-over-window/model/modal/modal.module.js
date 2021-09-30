import { __decorate } from "tslib";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModelComponent } from "./modal/model.component";
let ModalModule = class ModalModule {
};
ModalModule = __decorate([
    NgModule({
        declarations: [ModelComponent],
        imports: [
            CommonModule
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
], ModalModule);
export { ModalModule };
//# sourceMappingURL=modal.module.js.map