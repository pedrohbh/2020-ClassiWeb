import { Inject, Service } from '@tsed/di';

import { Address } from '../domain/Address';
import { IBaseDAO } from '../persistence/BaseDAO';
import { AddressDAO } from '../persistence/AddressDAO';
import { IAddressService } from './interfaces/IAddressService';

@Service()
export class AddressService implements IAddressService {
  @Inject(AddressDAO)
  private readonly dao: IBaseDAO<Address>;

  CreateAddress(Address: Omit<Address, 'id'>) {
    return this.dao.Create(Address);
  }

  GetAddressById(id: string) {
    return this.dao.Read(id);
  }
}
