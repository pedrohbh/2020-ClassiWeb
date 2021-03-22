import { MigrationInterface, QueryRunner, getRepository } from 'typeorm';

import { User, UserRole } from '../../domain/User';

export class CreateAdminUser1547919837483 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const user = new User();

    Object.assign(user, {
      name: 'Adminer',
      role: UserRole.ADMIN,
      cpf: '00000000000',
      email: 'adminer@email.com',
      password: '12345678',
      address: 0,
    } as User);

    const userRepository = getRepository(User);
    await userRepository.save(user);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
