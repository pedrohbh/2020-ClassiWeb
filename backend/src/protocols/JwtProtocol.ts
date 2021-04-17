import { Inject, Req } from '@tsed/common';
import { Arg, OnVerify, Protocol } from '@tsed/passport';

import jwt from 'jsonwebtoken';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';

import { AdminService } from '../application/AdminService';
import { UserService } from '../application/UserService';
import { UserTypes } from '../domain/User';

export const JWT_SUPER_SECRET = 'super_secret_jwt_key_generator';

@Protocol<StrategyOptions>({
  name: 'jwt',
  useStrategy: Strategy,
  settings: {
    jwtFromRequest: ExtractJwt.fromHeader('auth'),
    secretOrKey: JWT_SUPER_SECRET,
  },
})
export class JwtProtocol implements OnVerify {
  @Inject(AdminService)
  private adminService: AdminService;

  @Inject(UserService)
  private userService: UserService;

  async $onVerify(@Req() req: Req, @Arg(0) jwtPayload: any) {
    if (jwtPayload.role === UserTypes.ADMIN) {
      const admin = await this.adminService.GetAdminById(jwtPayload.id);

      return admin || false;
    }

    const user = await this.userService.GetUserById(jwtPayload.id);

    return user || false;
  }

  static getUserIdFromToken(token: string) {
    const { id } = jwt.decode(token) as any;
    return id;
  }
}
