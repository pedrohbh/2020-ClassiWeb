import { Inject, Service } from '@tsed/di';

import { FindManyOptions } from 'typeorm';

import { User } from '../../domain/User';
import { UserDAO } from '../../persistence/UserDAO';

@Service()
export class UserService {
  @Inject(UserDAO)
  private readonly dao: UserDAO;

  CreateUser(user: Partial<User>) {
    return this.dao.Create(user);
  }

  async GetUserById(id: string) {
    const user = await this.dao.Read(id);
    return user;
  }

  async GetUserByEmail(email: string) {
    const [user] = await this.dao.ReadAll({ where: { email } });
    return user;
  }

  ListAllUsers() {
    return this.dao.ReadAll();
  }

  ListUsersWith(options: FindManyOptions<User>) {
    return this.dao.ReadAll(options);
  }

  async DeleteUser(id: string) {
    await this.dao.Delete(id);
  }
}
