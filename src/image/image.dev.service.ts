import { Injectable } from '@nestjs/common';
import { FileResponse } from './image.model';

@Injectable()
export class ImageDevService {
  constructor() {}

  findInfo(): any {
    return 'success';
  }

  uploadFile(file: Express.Multer.File): FileResponse {
    console.log(file);
    return {
      originalname: file.originalname,
      filename: file.filename,
    };
  }

  uploadFileList(files: Express.Multer.File[]): FileResponse[] {
    const response = [];
    files.forEach((file) => {
      response.push(this.uploadFile(file));
    });
    return response;
  }

  getUploadedFile(imageName: string, res: any) {
    return res.sendFile(imageName, { root: './resource/image' });
  }
}
