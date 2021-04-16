import {
  Controller, Get, HeaderParams, Inject, PathParams, Post,
} from '@tsed/common';
import { Authorize } from '@tsed/passport';

import { PurchaseService } from '../application/PurchaseService';
import { Feedback } from '../domain/Purchase';
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

  @Post('/:id/:feedback')
  @Roles([UserTypes.NORMAL])
  @Authorize('jwt')
  PostFeedback(@HeaderParams('auth') auth: string, @PathParams('id') id: string, @PathParams('feedback') feedback: Feedback) {
    const userId = JwtProtocol.getUserIdFromToken(auth);
    return this.purchaseService.SaveFeedback(id, userId, feedback);
  }

  @Post('/:adId')
  @Roles([UserTypes.NORMAL])
  @Authorize('jwt')
  PostPurchase(@HeaderParams('auth') auth: string, @PathParams('adId') adId: string) {
    const userId = JwtProtocol.getUserIdFromToken(auth);
    return this.purchaseService.DoPurchase(adId, userId);
  }
}
