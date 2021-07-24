export interface UploadImageRes {
  image: ImageItem;
  meta: ImageMetaItem;
}

export interface ImageFile {
  image: ImageData;
  meta: ImageMeta;
}

export interface ImageItem {
  filename: string;
  fieldname: string;
  originalname: string;
}

export interface ImageData {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
}

export interface ImageMetaItem {
  GPSLatitude: number;
  GPSLongitude: number;
  height: number;
  width: number;
  CreateDate: number;
}

export interface ImageMeta {
  startMarker: StartMarker;
  tags: Tags;
  imageSize: ImageSize;
  thumbnailType: number;
  app1Offset: number;
}

export interface StartMarker {
  offset: number;
}

export interface Tags {
  ImageHeight: number;
  Make: string;
  Orientation: number;
  ModifyDate: number;
  YResolution: number;
  XResolution: number;
  ImageWidth: number;
  Model: string;
  Software: string;
  YCbCrPositioning: number;
  ResolutionUnit: number;
  GPSLatitude: number;
  GPSLatitudeRef: string;
  GPSLongitude: number;
  GPSLongitudeRef: string;
  ApertureValue: number;
  ExifVersion: string;
  ExposureCompensation: number;
  ExposureProgram: number;
  ColorSpace: number;
  ImageUniqueID: string;
  MaxApertureValue: number;
  ExifImageHeight: number;
  BrightnessValue: number;
  DateTimeOriginal: number;
  WhiteBalance: number;
  ExposureMode: number;
  ExposureTime: number;
  undefined: string;
  Flash: number;
  FNumber: number;
  ISO: number;
  ExifImageWidth: number;
  FocalLengthIn35mmFormat: number;
  DigitalZoomRatio: number;
  CreateDate: number;
  ShutterSpeedValue: number;
  FocalLength: number;
  MeteringMode: number;
  SceneCaptureType: number;
  LightSource: number;
}

export interface ImageSize {
  height: number;
  width: number;
}
