import { BodyParams, Controller, Delete, Get, Inject, PathParams, Post, Put } from '@tsed/common';
import { UserService } from '../application/classes/UserService';
import { User } from '../domain/User';

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
  async Get(@PathParams('id') userId: string) {
    return this.userService.GetUserById(userId);
  }

  @Post('/')
  async Post(@BodyParams() user: Pick<User, 'name' | 'cpf' | 'email' | 'password' | 'address'>) {
    return this.userService.CreateUser(user);
  }

  @Put('/:id')
  async Put(@PathParams('id') userId: string, @BodyParams() user: Partial<User>) {
    const { id, name, email, address } = await this.userService.UpdateUser(userId, user);

    return {
      id,
      name,
      email,
      address,
    };
  }

  @Delete('/:id')
  async Delete(@PathParams('id') id: string) {
    await this.userService.DeleteUser(id);
  }
}
