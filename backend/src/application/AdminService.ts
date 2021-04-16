import { Inject, Service } from '@tsed/di';

import { Admin } from '../domain/Admin';
import { AdminDAO } from '../persistence/AdminDAO';

@Service()
export class AdminService {
  @Inject(AdminDAO)
  private readonly dao: AdminDAO;

  GetAdminDTO(admin: Admin) {
    return {
      id: admin.id,
      name: admin.name,
      email: admin.email,
      registration: admin.registration,
    };
  }

  async CreateAdmin(admin: Partial<Admin>) {
    const newAdmin = await this.dao.Create(admin);

    return this.GetAdminDTO(newAdmin);
  }

  async ListAllAdmins() {
    const admins = await this.dao.ReadAll();

    return admins.map((admin) => this.GetAdminDTO(admin));
  }

  async GetAdminById(adminId: string) {
    const admin = await this.dao.Read(adminId);

    return this.GetAdminDTO(admin);
  }

  async GetAdminByEmail(email: string) {
    const [admin] = await this.dao.ReadWith({
      where: { email },
    });

    return admin;
  }

  async DeleteAdmin(id: string) {
    await this.dao.Delete(id);
  }
}
