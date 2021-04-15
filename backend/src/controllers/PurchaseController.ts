import { BodyParams, Controller, Get, HeaderParams, Inject, PathParams, Post } from '@tsed/common';
import { Authorize } from '@tsed/passport';

import { FeedbackBody, PurchaseService } from '../application/PurchaseService';
import { UserTypes } from '../domain/User';
import { Roles } from '../middlewares/Roles';
import { JwtProtocol } from '../protocols/JwtProtocol';

@Controller('/purchases')
export class PurchaseController {
  @Inject(PurchaseService)
  private purchaseService: PurchaseService;

  @Get('/')
  @Roles([UserTypes.NORMAL])
  @Authorize('jwt')
  GetAll(@HeaderParams('auth') auth: string) {
    const userId = JwtProtocol.getUserIdFromToken(auth);
    return this.purchaseService.GetUserPurchases(userId);
  }

  @Post('/feedback/:id')
  @Roles([UserTypes.NORMAL])
  @Authorize('jwt')
  PostFeedback(@HeaderParams('auth') auth: string, @PathParams('id') id: string, @BodyParams() body: FeedbackBody) {
    return this.purchaseService.SaveFeedback(id, body);
  }

  @Post('/:adId')
  @Roles([UserTypes.NORMAL])
  @Authorize('jwt')
  PostPurchase(@HeaderParams('auth') auth: string, @PathParams('adId') adId: string) {
    const userId = JwtProtocol.getUserIdFromToken(auth);
    return this.purchaseService.DoPurchase(adId, userId);
  }
}
