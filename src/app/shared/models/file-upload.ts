export class FileUpload {
  key: string;
  name: string;
  url: string;
  file: File;

  constructor(file: File) {
    this.file = file;
  }
}

export class FilesUpload {
  key: string;
  name: string;
  url: string;
  files: FileList;

  constructor(files: FileList) {
    this.files = files;
  }
}
