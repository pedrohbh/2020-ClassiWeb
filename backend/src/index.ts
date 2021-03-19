import cors from 'cors';
import express from 'express';
import swaggerUi from 'swagger-ui-express';

import routes from './routes';
import swaggerFile from './swagger_output.json';

// Criação da API
const app = express();

// Habilita o CORS
app.use(cors());

// Configura leitura/resposta em JSON
app.use(express.json());

// Importa os endpoints da API
app.use(routes);
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));

// Seleciona a porta da API
export const port = 3333;

app.listen(port);
