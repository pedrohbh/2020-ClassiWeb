import { Inject, Service } from '@tsed/di';
import { BadRequest } from '@tsed/exceptions';

import { User } from '../../domain/User';
import { UserDAO } from '../../persistence/UserDAO';
import { AddressService } from './AddressService';

@Service()
export class UserService {
  @Inject(UserDAO)
  private readonly dao: UserDAO;

  @Inject(AddressService)
  private addressService: AddressService;

  async CreateUser(user: Pick<User, 'name' |'cpf' | 'email' | 'password' | 'address'>) {
    const cpf = user.cpf.replace(/\D/g, '');

    if (cpf.length !== 11) {
      throw new BadRequest('CPF inválido');
    }

    return this.dao.Create({
      ...user,
      password: User.GetEncryptedPassword(user.password),
      address: user.address.id
        ? user.address
        : await this.addressService.CreateAddress(user.address),
      cpf,
    });
  }

  async GetUserById(userId: string) {
    const {
      id, name, email, address, cpf,
    } = await this.dao.Read(userId);

    return {
      id, name, email, address, cpf: User.GetFormmatedCpf(cpf),
    };
  }

  async GetUserByEmail(email: string) {
    const [user] = await this.dao.ReadWith({ where: { email } });
    return {
      ...user,
      cpf: User.GetFormmatedCpf(user.cpf),
    };
  }

  ListAllUsers() {
    return this.dao.ReadAll();
  }

  async UpdateUser(id: string, userJson: Partial<User>) {
    const user = await this.dao.Update(id, userJson);

    return {
      ...user,
      cpf: User.GetFormmatedCpf(user.cpf),
    };
  }

  async DeleteUser(id: string) {
    await this.dao.Delete(id);
  }
}
