import { BodyParams, Controller, Post, ProviderScope, Req, Scope } from '@tsed/common';
import { Authenticate } from '@tsed/passport';

@Controller('/login')
@Scope(ProviderScope.SINGLETON)
export class AuthenticationController {
  @Post('/')
  @Authenticate('login')
  Login(@Req() req: Req, @BodyParams() credential: Credential) {
    return req.user;
  }
}
