import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { map } from "rxjs/operators";
let UploadListComponent = class UploadListComponent {
    constructor(uploadService) {
        this.uploadService = uploadService;
    }
    ngOnInit() {
        this.uploadService.getFiles(6).snapshotChanges().pipe(map(changes => 
        // store the key
        changes.map(c => (Object.assign({ key: c.payload.key }, c.payload.val()))))).subscribe(fileUploads => {
            this.fileUploads = fileUploads;
        });
    }
};
UploadListComponent = __decorate([
    Component({
        selector: 'app-upload-list',
        templateUrl: './upload-list.component.html',
        styleUrls: ['./upload-list.component.scss'],
    })
], UploadListComponent);
export { UploadListComponent };
//# sourceMappingURL=upload-list.component.js.map