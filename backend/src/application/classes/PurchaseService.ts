import { Inject, Service } from '@tsed/di';
import { Unauthorized } from '@tsed/exceptions';

import { getConnection } from 'typeorm';

import { AdvertisingState } from '../../domain/Advertising';
import { AdvertisingDAO } from '../../persistence/AdvertisingDAO';
import { PurchaseDAO } from '../../persistence/PurchaseDAO';
import { UserDAO } from '../../persistence/UserDAO';
import { AdvertisingService } from './AdvertisingService';
import { UserService } from './UserService';

@Service()
export class PurchaseService {
  private readonly connection = getConnection();

  @Inject(UserService)
  private readonly userService: UserService;

  @Inject(AdvertisingService)
  private readonly adService: AdvertisingService;

  @Inject(PurchaseDAO)
  private readonly purchaseDAO: PurchaseDAO;

  @Inject(UserDAO)
  private readonly userDao: UserDAO;

  @Inject(AdvertisingDAO)
  private readonly adDao: AdvertisingDAO;

  async GetUserPurchases(userId: string) {
    const user = await this.userService.GetFromUser(userId, {
      relations: ['purchases'],
    });

    return user.purchases.map((purchase) => ({ ...purchase }));
  }

  async DoPurchase(userId: string, adId: string) {
    const client = await this.userDao.Read(userId);
    const ad = await this.adDao.Read(adId);

    if (ad.state === AdvertisingState.HIDDEN) {
      throw new Unauthorized(`Anúncio "${ad.title}" não está disponível para vendas`);
    }

    if (ad.quantity === 0) {
      throw new Unauthorized(`Anúncio "${ad.title}" não possui itens disponíveis para venda`);
    }

    const purchase = await this.purchaseDAO.Create({ client, ad });
    await this.adService.UpdateAd(purchase.ad.id, {
      quantity: purchase.ad.quantity - 1,
      state: purchase.ad.quantity === 1
        ? AdvertisingState.HIDDEN
        : AdvertisingState.VISIBLE,
    });

    return {
      ...purchase,
      client: await this.userService.GetUserById(purchase.client.id),
      ad: await this.adService.GetAdById(purchase.ad.id),
    };
  }
}
