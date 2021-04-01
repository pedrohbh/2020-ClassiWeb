import { Inject, Service } from '@tsed/di';

import { User } from '../../domain/User';
import { UserDAO } from '../../persistence/UserDAO';

@Service()
export class UserService {
  @Inject(UserDAO)
  private readonly dao: UserDAO;

  CreateUser(user: Partial<User>) {
    return this.dao.Create(user);
  }

  async GetUserById(userId: string) {
    const {
      id, name, email, address,
    } = await this.dao.Read(userId);

    return {
      id, name, email, address,
    };
  }

  async GetUserByEmail(email: string) {
    const [user] = await this.dao.ReadWith({ where: { email } });
    return user;
  }

  ListAllUsers() {
    return this.dao.ReadAll();
  }

  UpdateUser(id: string, user: Partial<User>) {
    return this.dao.Update(id, user);
  }

  async DeleteUser(id: string) {
    await this.dao.Delete(id);
  }
}
