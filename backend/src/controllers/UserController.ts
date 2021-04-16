import {
  BodyParams, Controller, Delete, Get, HeaderParams, Inject, Post, Put, Request,
} from '@tsed/common';
import { BadRequest } from '@tsed/exceptions';
import { Authorize } from '@tsed/passport';

import { UserService } from '../application/UserService';
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
    return this.userService.ListAllUsers();
  }

  @Get('/')
  @Roles([UserTypes.NORMAL])
  @Authorize('jwt')
  async Get(@HeaderParams('auth') auth: string) {
    const userId = JwtProtocol.getUserIdFromToken(auth);
    return this.userService.GetUserById(userId);
  }

  @Post('/')
  async Post(@Request() request: Request, @BodyParams() user: Pick<User, 'name' | 'cpf' | 'email' | 'password' | 'address'>) {
    if (! user.name)      throw new BadRequest('Campo nome não preenchido');
    if (! user.cpf)       throw new BadRequest('Campo matrícula não preenchido');
    if (! user.email)     throw new BadRequest('Campo email não preenchido');
    if (! user.password)  throw new BadRequest('Campo senha não preenchido');
    if (! user.address?.state)   throw new BadRequest('Campo Estado não preenchido');
    if (! user.address?.city)   throw new BadRequest('Campo Cidade não preenchido');

    const newUser = await this.userService.CreateUser(user);
    return LoginLocalProtocol.Login(request, newUser, false);
  }

  @Put('/')
  @Roles([UserTypes.NORMAL])
  @Authorize('jwt')
  async Put(@HeaderParams('auth') auth: string, @BodyParams() user: Partial<User>) {
    if (! user.name)      throw new BadRequest('Campo nome não preenchido');
    if (! user.cpf)       throw new BadRequest('Campo matrícula não preenchido');
    if (! user.email)     throw new BadRequest('Campo email não preenchido');
    if (! user.password)  throw new BadRequest('Campo senha não preenchido');
    if (! user.address?.state)   throw new BadRequest('Campo Estado não preenchido');
    if (! user.address?.city)   throw new BadRequest('Campo Cidade não preenchido');

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
