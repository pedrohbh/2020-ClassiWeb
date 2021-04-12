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

  ReadAll(page: number, pageSize: number) {
    return this.repository.findAndCount({
      relations: ['category', 'address', 'owner', 'images'],
      take: pageSize,
      skip: (page - 1) * (pageSize ?? 0),
    });
  }

  Read(id: string) {
    return this.repository.findOneOrFail(id, {
      relations: ['category', 'address', 'owner', 'images'],
    });
  }

  ReadWith(options: FindManyOptions<Advertising>, page = 1, pageSize = 0) {
    return this.repository.findAndCount({
      ...options,
      take: pageSize,
      skip: (page - 1) * (pageSize ?? 0),
    });
  }

  Update(id: string, ad: Partial<Advertising>) {
    return this.repository.update(id, ad);
  }

  Delete(id: string) {
    return this.repository.delete(id);
  }
}
