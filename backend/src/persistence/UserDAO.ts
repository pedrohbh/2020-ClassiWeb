import { Injectable } from '@tsed/di';

import { EntityRepository, FindManyOptions, Repository } from 'typeorm';
import { UserDTO } from '../application/UserService';

import { User } from '../domain/User';
import { IBaseDAO } from './BaseDAO';

@EntityRepository(User)
class UserRepository extends Repository<User> {}

@Injectable()
export class UserDAO implements Partial<IBaseDAO<User>> {
  constructor(private readonly repository: UserRepository) {}

  Create(user: UserDTO) {
    return this.repository.save(user);
  }

  ReadAll(options?: FindManyOptions<User>) {
    return this.repository.find(options);
  }

  Read(id: string) {
    return this.repository.findOneOrFail(id);
  }

  async Delete(id: string) {
    this.repository.delete(id);
  }
}
