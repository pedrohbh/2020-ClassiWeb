import {
  BodyParams, Controller, Delete, Get, Inject, PathParams, Post,
} from '@tsed/common';

import { AdminService } from '../application/classes/AdminService';
import { Admin } from '../domain/Admin';

@Controller('/admin')
export class AdminController {
  @Inject(AdminService)
  private adminService: AdminService;

  @Get('/')
  async GetAll() {
    const allAdmins = await this.adminService.ListAllAdmins();

    return allAdmins.map((admin) => ({
      id: admin.id,
      name: admin.name,
      email: admin.email,
    }));
  }

  @Get('/:id')
  async Get(@PathParams('id') id: string) {
    return this.adminService.GetAdminById(id);
  }

  @Post('/')
  async Post(@BodyParams() admin: Pick<Admin, 'name' |'registration' | 'email' | 'password'>) {
    admin.password = Admin.GetEncryptedPassword(admin.password);

    return this.adminService.CreateAdmin(admin);
  }

  @Delete('/:id')
  async Delete(@PathParams('id') id: string) {
    await this.adminService.DeleteAdmin(id);
  }
}
