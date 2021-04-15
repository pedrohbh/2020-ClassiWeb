import { BodyParams, Inject, Req } from '@tsed/common';
import { OnVerify, Protocol } from '@tsed/passport';

import jwt from 'jsonwebtoken';
import { IStrategyOptions, Strategy } from 'passport-local';

import { AdminService } from '../application/classes/AdminService';
import { UserService } from '../application/classes/UserService';
import { Admin } from '../domain/Admin';
import { User, UserTypes } from '../domain/User';
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
  private readonly userService: UserService;

  @Inject(AdminService)
  private readonly adminService: AdminService;

  async $onVerify(@Req() request: Req, @BodyParams() credentials: Credentials) {
    const result = (
      await this.TryToLoginUser(credentials) || await this.TryToLoginAdmin(credentials)
    ) as User | Admin | false;

    if (!result) {
      return false; // OR throw new NotAuthorized("Wrong credentials")
    }

    return LoginLocalProtocol.Login(request, result.id, result instanceof Admin);
  }

  static Login(request: Req, user: User | Admin, isAdmin: boolean) {
    let token;
    request.login(user, (error) => {
      if (error) return;

      token = jwt.sign(
        {
          id: user.id,
          role: isAdmin ? UserTypes.ADMIN : UserTypes.NORMAL,
        },
        JWT_SUPER_SECRET,
        { expiresIn: '1d' },
      );
    });

    return { token };
  }

  private async TryToLoginUser({ email, password }: Credentials) {
    const user = await this.userService.GetUserByEmail(email);

    if (!user) {
      return false; // OR throw new NotAuthorized("Wrong credentials")
    }

    if (!user.isValidPassword(password)) {
      return false; // OR throw new NotAuthorized("Wrong credentials")
    }

    return user;
  }

  private async TryToLoginAdmin({ email, password }: Credentials) {
    const admin = await this.adminService.GetAdminByEmail(email);

    if (!admin) {
      return false; // OR throw new NotAuthorized("Wrong credentials")
    }

    if (!admin.isValidPassword(password)) {
      return false; // OR throw new NotAuthorized("Wrong credentials")
    }

    return admin;
  }
}
