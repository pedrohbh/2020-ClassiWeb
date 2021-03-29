import { Inject, Req } from '@tsed/common';
import { Arg, OnVerify, Protocol } from '@tsed/passport';

import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';

import { IUserService } from '../application/interfaces/IUserService';
import { UserService } from '../application/UserService';

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
  @Inject(UserService)
  private userService: IUserService;

  async $onVerify(@Req() req: Req, @Arg(0) jwtPayload: any) {
    const user = await this.userService.GetUserById(jwtPayload.id);

    return user || false;
  }
}
