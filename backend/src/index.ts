import express from 'express';
import cors from 'cors';
import routes from './routes';

// Criação da API
const app = express();

// Habilita o CORS
app.use(cors());

// Configura leitura/resposta em JSON
app.use(express.json());

// Importa os endpoints da API
app.use(routes);

// Seleciona a porta da API
app.listen(3333);
