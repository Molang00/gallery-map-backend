import {
  Controller,
  Get,
  Param,
  Post,
  Query,
  Res,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Image } from './image.entity';
import { ImageService } from './image.service';
import { editFileName, imageFileFilter } from './image.util';
import { ImageListResponse, ImageResponse } from './model/image-list.model';

@Controller('/image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post('/fileInfo')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './resource/image',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async getImageInfo(@UploadedFile() file: Express.Multer.File): Promise<any> {
    return this.imageService.getImageInfo(file);
  }

  @Post('/upload')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './resource/image',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<ImageResponse> {
    return await this.imageService.uploadFile(file);
  }

  @Post('/upload/list')
  @UseInterceptors(
    FilesInterceptor('image', 30, {
      storage: diskStorage({
        destination: './resource/image',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadMultipleFiles(
    @UploadedFiles() files,
  ): Promise<ImageListResponse> {
    return await this.imageService.uploadFileList(files);
  }

  @Get('/listByView')
  async test(@Query() query: imageListByViewQuery): Promise<ImageResponse[]> {
    return this.imageService.getImageListByView(query);
  }

  @Get('/meta/:imgpath')
  getMetadata(@Param('imgpath') imageName): any {
    return this.imageService.getMetadataByImageName(imageName);
  }
}
