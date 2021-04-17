import { Inject, Service } from '@tsed/di';
import { Unauthorized } from '@tsed/exceptions';

import { AdvertisingState } from '../domain/Advertising';
import { Feedback, Purchase } from '../domain/Purchase';
import { AdvertisingDAO } from '../persistence/AdvertisingDAO';
import { PurchaseDAO } from '../persistence/PurchaseDAO';
import { UserDAO } from '../persistence/UserDAO';
import { EmailService } from '../services/email/EmailService';
import { AdvertisingService } from './AdvertisingService';
import { UserService } from './UserService';

@Service()
export class PurchaseService {
  @Inject(PurchaseDAO)
  private readonly dao: PurchaseDAO;

  @Inject(UserDAO)
  private readonly userDao: UserDAO;

  @Inject(AdvertisingDAO)
  private readonly adDao: AdvertisingDAO;

  @Inject(UserService)
  private readonly userService: UserService;

  @Inject(AdvertisingService)
  private readonly adService: AdvertisingService;

  @Inject(EmailService)
  private readonly emailService: EmailService;

  async GetPurchaseDTO(purchase: Purchase) {
    return {
      id: purchase.id,
      date: purchase.date,
      owner_feedback: purchase.owner_feedback,
      client_feedback: purchase.client_feedback,
      ad: await this.adService.GetAdvertisingDTO(purchase.ad),
    };
  }

  async GetUserPurchases(userId: string) {
    const [user] = await this.userDao.ReadWith({
      relations: ['purchases'],
      where: { id: userId },
    });

    return Promise.all(user.purchases.map(({ id }) => this.GetPurchaseBtId(id)));
  }

  async GetUserSales(userId: string) {
    const purchases = await this.dao.ReadWith({
      relations: ['ad', 'ad.owner'],
      where: (qb: any) => {
        qb.where('Purchase__ad.owner.id = :id', {
          id: userId,
        });
      },
    });

    return Promise.all(purchases.map((purchase) => this.GetPurchaseDTO(purchase)));
  }

  async GetPurchaseBtId(id: string) {
    const purchase = await this.dao.Read(id);

    return this.GetPurchaseDTO(purchase);
  }

  async DoPurchase(adId: string, userId: string) {
    const client = await this.userDao.Read(userId);
    const ad = await this.adDao.Read(adId);

    if (ad.state === AdvertisingState.HIDDEN) {
      throw new Unauthorized(`Anúncio "${ad.title}" não está disponível para vendas`);
    }

    if (ad.quantity === 0) {
      throw new Unauthorized(`Anúncio "${ad.title}" não possui itens disponíveis para venda`);
    }

    if (ad.owner.id === userId) {
      throw new Unauthorized('Um anúncio não pode ser comprado por seu dono');
    }

    const purchase = await this.dao.Create({ client, ad });
    await this.adService.UpdateAd(purchase.ad.id, {
      quantity: purchase.ad.quantity - 1,
      state: purchase.ad.quantity === 1 ? AdvertisingState.HIDDEN : AdvertisingState.VISIBLE,
    });

    // Envia e-mail
    this.emailService.send(ad.owner.email, 'Compraram seu produto', `Realizaram a compra do seu produto ${ad.title}`);

    return {
      ...purchase,
      client: this.userService.GetUserDTO(purchase.client),
      ad: this.adService.GetAdvertisingDTO(purchase.ad),
    };
  }

  async SaveFeedback(id: string, userId: string, feedback: Feedback) {
    const { client, ad } = await this.dao.Read(id);
    const result = await this.adDao.Read(ad.id);

    if (![client.id, result.owner.id].includes(userId)) {
      throw new Unauthorized('Este usuário não está relacionado nesta compra.');
    }

    if (client.id === userId) {
      return this.UpdatePurchase(id, {
        client_feedback: feedback,
      });
    }

    const purchase = await this.UpdatePurchase(id, {
      owner_feedback: feedback,
    });

    return this.GetPurchaseDTO(purchase);
  }

  async UpdatePurchase(id: string, json: Partial<Purchase>) {
    await this.dao.Update(id, json);
    const purchase = await this.dao.Read(id);

    return { ...purchase };
  }
}
