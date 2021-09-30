import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
import { FileUpload } from '../../../shared/models/file-upload';
let UploadFormComponent = class UploadFormComponent {
    constructor(uploadService) {
        this.uploadService = uploadService;
        this.percentage = 0;
    }
    ngOnInit() { }
    selectFile(event) {
        this.selectedFiles = event.target.files;
    }
    upload() {
        if (this.selectedFiles) {
            const file = this.selectedFiles.item(0);
            this.selectedFiles = undefined;
            if (file) {
                this.currentFileUpload = new FileUpload(file);
                this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe(percentage => {
                    this.percentage = Math.round(percentage ? percentage : 0);
                }, error => {
                    console.log(error);
                });
            }
        }
    }
};
__decorate([
    Input()
], UploadFormComponent.prototype, "franchiseId", void 0);
__decorate([
    Input()
], UploadFormComponent.prototype, "storeId", void 0);
UploadFormComponent = __decorate([
    Component({
        selector: 'app-upload-form',
        templateUrl: './upload-form.component.html',
        styleUrls: ['./upload-form.component.scss'],
    })
], UploadFormComponent);
export { UploadFormComponent };
//# sourceMappingURL=upload-form.component.js.map