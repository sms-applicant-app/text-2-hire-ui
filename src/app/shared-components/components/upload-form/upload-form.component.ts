import {EventEmitter, Component, Input, OnInit, Output} from '@angular/core';
import {FileUpload} from '../../../shared/models/file-upload';
import {FileUploadService} from '../../../shared/services/file-upload.service';



@Component({
  selector: 'app-upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.scss'],
})
export class UploadFormComponent implements OnInit {
  @Input() franchiseId: string;
  @Input() storeId: string;
  @Output() formAddedEvent = new EventEmitter<FileUpload>();
  selectedFiles?: FileList;
  currentFileUpload?: FileUpload;
  percentage = 0;
  constructor(private uploadService: FileUploadService) { }

  ngOnInit() {
    console.log('store id', this.storeId);
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  upload(): void {
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      this.selectedFiles = undefined;

      if (file) {
        const path = this.storeId;
        this.currentFileUpload = new FileUpload(file);
        this.uploadService.pushFileToStorage(path, this.currentFileUpload).subscribe(
          percentage => {
            this.percentage = Math.round(percentage ? percentage : 0);
            this.sendUploadedFormMessage();
          },
          error => {
            console.log(error);
          }
        );
      }
    }
  }
  sendUploadedFormMessage(){
    this.formAddedEvent.emit(this.currentFileUpload);
  }

}
