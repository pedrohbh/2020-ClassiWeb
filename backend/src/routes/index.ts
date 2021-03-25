import { Router } from 'express';

import UserRoutes from './Users.routes';

// Cria o roteador da API
const routes = Router();

routes.get('/', (request, response) => response.status(200).json({
  status: 'running',
  documentation: 'Access: localhost:3333/doc',
  about: 'This is the Classiweb server!',
}));

routes.use('/users', UserRoutes);

export default routes;
