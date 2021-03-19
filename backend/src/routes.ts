import express from 'express';

// Cria o roteador da API
const routes = express.Router();

routes.get('/', (request, response) => response.status(200).json({
  status: 'running',
  about: 'This is the Classiweb server!',
}));

export default routes;
