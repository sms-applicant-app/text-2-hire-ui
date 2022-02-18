export interface FileItem {
  file: File,
  name: string,
  size: number,
  uploadPercent: number,
  downloadUrl?: string
}