import {
  BodyParams,
  Controller,
  Delete,
  Get,
  HeaderParams,
  Inject,
  MulterOptions,
  MultipartFile,
  PathParams,
  PlatformMulterFile,
  Post,
} from '@tsed/common';
import { Authorize } from '@tsed/passport';

import { ImageService } from '../application/classes/ImageService';
import { UserTypes } from '../domain/User';
import { Roles } from '../middlewares/Roles';

@Controller('/images')
export class ImageController {
  @Inject(ImageService)
  private readonly imageService: ImageService;

  @Get('/')
  GetAll() {
    return this.imageService.ListImages();
  }

  @Get('/:id')
  @Roles([UserTypes.NORMAL])
  @Authorize('jwt')
  Get(@HeaderParams('auth') auth: string, @PathParams('id') id: string) {
    return this.imageService.GetImageById(id);
  }

  @Post('/:adId')
  @Roles([UserTypes.NORMAL])
  @Authorize('jwt')
  Post(@HeaderParams('auth') auth: string, @PathParams('adId') adId: string, @MultipartFile('image') image: PlatformMulterFile) {
    return this.imageService.SaveImage(image, adId);
  }

  @Delete('/:id')
  @Roles([UserTypes.NORMAL])
  @Authorize('jwt')
  async Delete(@HeaderParams('auth') auth: string, @PathParams('id') id: string) {
    await this.imageService.DeleteImage(id);
  }
}
