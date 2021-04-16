import { Constant, Controller, Get, HeaderParams, Inject, View } from '@tsed/common';
import { Returns } from '@tsed/schema';
import { Hidden, SwaggerSettings } from '@tsed/swagger';

import { UserService } from '../../application/UserService';

@Hidden()
@Controller('/')
export class IndexController {
  @Constant('swagger')
  swagger: SwaggerSettings[];

  @Inject(UserService)
  private readonly userService: UserService;

  @Get('/')
  @View('index.ejs')
  @(Returns(200, String).ContentType('text/html'))
  async get(@HeaderParams('x-forwarded-proto') protocol: string, @HeaderParams('host') host: string) {
    const hostUrl = `${protocol || 'http'}://${host}`;

    const users = await this.userService.ListAllUsers();

    return {
      BASE_URL: hostUrl,
      docs: this.swagger.map((conf) => ({
        url: hostUrl + conf.path,
        ...conf,
      })),
      status: {
        total_users: users.length,
        n_states: new Set(users.map((user) => user.address?.state)).size,
      },
    };
  }
}
