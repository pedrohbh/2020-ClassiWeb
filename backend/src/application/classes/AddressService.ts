import { Inject, Service } from '@tsed/di';

import { Address } from '../../domain/Address';
import { AddressDAO } from '../../persistence/AddressDAO';

@Service()
export class AddressService {
  @Inject(AddressDAO)
  private readonly dao: AddressDAO;

  CreateAddress(address: Omit<Address, 'id'>) {
    return this.dao.Create(address);
  }

  GetAddressById(id: string) {
    return this.dao.Read(id);
  }
}
