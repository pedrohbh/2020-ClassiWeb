import { Injectable } from '@tsed/di';

import { EntityRepository, FindManyOptions, Repository } from 'typeorm';

import { Purchase } from '../domain/Purchase';

@EntityRepository(Purchase)
class PurchaseRepository extends Repository<Purchase> {}

@Injectable()
export class PurchaseDAO {
  constructor(private readonly repository: PurchaseRepository) {}

  Create(purchase: Partial<Purchase>) {
    return this.repository.save(purchase);
  }

  Read(id: string) {
    return this.repository.findOneOrFail(id, {
      relations: ['client', 'ad'],
    });
  }

  ReadWith(options: FindManyOptions<Purchase>) {
    return this.repository.find(options);
  }

  Upadate(id: string, purchase: Partial<Purchase>) {
    return this.repository.update(id, purchase);
  }
}
