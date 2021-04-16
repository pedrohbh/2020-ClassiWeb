import { Controller, Delete, Get, HeaderParams, Inject, PathParams, Post } from '@tsed/common';
import { NotFound } from '@tsed/exceptions';
import { Authorize } from '@tsed/passport';
import { EntityNotFoundError } from 'typeorm';

import { WishListService } from '../application/WishListService';
import { UserTypes } from '../domain/User';
import { Roles } from '../middlewares/Roles';
import { JwtProtocol } from '../protocols/JwtProtocol';

@Controller('/wish-list')
export class WishesListController {
  @Inject(WishListService)
  private wishListService: WishListService;

  @Get('/')
  @Roles([UserTypes.NORMAL])
  @Authorize('jwt')
  GetAll(@HeaderParams('auth') auth: string) {
    const userId = JwtProtocol.getUserIdFromToken(auth);
    return this.wishListService.GetList(userId);
  }

  @Post('/:adId')
  @Roles([UserTypes.NORMAL])
  @Authorize('jwt')
  Post(@HeaderParams('auth') auth: string, @PathParams('adId') adId: string) {
    try {
      const userId = JwtProtocol.getUserIdFromToken(auth);
      return this.wishListService.AddAdOnList(userId, adId);
    } catch (error) {
      if (error instanceof EntityNotFoundError) throw new NotFound('Anúncio não encontrado');
    }
  }

  @Delete('/:adId')
  @Roles([UserTypes.NORMAL])
  @Authorize('jwt')
  async Delete(@HeaderParams('auth') auth: string, @PathParams('adId') adId: string) {
    try {
      const userId = JwtProtocol.getUserIdFromToken(auth);
      return this.wishListService.RemoveAdFromList(userId, adId);
    } catch (error) {
      if (error instanceof EntityNotFoundError) throw new NotFound('Anúncio não encontrado');
    }
  }
}
