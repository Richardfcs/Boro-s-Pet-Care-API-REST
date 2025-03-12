import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import serverless from "serverless-http"; // Import serverless-http

import { routes } from './routes.js';

const app = express(); // Apenas UMA instância do Express

app.use(bodyParser.json());
app.use(cors());

routes.forEach(route => {
    app[route.method.toLowerCase()](route.path, route.handler); // Rotas diretamente no app Express
});

export const handler = serverless(app); // Exporta o app Express "empacotado" por serverless-http