import { Inject, Service } from '@tsed/di';

import { Advertising } from '../../domain/Advertising';
import { AdvertisingDAO } from '../../persistence/AdvertisingDAO';
import { AddressService } from './AddressService';
import { UserService } from './UserService';

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

  async CreateAd(adJson: Partial<Advertising>): Promise<Advertising> {
    const address = await this.addressService.CreateAddress(adJson.address);
    const owner = await this.userService.GetUserById(adJson.ownerId);

    const ad = {
      ...adJson,
      quantity: adJson.quantity ?? 1,
      address,
      owner,
    };

    return this.dao.Create(ad);
  }

  async GetAdById(adId: string) {
    const {
      images, owner: { id: ownerId }, ...rest
    } = await this.dao.Read(adId);

    const owner = await this.userService.GetUserById(ownerId);

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
