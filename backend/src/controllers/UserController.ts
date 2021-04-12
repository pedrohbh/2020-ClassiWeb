import {
  BodyParams, Controller, Delete, Get, HeaderParams, Inject, PathParams, Post, Put,
} from '@tsed/common';
import { Authorize } from '@tsed/passport';

import { UserService } from '../application/classes/UserService';
import { User, UserTypes } from '../domain/User';
import { Roles } from '../middlewares/Roles';

@Controller('/users')
export class UserController {
  @Inject(UserService)
  private userService: UserService;

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

  @Get('/:id')
  @Roles([UserTypes.NORMAL])
  @Authorize('jwt')
  async Get(@HeaderParams('auth') auth: string, @PathParams('id') userId: string) {
    return this.userService.GetUserById(userId);
  }

  @Post('/')
  async Post(@BodyParams() user: Pick<User, 'name' | 'cpf' | 'email' | 'password' | 'address'>) {
    return this.userService.CreateUser(user);
  }

  @Put('/:id')
  @Roles([UserTypes.NORMAL])
  @Authorize('jwt')
  async Put(
    @HeaderParams('auth') auth: string,
    @PathParams('id') userId: string,
    @BodyParams() user: Partial<User>,
  ) {
    const {
      id, name, email, address,
    } = await this.userService.UpdateUser(userId, user);

    return {
      id,
      name,
      email,
      address,
    };
  }

  @Delete('/:id')
  @Roles([UserTypes.NORMAL])
  @Authorize('jwt')
  async Delete(@HeaderParams('auth') auth: string, @PathParams('id') id: string) {
    await this.userService.DeleteUser(id);
  }
}
