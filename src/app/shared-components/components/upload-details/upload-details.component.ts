import {Component, Input, OnInit} from '@angular/core';
import {FileUpload} from "../../../shared/models/file-upload";
import {FileUploadService} from "../../../shared/services/file-upload.service";

@Component({
  selector: 'app-job-req-details',
  templateUrl: './upload-details.component.html',
  styleUrls: ['./upload-details.component.scss'],
})
export class UploadDetailsComponent implements OnInit {
  @Input() fileUpload!: FileUpload;
  constructor(private uploadService: FileUploadService) { }

  ngOnInit() {
    console.log('files uploaded', this.fileUpload);
  }

  deleteFileUpload(fileUpload: FileUpload): void {
    this.uploadService.deleteFile(fileUpload);
  }

}
