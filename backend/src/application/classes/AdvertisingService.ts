import { Inject, Service } from '@tsed/di';

import { Between, FindConditions, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';

import { Address } from '../../domain/Address';
import { Advertising, ProductState } from '../../domain/Advertising';
import { AdvertisingDAO } from '../../persistence/AdvertisingDAO';
import { CategoryDAO } from '../../persistence/CategoryDAO';
import { UserDAO } from '../../persistence/UserDAO';
import { EmailService } from '../../services/email/EmailService';
import { AddressService } from './AddressService';
import { UserService } from './UserService';
import { WishListService } from './WishListService';

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface AdFilter {
  text: string;
  product_state: ProductState;
  min_price: number;
  max_price: number;
  address: Partial<Address>;
  categories: string[];
}

@Service()
export class AdvertisingService {
  @Inject(AdvertisingDAO)
  private readonly dao: AdvertisingDAO;

  @Inject(AddressService)
  private readonly addressService: AddressService;

  @Inject(UserDAO)
  private readonly userDao: UserDAO;

  @Inject(CategoryDAO)
  private readonly categoryDAO: CategoryDAO;

  @Inject(UserService)
  private readonly userService: UserService;

  @Inject(EmailService)
  private readonly emailService: EmailService;

  @Inject(WishListService)
  private readonly wishListService: WishListService;

  async ListAllAds() {
    const ads = await this.dao.ReadAll();

    return ads.map((ad) => ({
      ...ad,
      owner: ad.owner && {
        id: ad.owner.id,
        name: ad.owner.name,
        email: ad.owner.email,
      },
    }));
  }

  async ListAdsWith(filter: Partial<AdFilter>) {
    const whereQuery = {} as FindConditions<Advertising>;

    if (filter.product_state) {
      whereQuery.product_state = filter.product_state;
    }

    if (filter.min_price) {
      if (filter.max_price) {
        whereQuery.price = Between(filter.min_price, filter.max_price);
      } else {
        whereQuery.price = MoreThanOrEqual(filter.min_price);
      }
    } else if (filter.max_price) {
      whereQuery.price = LessThanOrEqual(filter.max_price);
    }

    const adsDB = await this.dao.ReadWith({
      relations: ['category', 'address', 'owner'],
      where:
        filter.categories?.map((category) => ({
          ...whereQuery,
          category: { name: category },
        })) || whereQuery,
    });

    const ads = adsDB
      .map((ad) => ({ ...ad }))
      .filter((ad) => {
        const regex = new RegExp(filter.text || '', 'i');
        return regex.test(ad.title) || regex.test(ad.description);
      })
      .filter((ad) =>
        filter.address?.state
          ? ad.address.state === filter.address.state && filter.address.city
            ? ad.address.city === filter.address.city
            : true
          : true,
      );

    return [ads.length, ads];
  }

  async CreateAd(adJson: Partial<Advertising>): Promise<Advertising> {
    const [address, owner, category] = await Promise.all([
      await this.addressService.CreateAddress(adJson.address),
      await this.userDao.Read(adJson.ownerId),
      await this.categoryDAO.Read(adJson.category),
    ]);

    const { id } = await this.dao.Create({
      ...adJson,
      quantity: +(adJson.quantity ?? 1),
      category,
      address,
      owner,
      price: +(adJson.price ?? 0),
    });

    return this.GetAdById(id);
  }

  async GetAdById(adId: string) {
    const { images, owner, ...rest } = await this.dao.Read(adId);

    // const owner = await this.userService.GetUserById(ownerId);

    return {
      ...rest,
      images: images.map(({ id }) => ({ id })),
      owner: owner && {
        id: owner.id,
        name: owner.name,
        email: owner.email,
      },
    };
  }

  async UpdateAd(id: string, adJSON: Partial<Advertising>) {
    await this.dao.Update(id, adJSON);
    const ad = await this.GetAdById(id);
    const users = await this.wishListService.GetListFromAd(id);
    users.forEach(user => {
      this.emailService.send(user.email, "Alteração no produto da sua lista de desejos", `Alteraram um produto que estava na sua lista de desejos: ${ad.title}`);
    })
    return ad;
  }

  RemoveAd(id: string) {
    return this.dao.Delete(id);
  }
}
