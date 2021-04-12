import { EndpointInfo, Middleware, Req } from '@tsed/common';
import { Forbidden } from '@tsed/exceptions';

import jwt from 'jsonwebtoken';

import { JWT_SUPER_SECRET } from '../../protocols/JwtProtocol';

@Middleware()
export class RolesMiddleware {
  use(@Req() request: Req, @EndpointInfo() endpoint: EndpointInfo) {
    const token = request.header('auth') || '';
    const user: any = jwt.verify(token, JWT_SUPER_SECRET);

    const roles = endpoint.get(RolesMiddleware);

    if (!roles.includes(user.role)) {
      throw new Forbidden("You don't have permission!");
    }
  }
}
