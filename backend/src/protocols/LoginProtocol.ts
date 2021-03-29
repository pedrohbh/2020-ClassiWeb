import { BodyParams, Inject, Req } from '@tsed/common';
import { OnVerify, Protocol } from '@tsed/passport';

import { IStrategyOptions, Strategy } from 'passport-local';
import jwt from "jsonwebtoken";

import { IUserService } from '../application/interfaces/IUserService';
import { UserService } from '../application/UserService';
import { JWT_SUPER_SECRET } from './JwtProtocol';

export type Credentials = {
  email: string;
  password: string;
};

@Protocol<IStrategyOptions>({
  name: 'login',
  useStrategy: Strategy,
  settings: {
    usernameField: 'email',
    passwordField: 'password',
  },
})
export class LoginLocalProtocol implements OnVerify {
  @Inject(UserService)
  private readonly userService: IUserService;

  async $onVerify(@Req() request: Req, @BodyParams() credentials: Credentials) {
    const { email, password } = credentials;

    const [user] = await this.userService.ListUsersWith({ where: { email } });

    if (!user) {
      return false;
      // OR throw new NotAuthorized("Wrong credentials")
    }

    if (!user.isValidPassword(password)) {
      return false;
      // OR throw new NotAuthorized("Wrong credentials")
    }

    let token;
    await request.login(user, (error) => {
      token = jwt.sign({ id: user.id, email: user.email }, JWT_SUPER_SECRET, {
        expiresIn: '1d'
      });
    });

    return { token, ...user };
  }
}
