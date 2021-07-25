import { Injectable } from '@nestjs/common';
import { ExifData, ExifParserFactory } from 'ts-exif-parser';
import * as fs from 'fs';
import {
  ImageData,
  ImageFile,
  ImageItem,
  ImageMeta,
  ImageMetaItem,
  UploadImageRes,
} from './model/image-file.model';
import path from 'path/posix';
import { InjectRepository } from '@nestjs/typeorm';
import { Image } from './image.entity';
import { Repository } from 'typeorm';
import { ImageListResponse } from './model/image-list.model';

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
    return {
      GPSLatitude: imageMeta.tags.GPSLatitude,
      GPSLongitude: imageMeta.tags.GPSLongitude,
      height: imageMeta.imageSize.height,
      width: imageMeta.imageSize.width,
      CreateDate: imageMeta.tags.CreateDate,
    };
  }

  getImageInfo(file: Express.Multer.File): ImageFile {
    return {
      image: file,
      meta: this.getMetadataByImageName(file.filename),
    };
  }

  uploadFile(file: Express.Multer.File): Image {
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
    console.log(image);
    this.imageRepository.save(image);

    return image;
  }

  uploadFileList(files: Express.Multer.File[]): Image[] {
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

  getImageListByView(
    query: imageListByViewQuery,
  ): Promise<ImageListResponse[]> {
    console.log(query);
    const rst = this.imageRepository
      .createQueryBuilder('image')
      .where('image.lat < :topLat', { topLat: query.topLat })
      .andWhere('image.lat > :bottomLat', { bottomLat: query.bottomLat })
      .andWhere('image.lng > :leftLng', { leftLng: query.leftLng })
      .andWhere('image.lng < :rightLng', { rightLng: query.rightLng })
      .getRawMany()
      .then((raw) => {
        return raw.map((it) => new ImageListResponse(it));
      });
    return rst;
  }
}
