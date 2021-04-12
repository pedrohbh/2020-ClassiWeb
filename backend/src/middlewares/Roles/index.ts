import { UseBefore } from '@tsed/common';
import { useDecorators, StoreSet } from '@tsed/core';

import { UserTypes } from '../../domain/User';
import { RolesMiddleware } from './RolesMiddleware';

export function Roles(roles: UserTypes[]) {
  return useDecorators(
    UseBefore(RolesMiddleware),
    StoreSet(RolesMiddleware, roles),
  );
}
