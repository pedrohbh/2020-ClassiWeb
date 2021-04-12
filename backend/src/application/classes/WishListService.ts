import { Inject, Service } from '@tsed/di';

import { getConnection } from 'typeorm';

import { Advertising } from '../../domain/Advertising';
import { User } from '../../domain/User';
import { AdvertisingDAO } from '../../persistence/AdvertisingDAO';
import { UserDAO } from '../../persistence/UserDAO';
import { UserService } from './UserService';

@Service()
export class WishListService {
  private readonly connection = getConnection();

  @Inject(UserService)
  private readonly userService: UserService;

  @Inject(UserDAO)
  private readonly userDao: UserDAO;

  @Inject(AdvertisingDAO)
  private readonly adDao: AdvertisingDAO;

  async GetList(userId: string) {
    const user = await this.userService.GetFromUser(userId, {
      relations: ['wishes_list'],
    });

    return user.wishes_list.map((ad) => ({ ...ad }));
  }

  async AddAdOnList(userId: string, adId: string) {
    const ad = await this.adDao.Read(adId);
    const [user] = await this.userDao.ReadWith({
      where: { id: userId },
      relations: ['wishes_list'],
    });

    user.wishes_list.push(ad);
    await this.connection.manager.save(user);

    return this.GetList(userId);
  }

  async RemoveAdFromList(userId: any, adId: string) {
    const [user] = await this.userDao.ReadWith({
      where: { id: userId },
      relations: ['wishes_list'],
    });

    user.wishes_list = user.wishes_list.filter((ad: Advertising) => ad.id !== adId);
    await this.connection.manager.save(user);

    return this.GetList(userId);
  }

  async GetListFromAd(id: string) {
    const [ad] = await this.adDao.ReadWith({
      where: { id },
      relations: ['wishes_list'],
    });

    return (ad.wishes_list || []).map((user: User) => ({ ...user }));
  }
}
