import { Injectable } from '@nestjs/common';
import { ExifData, ExifParserFactory } from 'ts-exif-parser';
import * as fs from 'fs';
import {
  Image,
  ImageItem,
  ImageMeta,
  ImageMetaItem,
  UploadImageRes,
} from './image.model';
import path from 'path/posix';

@Injectable()
export class ImageDevService {
  constructor() {}

  findInfo(): any {
    return 'success';
  }

  convertImage2ImageItem(image: Image): ImageItem {
    return {
      fieldname: image.fieldname,
      originalname: image.originalname,
      path: image.path,
    };
  }

  convertImageMeta2ImageMetaItem(imageMeta: ImageMeta): ImageMetaItem {
    return {
      GPSLatitude: imageMeta.tags.GPSLatitude,
      GPSLatitudeRef: imageMeta.tags.GPSLatitudeRef,
      GPSLongitude: imageMeta.tags.GPSLongitude,
      GPSLongitudeRef: imageMeta.tags.GPSLongitudeRef,
      timezone: imageMeta.tags.undefined,
    };
  }

  uploadFile(file: Express.Multer.File): UploadImageRes {
    return {
      image: this.convertImage2ImageItem(file),
      meta: this.convertImageMeta2ImageMetaItem(
        this.getMetadataByImageName(file.filename),
      ),
    };
  }

  uploadFileList(files: Express.Multer.File[]): UploadImageRes[] {
    const response = [];
    files.forEach((file) => {
      response.push(this.uploadFile(file));
    });
    return response;
  }

  getMetadataByImageName(imageName: string): any {
    // const exif = require('exif-parser');
    // const fs = require('fs');
    const file = './resource/image/' + imageName;
    const buffer = fs.readFileSync(file);
    const parser = ExifParserFactory.create(buffer);
    const result = parser.parse();
    return result;
  }

  getUploadedFile(imageName: string, res: any) {
    res.sendFile(imageName, { root: './resource/image' });
  }
}
