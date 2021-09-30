import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { JobsPageRoutingModule } from './jobs-routing.module';
import { JobsPage } from './jobs.page';
let JobsPageModule = class JobsPageModule {
};
JobsPageModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            JobsPageRoutingModule
        ],
        declarations: [JobsPage]
    })
], JobsPageModule);
export { JobsPageModule };
//# sourceMappingURL=jobs.module.js.map