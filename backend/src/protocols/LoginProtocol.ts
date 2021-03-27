import { BodyParams, Inject, Req } from '@tsed/common';
import { OnVerify, Protocol } from '@tsed/passport';

import { IStrategyOptions, Strategy } from 'passport-local';

import { User } from '../domain/User';
import { IBaseDAO } from '../persistence/BaseDAO';
import { UserDAO } from '../persistence/UserDAO';

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
  @Inject(UserDAO)
  private readonly userDAO: IBaseDAO<User>;

  async $onVerify(@Req() request: Req, @BodyParams() credentials: Credentials) {
    const { email, password } = credentials;

    const [user] = await this.userDAO.ReadAll({ where: { email } });

    if (!user) {
      return false;
      // OR throw new NotAuthorized("Wrong credentials")
    }

    if (!user.isValidPassword(password)) {
      return false;
      // OR throw new NotAuthorized("Wrong credentials")
    }

    return user;
  }
}
