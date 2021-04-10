import { Injectable } from '@tsed/di';

import { EntityRepository, FindManyOptions, Repository } from 'typeorm';

import { Advertising } from '../domain/Advertising';

@EntityRepository(Advertising)
class AdvertisingRepository extends Repository<Advertising> {}

@Injectable()
export class AdvertisingDAO {
  constructor(private readonly repository: AdvertisingRepository) {}

  Create(ad: Partial<Advertising>) {
    return this.repository.save(ad);
  }

  ReadAll() {
    return this.repository.find();
  }

  Read(id: string) {
    return this.repository.findOneOrFail(id, {
      relations: ['category', 'address', 'owner', 'images'],
    });
  }

  ReadWith(options: FindManyOptions<Advertising>) {
    return this.repository.find(options);
  }

  Update(id: string, ad: Partial<Advertising>) {
    return this.repository.update(id, ad);
  }

  Delete(id: string) {
    return this.repository.delete(id);
  }
}
