import { Image } from '../image.entity';

export class ImageListResponse {
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
