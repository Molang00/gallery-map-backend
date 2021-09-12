import { Injectable, InternalServerErrorException } from '@nestjs/common';
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
import {
  ImageListResponse,
  ImageResponse,
  UploadImageResponse,
} from './model/image-list.model';
import { S3 } from 'aws-sdk';
import { exception } from 'console';

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

  async uploadFile(file: Express.Multer.File): Promise<UploadImageResponse> {
    const res = {
      image: this.convertImage2ImageItem(file),
      meta: this.convertImageMeta2ImageMetaItem(
        this.getMetadataByImageName(file.filename),
      ),
    };
    console.log(res);

    const image = new Image(
      res.image.filename,
      res.meta.GPSLatitude,
      res.meta.GPSLongitude,
      res.meta.width,
      res.meta.height,
      new Date(res.meta.CreateDate * 1000),
      new Date(),
    );
    if (
      image.lat == undefined ||
      image.lng == undefined ||
      image.createDate == undefined
    ) {
      console.log(file.originalname + ': lat or lng or createdate is null!');
      return undefined;
    }

    try {
      await this.uploadS3(
        './resource/image/' + file.filename,
        process.env.AWS_S3_BUCKET_NAME,
        'image/' + file.filename,
      ).catch((reason) => {
        throw new InternalServerErrorException(reason);
      });

      await this.imageRepository.save(image);

      return new UploadImageResponse(file.originalname, image);
    } catch (e) {
      console.log(e);
      return undefined;
    }
  }

  async uploadS3(localFileName, bucket, uploadFileName) {
    const s3 = this.getS3();
    const params = {
      Bucket: bucket,
      Key: String(uploadFileName),
      Body: fs.readFileSync(localFileName),
      ACL: 'public-read',
    };

    // console.log(params);
    return new Promise((resolve, reject) => {
      s3.upload(params, (err, data) => {
        if (err) {
          console.log(err);
          reject(err.message);
        }
        console.log(data);
        resolve(data);
      });
    });
  }

  getS3() {
    console.log(process.env.AWS_ACCESS_KEY_ID);
    return new S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });
  }

  async uploadFileList(
    files: Express.Multer.File[],
  ): Promise<ImageListResponse> {
    const imageList = [];
    const total = files.length;
    let success = 0,
      fail = 0;
    console.log('start uploading file list');

    await Promise.all(
      files.map(async (file) => {
        const oneFileRes = await this.uploadFile(file);
        if (oneFileRes != undefined) {
          imageList.push(oneFileRes);
          success++;
        } else {
          fail++;
        }
      }),
    );
    return new ImageListResponse(imageList, total, success, fail);
  }

  getMetadataByImageName(imageName: string): any {
    // const exif = require('exif-parser');
    // const fs = require('fs');
    const file = './resource/image/' + imageName;
    const buffer = fs.readFileSync(file);
    const parser = ExifParserFactory.create(buffer);
    const result = parser.parse();
    console.log(result);
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
        console.log(raw.map((it) => new ImageResponse(it)));
        return raw.map((it) => new ImageResponse(it));
      });
    return rst;
  }
}
