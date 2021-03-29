import { Inject, Service } from '@tsed/di';
import { FindManyOptions } from 'typeorm';
import { User } from '../domain/User';
import { IBaseDAO } from '../persistence/BaseDAO';
import { UserDAO } from '../persistence/UserDAO';
import { IUserService } from './interfaces/IUserService';

export type UserDTO = Omit<User, 'id' | 'ads' | 'purchases' | 'wishes_list'>;

@Service()
export class UserService implements IUserService {
  @Inject(UserDAO)
  private readonly dao: IBaseDAO<User>;

  CreateUser(user: UserDTO) {
    return this.dao.Create(user);
  }

  GetUserById(id: string) {
    return this.dao.Read(id);
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
