import {
  BodyParams, Controller, Delete, Get, Inject, PathParams, Post,
} from '@tsed/common';

import { AddressService } from '../application/classes/AddressService';
import { UserService } from '../application/classes/UserService';
import { IAddressService } from '../application/interfaces/IAddressService';
import { IUserService } from '../application/interfaces/IUserService';
import { User } from '../domain/User';

@Controller('/users')
export class UserController {
  @Inject(UserService)
  private userService: UserService;

  @Inject(AddressService)
  private addressService: AddressService;

  @Get('/')
  async GetAll() {
    const allUsers = await this.userService.ListAllUsers();
    return allUsers.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      address: user.address,
    }));
  }

  @Post('/')
  async Post(@BodyParams() user: Pick<User, 'name' |'cpf' | 'email' | 'password' | 'address'>) {
    user.password = User.GetEncryptedPassword(user.password);

    if (!user.address.id) {
      user.address = await this.addressService.CreateAddress(user.address);
    }

    return this.userService.CreateUser(user);
  }

  @Delete('/:id')
  async Delete(@PathParams('id') id: string) {
    await this.userService.DeleteUser(id);
  }
}
