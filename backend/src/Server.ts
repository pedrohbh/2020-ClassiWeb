import '@tsed/ajv';
import { $log, PlatformApplication, Request, Response } from '@tsed/common';
import { Env } from '@tsed/core';
import { Configuration, Inject } from '@tsed/di';
import { BadRequest } from '@tsed/exceptions';

import '@tsed/passport';
import '@tsed/platform-express'; // /!\ keep this import
import '@tsed/swagger';
import '@tsed/typeorm';

import bodyParser from 'body-parser';
import compress from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import methodOverride from 'method-override';
import path from 'path';

import typeormConfig from '../ormconfig.json';

import { IndexController } from './controllers/pages/IndexController';

export const rootDir = __dirname;
export const isProduction = process.env.NODE_ENV === Env.PROD;

if (isProduction) {
  $log.appenders.set('stdout', {
    type: 'stdout',
    levels: ['info', 'debug'],
    layout: {
      type: 'json',
    },
  });

  $log.appenders.set('stderr', {
    levels: ['trace', 'fatal', 'error', 'warn'],
    type: 'stderr',
    layout: {
      type: 'json',
    },
  });
}

@Configuration({
  rootDir,
  acceptMimes: ['application/json'],
  httpPort: process.env.PORT || 8083,
  httpsPort: false, // CHANGE
  logger: {
    disableRoutesSummary: isProduction,
  },
  mount: {
    '/rest': [`${rootDir}/controllers/**/*.ts`],
    '/': [IndexController],
  },
  componentsScan: [
    `${rootDir}/protocols/*.ts`, // scan protocols directory
  ],
  multer: {
    dest: `${rootDir}/../uploads`,
    limits: {
      fileSize: 5 * 1024 ** 2, // tamanho máximo de arquivo (5mb)
    },
    fileFilter: (request, file, cb) => {
      const allowedMimeTypes = ['image/jpeg', 'image/pjpeg', 'image/png', 'image/gif'];

      if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(new BadRequest('Formato de arquivo inválido'));
      }
    },
  },
  swagger: [
    {
      path: '/v2/docs',
      specVersion: '2.0',
    },
    {
      path: '/v3/docs',
      specVersion: '3.0.1',
    },
  ],
  views: {
    root: `${rootDir}/../views`,
    viewEngine: 'ejs',
  },
  typeorm: [typeormConfig as any],
  exclude: ['**/*.spec.ts'],
  statics: {
    '/rest': [
      {
        root: `${rootDir}/../uploads`,
      },
    ],
  },
})
export class Server {
  @Inject()
  app: PlatformApplication;

  @Configuration()
  settings: Configuration;

  $beforeRoutesInit(): void {
    this.app
      .use(cors())
      .use(cookieParser())
      .use(compress({}))
      .use(methodOverride())
      .use(bodyParser.json())
      .use(
        bodyParser.urlencoded({
          extended: true,
        }),
      );
  }

  $afterRoutesInit() {
    this.app.get('/rest/images/:filename', async (req: Request, res: Response) => {
      const { filename } = req.params;

      res.sendFile(path.join(__dirname, `../uploads/${filename}`));
    });
  }
}
