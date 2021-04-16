import { Controller, Delete, Get, HeaderParams, Inject, PathParams, Post } from '@tsed/common';
import { Authorize } from '@tsed/passport';

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
    const userId = JwtProtocol.getUserIdFromToken(auth);
    return this.wishListService.AddAdOnList(userId, adId);
  }

  @Delete('/:adId')
  @Roles([UserTypes.NORMAL])
  @Authorize('jwt')
  async Delete(@HeaderParams('auth') auth: string, @PathParams('adId') adId: string) {
    const userId = JwtProtocol.getUserIdFromToken(auth);
    return this.wishListService.RemoveAdFromList(userId, adId);
  }
}
