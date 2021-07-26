import { Image } from '../image.entity';

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
  imageList: ImageResponse[];
  total: number;
  success: number;
  fail: number;

  constructor(
    imageList: ImageResponse[],
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
