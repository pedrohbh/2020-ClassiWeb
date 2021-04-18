import { Injectable } from '@tsed/di';

import { EntityRepository, FindManyOptions, Repository } from 'typeorm';

import { Purchase } from '../domain/Purchase';
import { IBaseDAO } from './BaseDAO';

@EntityRepository(Purchase)
class PurchaseRepository extends Repository<Purchase> {}

@Injectable()
export class PurchaseDAO implements Omit<IBaseDAO<Purchase>, 'ReadAll' | 'Delete'> {
  constructor(private readonly repository: PurchaseRepository) {}

  Create(purchase: Partial<Purchase>) {
    return this.repository.save(purchase);
  }

  Read(id: string) {
    return this.repository.findOneOrFail(id, {
      relations: ['client', 'ad', 'ad.owner'],
    });
  }

  ReadWith(options: FindManyOptions<Purchase>) {
    return this.repository.find(options);
  }

  async Update(id: string, purchase: Partial<Purchase>) {
    await this.repository.update(id, purchase);
  }
}
