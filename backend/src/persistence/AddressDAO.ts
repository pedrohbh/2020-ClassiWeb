import { Injectable } from '@tsed/di';

import { EntityRepository, Repository } from 'typeorm';

import { Address } from '../domain/Address';
import { IBaseDAO } from './BaseDAO';

@EntityRepository(Address)
class AddressRepository extends Repository<Address> {}

@Injectable()
export class AddressDAO implements Omit<IBaseDAO<Address>, 'Update'> {
  constructor(private readonly repository: AddressRepository) {}

  Create(address: Omit<Address, 'id'>) {
    return this.repository.save(address);
  }

  ReadAll() {
    return this.repository.find();
  }

  Read(id: string) {
    return this.repository.findOneOrFail(id);
  }

  async Delete(id: string) {
    this.repository.delete(id);
  }
}
