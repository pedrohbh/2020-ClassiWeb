import { BodyParams, Controller, Post, ProviderScope, Req, Scope } from '@tsed/common';
import { Authenticate } from '@tsed/passport';

import { Credentials } from '../protocols/LoginProtocol';

@Controller('/login')
@Scope(ProviderScope.SINGLETON)
export class AuthenticationController {
  @Post('/')
  @Authenticate('login')
  Login(@Req() req: Req, @BodyParams() credential: Credentials) {
    return req.user;
  }
}
