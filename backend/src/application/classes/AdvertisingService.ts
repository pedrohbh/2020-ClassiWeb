import { Inject, Service } from '@tsed/di';

import { Between, FindConditions, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';

import { Address } from '../../domain/Address';
import { Advertising, ProductState } from '../../domain/Advertising';
import { AdvertisingDAO } from '../../persistence/AdvertisingDAO';
import { AddressService } from './AddressService';
import { UserService } from './UserService';

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

  @Inject(UserService)
  private readonly userService: UserService;

  async ListAllAds() {
    const ads = await this.dao.ReadAll();

    return ads.map((ad) => ({
      id: ad.id,
      title: ad.title,
      description: ad.description,
      price: ad.price,
      quantity: ad.quantity,
      product_state: ad.product_state,
      state: ad.state,
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
    const address = await this.addressService.CreateAddress(adJson.address);
    const owner = await this.userService.GetUserById(adJson.ownerId);

    const ad = {
      ...adJson,
      quantity: +(adJson.quantity ?? 1),
      address,
      owner,
      price: +(adJson.price ?? 0),
    };

    return this.dao.Create(ad);
  }

  async GetAdById(adId: string) {
    const { images, owner, ...rest } = await this.dao.Read(adId);

    // const owner = await this.userService.GetUserById(ownerId);

    return { ...rest, images: images.map(({ id }) => ({ id })), owner };
  }

  async UpdateAd(id: string, ad: Partial<Advertising>) {
    await this.dao.Update(id, ad);
    return this.GetAdById(id);
  }

  RemoveAd(id: string) {
    return this.dao.Delete(id);
  }
}
