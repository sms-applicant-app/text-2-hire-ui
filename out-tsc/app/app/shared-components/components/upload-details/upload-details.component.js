import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
let UploadDetailsComponent = class UploadDetailsComponent {
    constructor(uploadService) {
        this.uploadService = uploadService;
    }
    ngOnInit() {
        console.log('files uploaded', this.fileUpload);
    }
    deleteFileUpload(fileUpload) {
        this.uploadService.deleteFile(fileUpload);
    }
};
__decorate([
    Input()
], UploadDetailsComponent.prototype, "fileUpload", void 0);
UploadDetailsComponent = __decorate([
    Component({
        selector: 'app-job-req-details',
        templateUrl: './upload-details.component.html',
        styleUrls: ['./upload-details.component.scss'],
    })
], UploadDetailsComponent);
export { UploadDetailsComponent };
//# sourceMappingURL=upload-details.component.js.map