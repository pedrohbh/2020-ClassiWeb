import {
  Controller, Post, ProviderScope, Request, Scope,
} from '@tsed/common';
import { Authenticate } from '@tsed/passport';

@Controller('/login')
@Scope(ProviderScope.SINGLETON)
export class AuthenticationController {
  @Post('/')
  @Authenticate('login')
  Login(@Request() request: Request) {
    return request.user;
  }
}
