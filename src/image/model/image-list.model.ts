import { Image } from '../image.entity';
export class UploadImageResponse {
  originalFileName: string;
  path: string;
  lat: number;
  lng: number;
  height: number;
  width: number;
  createDate: Date;
  uploaded: Date;

  constructor(originalFileName, image) {
    this.originalFileName = originalFileName;
    this.path = image.path;
    this.lat = image.lat;
    this.lng = image.lng;
    this.height = image.height;
    this.width = image.width;
    this.createDate = image.createDate;
    this.uploaded = image.uploaded;
  }
}

export class ImageResponse {
  path: string;
  lat: number;
  lng: number;
  height: number;
  width: number;
  createDate: Date;
  uploaded: Date;

  constructor(image) {
    this.path = image.image_path;
    this.lat = image.image_lat;
    this.lng = image.image_lng;
    this.height = image.image_height;
    this.width = image.image_width;
    this.createDate = image.image_createDate;
    this.uploaded = image.image_uploaded;
  }
}

export class ImageListResponse {
  imageList: UploadImageResponse[];
  total: number;
  success: number;
  fail: number;

  constructor(
    imageList: UploadImageResponse[],
    total: number,
    success: number,
    fail: number,
  ) {
    this.imageList = imageList;
    this.total = total;
    this.success = success;
    this.fail = fail;
  }
}
