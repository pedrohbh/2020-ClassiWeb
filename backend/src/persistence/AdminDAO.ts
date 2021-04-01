import { Injectable } from '@tsed/di';

import { EntityRepository, FindManyOptions, Repository } from 'typeorm';

import { Admin } from '../domain/Admin';

@EntityRepository(Admin)
class AdminRepository extends Repository<Admin> {}

@Injectable()
export class AdminDAO {
  constructor(private readonly repository: AdminRepository) {}

  Create(user: Partial<Admin>) {
    return this.repository.save(user);
  }

  ReadAll(options?: FindManyOptions<Admin>) {
    return this.repository.find(options);
  }

  Read(id: string) {
    return this.repository.findOneOrFail(id);
  }

  async Delete(id: string) {
    this.repository.delete(id);
  }
}
