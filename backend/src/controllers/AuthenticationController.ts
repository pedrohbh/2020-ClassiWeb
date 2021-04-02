import {
  BodyParams,
  Controller, Post, ProviderScope, Request, Scope,
} from '@tsed/common';
import { Authenticate } from '@tsed/passport';

import { Credentials } from '../protocols/LoginProtocol';

@Controller('/login')
@Scope(ProviderScope.SINGLETON)
export class AuthenticationController {
  @Post('/')
  @Authenticate('login')
  Login(@Request() request: Request, @BodyParams() credential: Credentials) {
    return request.user;
  }
}
