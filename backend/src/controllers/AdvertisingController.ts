import {
  BodyParams, Controller, Delete, Get, HeaderParams, Inject, PathParams, Post, Put, Response,
} from '@tsed/common';
import { BadRequest, NotFound } from '@tsed/exceptions';
import { Authorize } from '@tsed/passport';
import { number } from '@tsed/schema';
import { EntityNotFoundError } from 'typeorm';

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


  @Get('/:id')
  async Get(@HeaderParams('auth') auth: string, @PathParams('id') id: string) {
    try {
      const ad = await this.adService.GetAdById(id);
      
      if (!auth) {
        return { ...ad, is_owner: false };
      }

      const userId = JwtProtocol.getUserIdFromToken(auth);
      return { ...ad, is_owner: ad.owner.id === userId };
    } catch (error) {
      if (error instanceof EntityNotFoundError) throw new NotFound('Anúncio não encontrado');
    }
  }

  @Get('/')
  @Roles([UserTypes.NORMAL])
  @Authorize('jwt')
  async GetUserAds(@HeaderParams('auth') auth: string) {
    const userID = JwtProtocol.getUserIdFromToken(auth);
    return await this.adService.GetAdsByUserId(userID);
  }

  @Post('/')
  @Roles([UserTypes.NORMAL])
  @Authorize('jwt')
  Post(@HeaderParams('auth') auth: string, @BodyParams() ad: Partial<Advertising>) {
    if (! ad.title)         throw new BadRequest('Campo título não preenchido');
    if (! ad.price)         throw new BadRequest('Campo preço não preenchido');
    if (! ad.category)      throw new BadRequest('Campo categoria não preenchido');
    if (! ad.address)       throw new BadRequest('Campo endereço não preenchido');
    if (! Number.isInteger(ad.quantity))      throw new BadRequest('Campo quantidade não preenchido');
    if (! Number.isInteger(ad.product_state)) throw new BadRequest('Campo estado do produto não preenchido');
    if (! Number.isInteger(ad.state))         throw new BadRequest('Campo estado do anúncio não preenchido');

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
    try {
      return this.adService.UpdateAd(id, ad);
    } catch (error) {
      if (error instanceof EntityNotFoundError) throw new NotFound('Anúncio não encontrado');
    }
  }

  @Delete('/:id')
  @Roles([UserTypes.NORMAL])
  @Authorize('jwt')
  async Delete(@HeaderParams('auth') auth: string, @PathParams('id') id: string) {
    try {
      await this.adService.DeleteAd(id);
    } catch (error) {
      if (error instanceof EntityNotFoundError) throw new NotFound('Anúncio não encontrado');
    }
  }
}
