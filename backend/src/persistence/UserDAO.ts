import { Injectable } from '@tsed/di';

import { EntityRepository, FindManyOptions, Repository } from 'typeorm';

import { User } from '../domain/User';
import { IBaseDAO } from './BaseDAO';

@EntityRepository(User)
class UserRepository extends Repository<User> {}

@Injectable()
export class UserDAO implements IBaseDAO<User> {
  constructor(private readonly repository: UserRepository) {}

  Create(user: Partial<User>) {
    return this.repository.save(user);
  }

  ReadAll() {
    return this.repository.find({ relations: ['address'] });
  }

  Read(id: string) {
    return this.repository.findOneOrFail(id, {
      relations: ['address'],
    });
  }

  ReadWith(options?: FindManyOptions<User>) {
    return this.repository.find(options);
  }

  async Update(id: string, user: Partial<User>) {
    await this.repository.update(id, user);
  }

  async Delete(id: string) {
    await this.repository.delete(id);
  }
}
