import {
  BodyParams,
  Controller, Get, Inject, PathParams, Post,
} from '@tsed/common';
import { Returns } from '@tsed/schema';

import { FeedbackBody, PurchaseService } from '../application/classes/PurchaseService';
import { Purchase } from '../domain/Purchase';

@Controller('/purchases')
export class PurchaseController {
  @Inject(PurchaseService)
  private purchaseService: PurchaseService;

  @Get('/:userId')
  GetAll(@PathParams('userId') userId: string) {
    return this.purchaseService.GetUserPurchases(userId);
  }

  @Post('/feedback/:id')
  @Returns(200, Purchase)
  PostFeedback(@PathParams('id') id: string, @BodyParams() body: FeedbackBody) {
    return this.purchaseService.SaveFeedback(id, body);
  }

  @Post('/:adId/:userId')
  @Returns(200, Purchase)
  PostPurchase(@PathParams('adId') adId: string, @PathParams('userId') userId: string) {
    return this.purchaseService.DoPurchase(adId, userId);
  }
}
