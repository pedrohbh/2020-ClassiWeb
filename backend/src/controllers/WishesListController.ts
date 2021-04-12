import {
  Controller, Delete, Get, HeaderParams, Inject, PathParams, Post,
} from '@tsed/common';
import { Authorize } from '@tsed/passport';

import { WishListService } from '../application/classes/WishListService';
import { UserTypes } from '../domain/User';
import { Roles } from '../middlewares/Roles';

@Controller('/wish-list')
export class WishesListController {
  @Inject(WishListService)
  private wishListService: WishListService;

  @Get('/:userId')
  @Roles([UserTypes.NORMAL])
  @Authorize('jwt')
  GetAll(@HeaderParams('auth') auth: string, @PathParams('userId') id: string) {
    return this.wishListService.GetList(id);
  }

  @Post('/:userId/:adId')
  @Roles([UserTypes.NORMAL])
  @Authorize('jwt')
  Post(
    @HeaderParams('auth') auth: string,
    @PathParams('userId') userId: string,
    @PathParams('adId') adId: string,
  ) {
    return this.wishListService.AddAdOnList(userId, adId);
  }

  @Delete('/:userId/:adId')
  @Roles([UserTypes.NORMAL])
  @Authorize('jwt')
  async Delete(
    @HeaderParams('auth') auth: string,
    @PathParams('userId') userId: string,
    @PathParams('adId') adId: string,
  ) {
    return this.wishListService.RemoveAdFromList(userId, adId);
  }
}
