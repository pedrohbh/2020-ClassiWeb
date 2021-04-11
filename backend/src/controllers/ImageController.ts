import { BodyParams, Controller, Get, Inject, Post } from '@tsed/common';

import { ImageService } from '../application/classes/ImageService';

@Controller('/images')
export class ImageController {
  @Inject(ImageService)
  private readonly imageService: ImageService;

  @Get('/')
  GetAll() {
    return this.imageService.ListImages();
  }

  @Post('/')
  Post(@BodyParams() base64: any) {
    console.log(base64);
    return base64;

    // return this.imageService.SaveImage(base64);
  }
}
