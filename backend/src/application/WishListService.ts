import { Inject, Service } from '@tsed/di';

import { getConnection } from 'typeorm';

import { Advertising } from '../domain/Advertising';
import { AdvertisingDAO } from '../persistence/AdvertisingDAO';
import { UserDAO } from '../persistence/UserDAO';
import { UserService } from './UserService';

@Service()
export class WishListService {
  private readonly connection = getConnection();

  @Inject(UserDAO)
  private readonly userDao: UserDAO;

  @Inject(UserService)
  private readonly userService: UserService;

  @Inject(AdvertisingDAO)
  private readonly adDao: AdvertisingDAO;

  async GetList(userId: string) {
    const [user] = await this.userDao.ReadWith({
      relations: ['wishes_list'],
      where: { id: userId },
    });

    return user.wishes_list.map((ad) => ({ ...ad }));
  }

  async AddAdOnList(userId: string, adId: string) {
    const ad = await this.adDao.Read(adId);

    const [user] = await this.userDao.ReadWith({
      relations: ['wishes_list'],
      where: { id: userId },
    });

    user.wishes_list.push(ad);
    await this.connection.manager.save(user);
  }

  async RemoveAdFromList(userId: string, adId: string) {
    const [user] = await this.userDao.ReadWith({
      relations: ['wishes_list'],
      where: { id: userId },
    });

    user.wishes_list = user.wishes_list.filter((ad: Advertising) => ad.id !== adId);
    await this.connection.manager.save(user);

    return this.GetList(userId);
  }

  async GetListFromAd(id: string) {
    const [[ad]] = await this.adDao.ReadWith({
      relations: ['wishes_list'],
      where: { id },
    });

    return (ad.wishes_list || []).map((user) => this.userService.GetUserDTO(user));
  }
}
