import { Module } from '@nestjs/common';
import { ImageController } from './image.controller';
import { ImageDevController } from './image.dev.controller';
import { ImageDevService } from './image.dev.service';
import { ImageService } from './image.service';

@Module({
  controllers: [ImageController, ImageDevController],
  providers: [ImageService, ImageDevService],
})
export class ImageModule {}
