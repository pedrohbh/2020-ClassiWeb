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
  Response,
} from '@tsed/common';
import { Authorize } from '@tsed/passport';

import fs from 'fs';
import multer from 'multer';
import path from 'path';

import { ImageService } from '../application/ImageService';
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

  // @Get('/:id')
  // @Roles([UserTypes.NORMAL])
  // @Authorize('jwt')
  // Get(
  // @HeaderParams('auth') auth: string,
  // @PathParams('id') id: string,
  // ) {
  // return this.imageService.GetImageById(id);
  // }

  @Post('/:adId')
  @Roles([UserTypes.NORMAL])
  @Authorize('jwt')
  @MulterOptions({
    storage: multer.diskStorage({
      destination: path.join(__dirname, '../../uploads'),
      filename: (request, file, cb) => {
        const hash = `${Math.random()}`.replace('0.', '');

        cb(null, `${hash}-${file.originalname}`);
      },
    }),
  })
  async Post(@HeaderParams('auth') auth: string, @PathParams('adId') adId: string, @MultipartFile('image') image: PlatformMulterFile) {
    return this.imageService.SaveImage({ filename: image.filename }, adId);
  }

  @Delete('/:id')
  @Roles([UserTypes.NORMAL])
  @Authorize('jwt')
  async Delete(@HeaderParams('auth') auth: string, @PathParams('id') id: string) {
    const filename = await this.imageService.DeleteImage(id);

    /* Exclui o arquivo local */
    fs.unlink(path.join(__dirname, `../../uploads/${filename}`), (error) => {
      if (error) {
        throw error;
      }
    });

    return { message: 'Arquivo excluido com sucesso' };
  }
}
