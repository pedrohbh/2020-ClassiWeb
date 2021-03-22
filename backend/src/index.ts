import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import { createConnection } from 'typeorm';

import routes from './routes';
import swaggerFile from './swagger_output.json';

// Seleciona a porta da API
export const port = 3333;

// Connects to the Database -> then starts the express
createConnection()
  .then(async (connection) => {
    // Criação da API
    const app = express();

    // Configura middlewares
    app.use(cors());
    app.use(helmet());

    // Configura leitura/resposta em JSON
    app.use(express.json());

    // Importa os endpoints da API
    app.use(routes);
    app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));

    app.listen(port, () => console.log(`Server started on port ${port}!`));
  })
  .catch((error) => console.log(error));
