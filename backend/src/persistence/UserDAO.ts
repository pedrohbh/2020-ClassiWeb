import { Repository } from 'typeorm';

import { User } from '../domain/User';
import { ICRUD } from './BaseDAO';

export interface IUserDAO extends ICRUD<User> {}

export class UserDAO implements IUserDAO {
  constructor(private repository: Repository<User>) {}

  async GetAll() {
    return this.repository.find();
  }

  async Get(id: string) {
    return this.repository.findOne(id);
  }

  async Create(user: Omit<User, 'id'>) {
    return this.repository.create(user);
  }

  async Update(user: User) {
    return this.repository.save(user);
  }

  async Detele(id: string) {
    const user = await this.repository.findOne(id);
    await this.repository.remove(user);
  }
}
