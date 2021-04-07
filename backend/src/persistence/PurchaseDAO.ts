import { Injectable } from '@tsed/di';

import { EntityRepository, Repository } from 'typeorm';

import { Purchase } from '../domain/Purchase';

@EntityRepository(Purchase)
class PurchaseRepository extends Repository<Purchase> {}

@Injectable()
export class PurchaseDAO {
  constructor(private readonly repository: PurchaseRepository) {}

  Create(purchase: Partial<Purchase>) {
    return this.repository.save(purchase);
  }

  // ReadAll() {
  //   return this.repository.find();
  // }

  // Read(id: string) {
  //   return this.repository.findOneOrFail(id);
  // }

  // async Delete(id: string) {
  //   const deleteResults = await this.repository.delete(id);
  //   return (deleteResults.affected ?? 0) > 0;
  // }
}
