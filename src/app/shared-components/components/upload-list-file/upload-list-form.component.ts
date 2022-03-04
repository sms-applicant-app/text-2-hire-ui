import {EventEmitter, Component, Input, OnInit, Output} from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { FileItem } from '../../../shared/models/file-item';
import {FileUpload} from '../../../shared/models/file-upload';
import {FileUploadService} from '../../../shared/services/file-upload.service';

@Component({
  selector: 'app-upload-list-form',
  templateUrl: './upload-list-form.component.html',
  styleUrls: ['./upload-list-form.component.scss'],
})
export class UploadListFormComponent implements OnInit {
  @Input() franchiseId: string;
  @Input() storeId: string;
  @Output() uploadCompleteEvent = new EventEmitter<FileUpload[]>();
  selectedFiles: FileItem[] = [];

  constructor(
    private firestore: AngularFireDatabase, 
    private storage: AngularFireStorage) { }

  ngOnInit() {

  }

  selectFile(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      let listFile = Array.from(event.target.files) as Array<Blob>;
      for(let i = 0; i < listFile.length; i++) {
        const file =listFile[i] as File;
        this.selectedFiles.push({
          file: file,
          name: file.name,
          size: parseFloat((file.size / 1024 / 1024).toFixed(2)),
          uploadPercent: 0
        });
      }
    }
  }

  removeFile(index: number) {
    this.selectedFiles.splice(index, 1);
  }

  upload(): void {
    if(this.selectedFiles && this.selectedFiles.length > 0) {
      const basePath = this.storeId.toString();
      const uploadFilesPromise = this.selectedFiles.map(fileItem => {
        return new Promise(resolve => {
            const fileUpload = new FileUpload(fileItem.file);
            const filePath = `${basePath}/${fileUpload.file.name}`;
            const storageRef = this.storage.ref(filePath);
            const uploadTask = this.storage.upload(filePath, fileUpload.file);

            uploadTask.snapshotChanges().pipe(
              finalize(() => {
                storageRef.getDownloadURL().subscribe(downloadURL => {
                  fileUpload.url = downloadURL;
                  fileUpload.name = fileUpload.file.name;
                  this.firestore.list(basePath).push(fileUpload);
                  resolve(fileUpload);
                });
              })
            ).subscribe();

            uploadTask.percentageChanges().subscribe(
              percentage => {
                fileItem.uploadPercent = Math.round(percentage ? percentage : 0);
              },
              error => {
                console.log(error);
              }
            );
        });
      });

      Promise.all(uploadFilesPromise).then((values: FileUpload[]) => {
        this.uploadCompleteEvent.emit(values);
        this.selectedFiles = [];
      });
    }
  }
}
