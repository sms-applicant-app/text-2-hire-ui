import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { finalize } from "rxjs/operators";
let FileUploadService = class FileUploadService {
    constructor(firestore, storage) {
        this.firestore = firestore;
        this.storage = storage;
    }
    getFiles(path, numberItems) {
        return this.firestore.list(path, ref => ref.limitToLast(numberItems));
    }
    deleteFile(fileUpload) {
        this.deleteFileDatabase(fileUpload.key)
            .then(() => {
            this.deleteFileStorage(fileUpload.name);
        })
            .catch(error => console.log(error));
    }
    pushFileToStorage(basePath, fileUpload) {
        this.basePath = basePath;
        const filePath = `${this.basePath}/${fileUpload.file.name}`;
        const storageRef = this.storage.ref(filePath);
        const uploadTask = this.storage.upload(filePath, fileUpload.file);
        uploadTask.snapshotChanges().pipe(finalize(() => {
            storageRef.getDownloadURL().subscribe(downloadURL => {
                fileUpload.url = downloadURL;
                fileUpload.name = fileUpload.file.name;
                this.saveFileData(fileUpload);
            });
        })).subscribe();
        return uploadTask.percentageChanges();
    }
    saveFileData(fileUpload) {
        this.firestore.list(this.basePath).push(fileUpload);
    }
    deleteFileDatabase(key) {
        return this.firestore.list(this.basePath).remove(key);
    }
    deleteFileStorage(name) {
        const storageRef = this.storage.ref(this.basePath);
        storageRef.child(name).delete();
    }
};
FileUploadService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], FileUploadService);
export { FileUploadService };
//# sourceMappingURL=file-upload.service.js.map