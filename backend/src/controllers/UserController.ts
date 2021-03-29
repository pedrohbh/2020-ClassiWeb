import { BodyParams, Controller, Delete, Get, Inject, PathParams, Post, QueryParams } from '@tsed/common';
import { AddressService } from '../application/AddressService';
import { IAddressService } from '../application/interfaces/IAddressService';
import { IUserService } from '../application/interfaces/IUserService';
import { UserDTO, UserService } from '../application/UserService';
import { User } from '../domain/User';

@Controller('/users')
export class UserController {
  @Inject(UserService)
  private userService: IUserService;

  @Inject(AddressService)
  private addressService: IAddressService;

  @Get('/')
  GetAll() {
    return this.userService.ListAllUsers();
  }

  @Post('/')
  async Post(@BodyParams() user: UserDTO) {
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
