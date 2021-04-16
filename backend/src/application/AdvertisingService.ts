import { Inject, Service } from '@tsed/di';

import { Between, FindConditions, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';

import { Address } from '../domain/Address';
import { Advertising, ProductState } from '../domain/Advertising';
import { User } from '../domain/User';
import { AdvertisingDAO } from '../persistence/AdvertisingDAO';
import { CategoryDAO } from '../persistence/CategoryDAO';
import { UserDAO } from '../persistence/UserDAO';
import { EmailService } from '../services/email/EmailService';
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

  @Inject(UserDAO)
  private readonly userDao: UserDAO;

  @Inject(CategoryDAO)
  private readonly categoryDAO: CategoryDAO;

  @Inject(AddressService)
  private readonly addressService: AddressService;

  @Inject(UserService)
  private readonly userService: UserService;

  @Inject(WishListService)
  private readonly wishListService: WishListService;

  @Inject(EmailService)
  private readonly emailService: EmailService;

  GetAdvertisingDTO(ad: Advertising) {
    return {
      id: ad.id,
      title: ad.title,
      description: ad.description,
      price: ad.price,
      quantity: ad.quantity,
      state: ad.state,
      product_state: ad.product_state,
      images: ad.images.map(({ id }) => id),
      category: ad.category,
      address: ad.address,
      owner: this.userService.GetUserDTO(ad.owner),
    };
  }

  async ListAllAds(page: number, pageSize: number) {
    const [ads, total] = await this.dao.ReadAll(page, pageSize);

    return [ads.map((ad) => this.GetAdvertisingDTO(ad)), total];
  }

  async ListAdsWith(filter: Partial<AdFilter>, page: number, pageSize: number) {
    const whereQuery = {} as FindConditions<Advertising>;

    if (Number.isInteger(filter.product_state)) {
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

    const [adsDB, total] = await this.dao.ReadWith(
      {
        relations: ['category', 'address', 'owner', 'images'],
        where:
          filter.categories?.map((category) => ({
            ...whereQuery,
            category: { name: category },
          })) || whereQuery,
      },
      page,
      pageSize,
    );

    const removeAccents = (str = '') => str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    const regex = new RegExp(removeAccents(filter.text) || '', 'i');

    const testText = (text: string) => regex.test(removeAccents(text));

    const ads = adsDB
      .filter((ad) => testText(ad.title) || testText(ad.description))
      .filter((ad) => {
        if (!filter.address) return true;

        if (filter.address?.city) {
          return ad.address.city === filter.address.city;
        }

        return ad.address.state === filter.address.state;
      })
      .map((ad) => this.GetAdvertisingDTO(ad));

    return [ads, total];
  }

  private removeAccents(str = '') {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  async CreateAd(ad: Partial<Advertising>) {
    const [address, owner, category] = await Promise.all([
      await this.addressService.CreateAddress(ad.address),
      await this.userDao.Read(ad.ownerId),
      await this.categoryDAO.Read(ad.category),
    ]);

    const newAd = await this.dao.Create({
      ...ad,
      quantity: +(ad.quantity ?? 1),
      category,
      address,
      owner,
      price: +(ad.price ?? 0),
    });

    return this.GetAdvertisingDTO(newAd);
  }

  async GetAdById(adId: string) {
    const ad = await this.dao.Read(adId);

    return this.GetAdvertisingDTO(ad);
  }

  async UpdateAd(id: string, adJson: Partial<Advertising>) {
    if (adJson.address) {
      adJson.address = await this.addressService.CreateAddress(adJson.address);
    }

    await this.dao.Update(id, adJson);

    const ad = await this.GetAdById(id);
    const users = await this.wishListService.GetListFromAd(id);

    users.forEach((user: User) => {
      this.emailService.send(
        user.email,
        'Alteração no produto da sua lista de desejos',
        `Alteraram um produto que estava na sua lista de desejos: ${ad.title}`,
      );
    });

    return ad;
  }

  async GetAdsByUserId(userID: string) {
    const [{ads}] = await this.userDao.ReadWith({
      relations: ['ads'],
      where: {id: userID}
    });

    return Promise.all(ads.map(ad => this.GetAdvertisingDTO(ad)));
  }

  DeleteAd(id: string) {
    return this.dao.Delete(id);
  }
}
