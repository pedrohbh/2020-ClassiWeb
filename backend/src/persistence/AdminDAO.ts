import { Injectable } from '@tsed/di';

import { EntityRepository, FindManyOptions, Repository } from 'typeorm';

import { Admin } from '../domain/Admin';
import { IBaseDAO } from './BaseDAO';

@EntityRepository(Admin)
class AdminRepository extends Repository<Admin> {}

@Injectable()
export class AdminDAO implements Omit<IBaseDAO<Admin>, 'Update'> {
  constructor(private readonly repository: AdminRepository) {}

  Create(user: Partial<Admin>) {
    return this.repository.save(user);
  }

  ReadAll() {
    return this.repository.find();
  }

  ReadWith(options?: FindManyOptions<Admin>) {
    return this.repository.find(options);
  }

  Read(id: string) {
    return this.repository.findOneOrFail(id);
  }

  async Delete(id: string) {
    await this.repository.delete(id);
  }
}
