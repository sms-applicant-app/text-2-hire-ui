import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CreateJobReqPageRoutingModule } from './create-job-req-routing.module';
import { CreateJobReqPage } from './create-job-req.page';
import { SharedComponentsModule } from "../../shared-components/shared-components.module";
let CreateJobReqPageModule = class CreateJobReqPageModule {
};
CreateJobReqPageModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            CreateJobReqPageRoutingModule,
            SharedComponentsModule
        ],
        declarations: [CreateJobReqPage]
    })
], CreateJobReqPageModule);
export { CreateJobReqPageModule };
//# sourceMappingURL=create-job-req.module.js.map