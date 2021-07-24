import { Injectable } from '@nestjs/common';

@Injectable()
export class ResourceService {
  getUploadedFile(imageName: string, res: any) {
    res.sendFile(imageName, {
      root: './resource/image',
    });
  }
}
