import {
  BodyParams, Controller, Delete, Get, HeaderParams, Inject, PathParams, Post, Put, Request,
} from '@tsed/common';
import { Authorize } from '@tsed/passport';

import { UserService } from '../application/classes/UserService';
import { User, UserTypes } from '../domain/User';
import { Roles } from '../middlewares/Roles';
import { JwtProtocol } from '../protocols/JwtProtocol';
import { LoginLocalProtocol } from '../protocols/LoginProtocol';

@Controller('/users')
export class UserController {
  @Inject(UserService)
  private userService: UserService;

  @Get('/list')
  async GetAll() {
    const allUsers = await this.userService.ListAllUsers();

    return allUsers.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      address: user.address,
    }));
  }

  @Get('/')
  @Roles([UserTypes.NORMAL])
  @Authorize('jwt')
  async Get(@HeaderParams('auth') auth: string) {
    const userId = JwtProtocol.getUserIdFromToken(auth);
    return this.userService.GetUserById(userId);
  }

  @Post('/')
  async Post(
    @Request() request: Request,
    @BodyParams() user: Pick<User, 'name' | 'cpf' | 'email' | 'password' | 'address'>,
  ) {
    const newUser = await this.userService.CreateUser(user);
    return LoginLocalProtocol.Login(request, newUser, false);
  }

  @Put('/')
  @Roles([UserTypes.NORMAL])
  @Authorize('jwt')
  async Put(
    @HeaderParams('auth') auth: string,
    @BodyParams() user: Partial<User>,
  ) {
    const userId = JwtProtocol.getUserIdFromToken(auth);

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

  @Delete('/')
  @Roles([UserTypes.NORMAL])
  @Authorize('jwt')
  async Delete(@HeaderParams('auth') auth: string) {
    const userId = JwtProtocol.getUserIdFromToken(auth);

    await this.userService.DeleteUser(userId);
  }
}
