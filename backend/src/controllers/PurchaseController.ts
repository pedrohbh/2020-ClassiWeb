import {
  BodyParams,
  Controller, Get, HeaderParams, Inject, PathParams, Post,
} from '@tsed/common';
import { Authorize } from '@tsed/passport';

import { FeedbackBody, PurchaseService } from '../application/classes/PurchaseService';
import { UserTypes } from '../domain/User';
import { Roles } from '../middlewares/Roles';

@Controller('/purchases')
export class PurchaseController {
  @Inject(PurchaseService)
  private purchaseService: PurchaseService;

  @Get('/:userId')
  @Roles([UserTypes.NORMAL])
  @Authorize('jwt')
  GetAll(@HeaderParams('auth') auth: string, @PathParams('userId') userId: string) {
    return this.purchaseService.GetUserPurchases(userId);
  }

  @Post('/feedback/:id')
  @Roles([UserTypes.NORMAL])
  @Authorize('jwt')
  PostFeedback(
    @HeaderParams('auth') auth: string,
    @PathParams('id') id: string,
    @BodyParams() body: FeedbackBody,
  ) {
    return this.purchaseService.SaveFeedback(id, body);
  }

  @Post('/:adId/:userId')
  @Roles([UserTypes.NORMAL])
  @Authorize('jwt')
  PostPurchase(
    @HeaderParams('auth') auth: string,
    @PathParams('adId') adId: string,
    @PathParams('userId') userId: string,
  ) {
    return this.purchaseService.DoPurchase(adId, userId);
  }
}
