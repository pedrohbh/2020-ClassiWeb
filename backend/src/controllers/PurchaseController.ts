import {
  Controller, Get, Inject, PathParams, Post,
} from '@tsed/common';
import { Returns } from '@tsed/schema';

import { PurchaseService } from '../application/classes/PurchaseService';

@Controller('/purchases')
export class PurchaseController {
  @Inject(PurchaseService)
  private purchaseService: PurchaseService;

  @Get('/:userId')
  GetAll(@PathParams('userId') userId: string) {
    return this.purchaseService.GetUserPurchases(userId);
  }

  @Post('/:adId/:userId')
  @Returns(200)
  PostPurchase(@PathParams('adId') adId: string, @PathParams('userId') userId: string) {
    return this.purchaseService.DoPurchase(userId, adId);
  }

  @Post('/:adId/:userId')
  @Returns(200)
  PostFeedback(@PathParams('adId') adId: string, @PathParams('userId') userId: string) {
    return this.purchaseService.DoPurchase(userId, adId);
  }
}
