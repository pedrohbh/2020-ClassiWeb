import { Injectable } from '@tsed/di';

import { EntityRepository, FindManyOptions, Repository } from 'typeorm';

import { Address } from '../domain/Address';

@EntityRepository(Address)
class AddressRepository extends Repository<Address> {}

@Injectable()
export class AddressDAO {
  constructor(private readonly repository: AddressRepository) {}

  Create(address: Partial<Address>) {
    return this.repository.save(address);
  }

  ReadAll() {
    return this.repository.find();
  }

  Read(id: string) {
    return this.repository.findOneOrFail(id);
  }

  ReadWith(options?: FindManyOptions<Address>) {
    return this.repository.find(options);
  }

  async Delete(id: string) {
    const deleteResults = await this.repository.delete(id);
    return (deleteResults.affected ?? 0) > 0;
  }
}
