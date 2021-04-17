import { BodyParams, Controller, Delete, Get, HeaderParams, Inject, Post, Put, Request } from '@tsed/common';
import { BadRequest, Unauthorized } from '@tsed/exceptions';
import { Authorize } from '@tsed/passport';
import { QueryFailedError } from 'typeorm';

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
    if (!user.name) throw new BadRequest('Campo nome não preenchido');
    if (!user.cpf) throw new BadRequest('Campo matrícula não preenchido');
    if (!user.email) throw new BadRequest('Campo email não preenchido');
    if (!user.password) throw new BadRequest('Campo senha não preenchido');
    if (!user.address?.state) throw new BadRequest('Campo Estado não preenchido');
    if (!user.address?.city) throw new BadRequest('Campo Cidade não preenchido');

    try {
      const newUser = await this.userService.CreateUser(user);
      return LoginLocalProtocol.Login(request, newUser, false);
    } catch (error) {
      if (error instanceof QueryFailedError) {
        if (/SQLITE_CONSTRAINT: UNIQUE/.test(error.message)) {
          const field = error.message.match(/user\.(\w+)$/)?.[1];
          throw new Unauthorized(`Já existe um usuário com este ${field === 'cpf' ? 'CPF' : 'E-mail'}`);
        }
      }
    }
  }

  @Put('/')
  @Roles([UserTypes.NORMAL])
  @Authorize('jwt')
  async Put(@HeaderParams('auth') auth: string, @BodyParams() user: Partial<User>) {
    const userId = JwtProtocol.getUserIdFromToken(auth);

    return this.userService.UpdateUser(userId, user);
  }

  @Delete('/')
  @Roles([UserTypes.NORMAL])
  @Authorize('jwt')
  async Delete(@HeaderParams('auth') auth: string) {
    const userId = JwtProtocol.getUserIdFromToken(auth);

    await this.userService.DeleteUser(userId);
  }
}
