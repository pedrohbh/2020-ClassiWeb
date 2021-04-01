import { Inject, Service } from '@tsed/di';

import { Address } from '../../domain/Address';
import { AddressDAO } from '../../persistence/AddressDAO';

@Service()
export class AddressService {
  @Inject(AddressDAO)
  private readonly dao: AddressDAO;

  async CreateAddress({ state, city }: Omit<Address, 'id'>) {
    const [address] = await this.dao.ReadWith({ where: { state, city } });
    return address || this.dao.Create({ state, city });
  }

  GetAddressById(id: string) {
    return this.dao.Read(id);
  }
}
