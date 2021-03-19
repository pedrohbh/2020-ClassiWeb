import express from 'express';

import { UserService } from './application/User/UserServicet';

// Cria o roteador da API
const routes = express.Router();

routes.get('/', (request, response) => response.status(200).json({
  status: 'running',
  documentation: 'Access: localhost:3333/doc',
  about: 'This is the Classiweb server!',
}));

// Inject UserService with TypeDI
// routes.get('/users', UserService.GetAll);

export default routes;
