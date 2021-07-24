import { Controller, Get, Param, Res } from '@nestjs/common';
import { ResourceService } from './resource.service';

@Controller('/resource')
export class ResourceController {
  constructor(private readonly resourceService: ResourceService) {}

  @Get('/image/:imgpath')
  getUploadedImage(@Param('imgpath') imageName, @Res() res) {
    return this.resourceService.getUploadedFile(imageName, res);
  }
}
