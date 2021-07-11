import { Injectable } from '@nestjs/common';

@Injectable()
export class ImageService {
  constructor() {}

  findAll(): any {
    return 'success';
  }
}
