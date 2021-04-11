import {
  Controller, Delete, Get, Inject, PathParams, Post,
} from '@tsed/common';
import { Returns } from '@tsed/schema';

import { WishListService } from '../application/classes/WishListService';

@Controller('/wish-list')
export class WishesListController {
  @Inject(WishListService)
  private wishListService: WishListService;

  @Get('/:userId')
  GetAll(@PathParams('userId') id: string) {
    return this.wishListService.GetList(id);
  }

  @Post('/:userId/:adId')
  @Returns(200)
  Post(@PathParams('userId') userId: string, @PathParams('adId') adId: string) {
    return this.wishListService.AddAdOnList(userId, adId);
  }

  @Delete('/:userId/:adId')
  async Delete(@PathParams('userId') userId: string, @PathParams('adId') adId: string) {
    return this.wishListService.RemoveAdFromList(userId, adId);
  }
}
