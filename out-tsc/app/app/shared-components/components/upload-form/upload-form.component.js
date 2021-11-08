import { __decorate } from "tslib";
import { EventEmitter, Component, Input, Output } from '@angular/core';
import { FileUpload } from '../../../shared/models/file-upload';
let UploadFormComponent = class UploadFormComponent {
    constructor(uploadService) {
        this.uploadService = uploadService;
        this.formAddedEvent = new EventEmitter();
        this.uploadCompleteEvent = new EventEmitter();
        this.percentage = 0;
    }
    ngOnInit() {
        console.log('store id', this.storeId, this.uploadCompleteEvent);
    }
    selectFile(event) {
        this.selectedFiles = event.target.files;
    }
    upload() {
        if (this.selectedFiles) {
            const file = this.selectedFiles.item(0);
            this.selectedFiles = undefined;
            if (file) {
                const path = this.storeId;
                this.currentFileUpload = new FileUpload(file);
                this.uploadService.pushFileToStorage(path, this.currentFileUpload).subscribe(percentage => {
                    this.percentage = Math.round(percentage ? percentage : 0);
                    this.sendUploadedFormMessage(this.percentage);
                }, error => {
                    console.log(error);
                });
            }
        }
    }
    sendUploadedFormMessage(p) {
        this.formAddedEvent.emit(this.currentFileUpload);
        this.uploadCompleteEvent.emit(p);
    }
};
__decorate([
    Input()
], UploadFormComponent.prototype, "franchiseId", void 0);
__decorate([
    Input()
], UploadFormComponent.prototype, "storeId", void 0);
__decorate([
    Output()
], UploadFormComponent.prototype, "formAddedEvent", void 0);
__decorate([
    Output()
], UploadFormComponent.prototype, "uploadCompleteEvent", void 0);
UploadFormComponent = __decorate([
    Component({
        selector: 'app-upload-form',
        templateUrl: './upload-form.component.html',
        styleUrls: ['./upload-form.component.scss'],
    })
], UploadFormComponent);
export { UploadFormComponent };
//# sourceMappingURL=upload-form.component.js.map