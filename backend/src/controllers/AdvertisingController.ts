import {
  BodyParams, Controller, Delete, Get, HeaderParams, Inject, PathParams, Post, Put, Response,
} from '@tsed/common';
import { Authorize } from '@tsed/passport';

import { AdFilter, AdvertisingService } from '../application/AdvertisingService';
import { Advertising } from '../domain/Advertising';
import { UserTypes } from '../domain/User';
import { Roles } from '../middlewares/Roles';
import { JwtProtocol } from '../protocols/JwtProtocol';

@Controller('/ads')
export class AdvertisingController {
  @Inject(AdvertisingService)
  private adService: AdvertisingService;

  @Get('/list')
  async GetAll(@HeaderParams('page') page: number, @HeaderParams('page-size') pageSize: number, @Response() response: Response) {
    const [ads, total] = await this.adService.ListAllAds(page ?? 1, pageSize);
    response.setHeader('page-count', Math.ceil(+total / pageSize) || 1);

    return ads;
  }

  // @Get('/user')
  // async GetUserAds(@HeaderParams('auth') auth: string, @HeaderParams('page') page: number, @HeaderParams('page-size') pageSize: number, @Response() response: Response) {
  //   const [ads, total] = await this.adService.ListAllAds(page ?? 1, pageSize);
  //   response.setHeader('page-count', Math.ceil(+total / pageSize) || 1);

  //   return ads;
  // }

  @Get('/:id')
  async Get(@HeaderParams('auth') auth: string, @PathParams('id') id: string) {
    const ad = await this.adService.GetAdById(id);

    if (!auth) {
      return { ...ad, is_onwer: false };
    }

    const userId = JwtProtocol.getUserIdFromToken(auth);
    return { ...ad, is_onwer: ad.owner.id === userId };
  }

  @Get('/')
  @Roles([UserTypes.NORMAL])
  @Authorize('jwt')
  async GetUserAds(@HeaderParams('auth') auth: string) {
    const userID = JwtProtocol.getUserIdFromToken(auth);
    console.log(userID);
    return await this.adService.GetAdsByUserId(userID);
  }

  @Post('/')
  @Roles([UserTypes.NORMAL])
  @Authorize('jwt')
  Post(@HeaderParams('auth') auth: string, @BodyParams() ad: Partial<Advertising>) {
    ad.ownerId = JwtProtocol.getUserIdFromToken(auth);
    return this.adService.CreateAd(ad);
  }

  @Post('/search')
  async PostSearch(
    @HeaderParams('page') page: number,
    @HeaderParams('page-size') pageSize: number,
    @BodyParams() filter: Partial<AdFilter>,
    @Response() response: Response,
  ) {
    const [ads, total] = await this.adService.ListAdsWith(filter, page ?? 1, pageSize);
    response.setHeader('page-count', Math.ceil(+total / pageSize) || 1);

    return ads;
  }

  @Put('/:id')
  @Roles([UserTypes.NORMAL])
  @Authorize('jwt')
  Put(@HeaderParams('auth') auth: string, @PathParams('id') id: string, @BodyParams() ad: Partial<Advertising>) {
    return this.adService.UpdateAd(id, ad);
  }

  @Delete('/:id')
  @Roles([UserTypes.NORMAL])
  @Authorize('jwt')
  async Delete(@HeaderParams('auth') auth: string, @PathParams('id') id: string) {
    await this.adService.DeleteAd(id);
  }
}
