import { BodyParams, Controller, Delete, Get, HeaderParams, Inject, PathParams, Post, Request } from '@tsed/common';
import { BadRequest, NotFound } from '@tsed/exceptions';
import { Authorize } from '@tsed/passport';
import { EntityNotFoundError } from 'typeorm';

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
    if (! admin.name)         throw new BadRequest('Campo nome não preenchido');
    if (! admin.registration) throw new BadRequest('Campo matrícula não preenchido');
    if (! admin.email)        throw new BadRequest('Campo email não preenchido');
    if (! admin.password)     throw new BadRequest('Campo senha não preenchido');
    
    admin.password = Admin.GetEncryptedPassword(admin.password);
    const newAdminer = await this.adminService.CreateAdmin(admin);

    return LoginLocalProtocol.Login(request, newAdminer, true);
  }

  @Delete('/')
  @Roles([UserTypes.ADMIN])
  @Authorize('jwt')
  async Delete(@HeaderParams('auth') auth: string) {
    const adminId = JwtProtocol.getUserIdFromToken(auth);

    await this.adminService.DeleteAdmin(adminId);
  }
}
