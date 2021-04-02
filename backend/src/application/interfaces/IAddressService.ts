import { Address } from '../../domain/Address';

export interface IAddressService {
  CreateAddress(address: Omit<Address, 'id'>): Promise<Address>;

  GetAddressById(id: string): Promise<Address>;
}
