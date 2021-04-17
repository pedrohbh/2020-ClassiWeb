import { BodyParams, Controller, Delete, Get, HeaderParams, Inject, Post, Request } from '@tsed/common';
import { BadRequest, Unauthorized } from '@tsed/exceptions';
import { Authorize } from '@tsed/passport';
import { Description, Returns } from '@tsed/schema';

import { QueryFailedError } from 'typeorm';

import { AdminService } from '../application/AdminService';
import { Admin } from '../domain/Admin';
import { UserTypes } from '../domain/User';
import { Roles } from '../middlewares/Roles';
import { JwtProtocol } from '../protocols/JwtProtocol';
import { LoginLocalProtocol } from '../protocols/LoginProtocol';

@Controller('/admin')
export class AdminController {
  @Inject(AdminService)
  private adminService: AdminService;

  @Get('/list')
  @Description('Retorna todos os administradores da plataforma.')
  @(Returns(200, Array).Of(Admin))
  async GetAll() {
    const allAdmins = await this.adminService.ListAllAdmins();

    return allAdmins;
  }

  @Get('/')
  @Roles([UserTypes.ADMIN])
  @Authorize('jwt')
  async Get(@HeaderParams('auth') auth: string) {
    const adminId = JwtProtocol.getUserIdFromToken(auth);

    return this.adminService.GetAdminById(adminId);
  }

  @Post('/')
  async Post(@Request() request: Request, @BodyParams() admin: Pick<Admin, 'name' | 'registration' | 'email' | 'password'>) {
    if (!admin.name) throw new BadRequest('Campo nome não preenchido');
    if (!admin.registration) throw new BadRequest('Campo matrícula não preenchido');
    if (!admin.email) throw new BadRequest('Campo email não preenchido');
    if (!admin.password) throw new BadRequest('Campo senha não preenchido');

    try {
      const newAdminer = await this.adminService.CreateAdmin(admin);
      return LoginLocalProtocol.Login(request, newAdminer, true);
    } catch (error) {
      if (error instanceof QueryFailedError) {
        if (/SQLITE_CONSTRAINT: UNIQUE/.test(error.message)) {
          const field = error.message.match(/user\.(\w+)$/)?.[1];
          throw new Unauthorized(`Já existe um usuário com este(a) ${field === 'registration' ? 'Matrícula' : 'E-mail'}`);
        }
      }
    }
  }

  @Delete('/')
  @Roles([UserTypes.ADMIN])
  @Authorize('jwt')
  async Delete(@HeaderParams('auth') auth: string) {
    const adminId = JwtProtocol.getUserIdFromToken(auth);

    await this.adminService.DeleteAdmin(adminId);
  }
}
