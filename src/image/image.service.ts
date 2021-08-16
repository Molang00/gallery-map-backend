import { Injectable } from '@nestjs/common';
import { ExifParserFactory } from 'ts-exif-parser';
import * as fs from 'fs';
import {
  ImageData,
  ImageFile,
  ImageItem,
  ImageMeta,
  ImageMetaItem,
  UploadImageRes,
} from './model/image-file.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Image } from './image.entity';
import { Repository } from 'typeorm';
import { ImageListResponse, ImageResponse } from './model/image-list.model';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image)
    private imageRepository: Repository<Image>,
  ) {
    this.imageRepository = imageRepository;
  }

  convertImage2ImageItem(image: ImageData): ImageItem {
    return {
      filename: image.filename,
      fieldname: image.fieldname,
      originalname: image.originalname,
    };
  }

  convertImageMeta2ImageMetaItem(imageMeta: ImageMeta): ImageMetaItem {
    // image is rotated when Orientation is over 4 (google it, exif orientation)
    if (imageMeta.tags.Orientation > 4)
      return {
        GPSLatitude: imageMeta.tags.GPSLatitude,
        GPSLongitude: imageMeta.tags.GPSLongitude,
        height: imageMeta.tags.ExifImageWidth,
        width: imageMeta.tags.ExifImageHeight,
        CreateDate: imageMeta.tags.CreateDate,
      };
    else
      return {
        GPSLatitude: imageMeta.tags.GPSLatitude,
        GPSLongitude: imageMeta.tags.GPSLongitude,
        height: imageMeta.tags.ExifImageHeight,
        width: imageMeta.tags.ExifImageWidth,
        CreateDate: imageMeta.tags.CreateDate,
      };
  }

  getImageInfo(file: Express.Multer.File): ImageFile {
    return {
      image: file,
      meta: this.getMetadataByImageName(file.filename),
    };
  }

  uploadFile(file: Express.Multer.File): ImageResponse {
    const res = {
      image: this.convertImage2ImageItem(file),
      meta: this.convertImageMeta2ImageMetaItem(
        this.getMetadataByImageName(file.filename),
      ),
    };

    const image = new Image(
      res.image.filename,
      res.meta.GPSLatitude,
      res.meta.GPSLongitude,
      res.meta.width,
      res.meta.height,
      new Date(res.meta.CreateDate * 1000),
      new Date(),
    );
    try {
      this.imageRepository.save(image);
    } catch (e) {
      console.log(e);
      return undefined;
    }

    return new ImageResponse(image);
  }

  uploadFileList(files: Express.Multer.File[]): ImageListResponse {
    const imageList = [];
    const total = files.length;
    let success = 0,
      fail = 0;
    files.forEach((file) => {
      const oneFileRes = this.uploadFile(file);
      if (oneFileRes != undefined) {
        imageList.push(oneFileRes);
        success++;
      } else {
        fail++;
      }
    });
    return new ImageListResponse(imageList, total, success, fail);
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

  getImageListByView(query: imageListByViewQuery): Promise<ImageResponse[]> {
    const rst = this.imageRepository
      .createQueryBuilder('image')
      .where('image.lat < :topLat', { topLat: query.topLat })
      .andWhere('image.lat > :bottomLat', { bottomLat: query.bottomLat })
      .andWhere('image.lng > :leftLng', { leftLng: query.leftLng })
      .andWhere('image.lng < :rightLng', { rightLng: query.rightLng })
      .getRawMany()
      .then((raw) => {
        return raw.map((it) => new ImageResponse(it));
      });
    return rst;
  }
}
