import {
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ImageDevService } from './image.dev.service';
import { editFileName, imageFileFilter } from './image.util';

@Controller('image/dev')
export class ImageDevController {
  constructor(private readonly imageService: ImageDevService) {}

  @Get('/info')
  findInfo(): any {
    return this.imageService.findInfo();
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
  async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<any> {
    return this.imageService.uploadFile(file);
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
  async uploadMultipleFiles(@UploadedFiles() files) {
    return this.imageService.uploadFileList(files);
  }

  @Get('/meta/:imgpath')
  getMetadata(@Param('imgpath') imageName): any {
    return this.imageService.getMetadataByImageName(imageName);
  }

  @Get(':imgpath')
  getUploadedFile(@Param('imgpath') imageName, @Res() res) {
    return this.imageService.getUploadedFile(imageName, res);
  }
}
