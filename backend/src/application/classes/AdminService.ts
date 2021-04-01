import { Inject, Service } from '@tsed/di';

import { Admin } from '../../domain/Admin';
import { AdminDAO } from '../../persistence/AdminDAO';

@Service()
export class AdminService {
  @Inject(AdminDAO)
  private readonly dao: AdminDAO;

  CreateAdmin(admin: Partial<Admin>) {
    return this.dao.Create(admin);
  }

  async GetAdminById(id: string) {
    const admin = await this.dao.Read(id);
    return admin;
  }

  async GetAdminByEmail(email: string) {
    const [admin] = await this.dao.ReadAll({ where: { email } });
    return admin;
  }

  async DeleteAdmin(id: string) {
    await this.dao.Delete(id);
  }
}
